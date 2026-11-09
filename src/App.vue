<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppIcon from './components/AppIcon.vue'
import BackgroundFX from './components/BackgroundFX.vue'
import { usePrefersReducedMotion } from './composables/usePrefersReducedMotion'

const year = new Date().getFullYear()
const showTop = ref(false)
const reducedMotion = usePrefersReducedMotion()

let frame = 0

function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    showTop.value = window.scrollY > 600
  })
}

function toTop() {
  window.scrollTo({ top: 0, behavior: reducedMotion.value ? 'auto' : 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="app">
    <BackgroundFX />
    <NavBar />

    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <p>© {{ year }} Putri Sadiyah — UI/UX Designer &amp; Web Developer</p>
        <p>Based in Yogyakarta</p>
      </div>
    </footer>

    <Transition name="fade">
      <button
        v-show="showTop"
        class="to-top"
        type="button"
        aria-label="Back to top"
        title="Back to top"
        @click="toTop"
      >
        <AppIcon name="arrow-up" :size="20" />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.footer {
  padding: 32px 0 40px;
  border-top: 1px solid var(--border);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 24px;
  color: var(--text-3);
  font-size: 0.82rem;
}

.to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 70;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--bg-elev);
  color: var(--text-2);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.to-top:hover {
  border-color: var(--accent);
  color: var(--accent-text);
  transform: translateY(-3px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .footer {
    padding: 28px 0 64px;
  }

  .to-top {
    right: 16px;
    bottom: 16px;
  }
}
</style>
