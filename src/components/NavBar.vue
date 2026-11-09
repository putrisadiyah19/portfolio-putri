<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const active = ref('home')
const scrolled = ref(false)
const menuOpen = ref(false)
const isDark = ref(document.documentElement.dataset.theme === 'dark')

let frame = 0

function updateScrollState() {
  const y = window.scrollY
  scrolled.value = y > 8

  const probe = y + 140
  let current = 'home'

  for (const link of links) {
    const el = document.getElementById(link.id)
    if (el && el.getBoundingClientRect().top + y <= probe) current = link.id
  }

  if (window.innerHeight + y >= document.documentElement.scrollHeight - 24) current = 'contact'
  active.value = current
}

function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    updateScrollState()
  })
}

function closeMenu() {
  menuOpen.value = false
}

function onResize() {
  if (window.innerWidth > 900) menuOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') menuOpen.value = false
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
  try {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  } catch (error) {
    /* storage can be unavailable in private mode */
  }
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__inner container">
      <a href="#home" class="brand" @click="closeMenu">
        <span class="brand__mark" aria-hidden="true">P</span>
        <span class="brand__name">putri<span>.dev</span></span>
      </a>

      <nav class="nav__links" aria-label="Main navigation">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav__link"
          :class="{ 'is-active': active === link.id }"
          :aria-current="active === link.id ? 'location' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="nav__actions">
        <button
          class="icon-btn"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="isDark ? 'Light mode' : 'Dark mode'"
          @click="toggleTheme"
        >
          <AppIcon :name="isDark ? 'sun' : 'moon'" :size="18" />
        </button>

        <button
          class="icon-btn nav__burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <transition name="drawer">
      <nav v-if="menuOpen" id="mobile-menu" class="nav__drawer" aria-label="Mobile navigation">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="drawer__link"
          :class="{ 'is-active': active === link.id }"
          :aria-current="active === link.id ? 'location' : undefined"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  height: var(--nav-h);
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.nav--scrolled {
  background: var(--header-bg);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  backdrop-filter: blur(18px) saturate(160%);
  border-bottom-color: var(--border);
  box-shadow: var(--shadow-sm);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #818cf8, #4338ca);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  box-shadow: 0 8px 18px var(--glow);
}

.brand__name {
  font-size: 1.02rem;
  color: var(--text);
}

.brand__name span {
  color: var(--accent-text);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav__link {
  padding: 8px 13px;
  border-radius: 999px;
  color: var(--text-2);
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.25s ease, background-color 0.25s ease;
}

.nav__link:hover,
.nav__link.is-active {
  background: var(--accent-soft);
  color: var(--accent-text);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text-2);
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.icon-btn:hover {
  border-color: var(--accent);
  color: var(--accent-text);
  transform: translateY(-1px);
}

.nav__burger {
  display: none;
}

.nav__drawer {
  display: none;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 900px) {
  .nav__links {
    display: none;
  }

  .nav__burger {
    display: inline-flex;
  }

  .nav__drawer {
    position: absolute;
    top: calc(var(--nav-h) - 6px);
    left: 20px;
    right: 20px;
    display: grid;
    gap: 2px;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 18px;
    background: var(--bg-elev);
    box-shadow: var(--shadow-md);
  }

  .drawer__link {
    padding: 12px 14px;
    border-radius: 12px;
    color: var(--text-2);
    font-size: 0.95rem;
    font-weight: 600;
    transition: color 0.25s ease, background-color 0.25s ease;
  }

  .drawer__link:hover,
  .drawer__link.is-active {
    background: var(--accent-soft);
    color: var(--accent-text);
  }
}
</style>
