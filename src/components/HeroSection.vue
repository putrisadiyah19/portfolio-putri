<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

const roles = ['UI/UX Designer', 'Web Developer', 'AI Enthusiast']

const display = ref(roles[0])
const reducedMotion = usePrefersReducedMotion()

let roleIndex = 0
let charIndex = roles[0].length
let deleting = true
let timer = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function schedule(delay) {
  clearTimer()
  timer = window.setTimeout(tick, delay)
}

function tick() {
  const role = roles[roleIndex]

  if (!deleting) {
    if (charIndex < role.length) {
      charIndex += 1
      display.value = role.slice(0, charIndex)
      schedule(80)
    } else {
      deleting = true
      schedule(1700)
    }
    return
  }

  if (charIndex > 0) {
    charIndex -= 1
    display.value = role.slice(0, charIndex)
    schedule(40)
  } else {
    deleting = false
    roleIndex = (roleIndex + 1) % roles.length
    schedule(350)
  }
}

onMounted(() => {
  if (reducedMotion.value) {
    display.value = roles[0]
    return
  }
  schedule(1800)
})

onBeforeUnmount(clearTimer)

watch(reducedMotion, (reduced) => {
  if (reduced) {
    clearTimer()
    display.value = roles[roleIndex]
    return
  }

  charIndex = roles[roleIndex].length
  display.value = roles[roleIndex]
  deleting = true
  schedule(1400)
})
</script>

<template>
  <section id="home" class="hero">
    <div class="container hero__grid">
      <div class="hero__copy">
        <span class="hero__badge">
          <span class="dot" aria-hidden="true"></span>
          Available for work
        </span>

        <p class="hero__hi">Hi, I'm Putri Sadiyah</p>

        <h1 class="hero__title" :aria-label="roles.join(', ')">
          <span aria-hidden="true">{{ display }}</span><span class="caret" aria-hidden="true"></span>
        </h1>

        <p class="hero__sub">
          I design and build clean, human-centered websites and apps
        </p>

        <div class="hero__actions">
          <a href="#projects" class="btn btn--primary">
            View My Work
            <AppIcon name="arrow-right" :size="18" />
          </a>
          <a href="#contact" class="btn btn--ghost">Let's Work Together</a>
          <a
            href="/resume-putri-en.pdf"
            download="Resume-Halimatussadiyah-Lola-Putri.pdf"
            class="btn btn--ghost"
          >
            <AppIcon name="download" :size="18" />
            Download Resume
          </a>
        </div>

        <ul class="hero__facts">
          <li>
            <AppIcon name="map-pin" :size="16" />
            Yogyakarta, Indonesia
          </li>
          <li>
            <AppIcon name="briefcase" :size="16" />
            Open to freelance, internships &amp; full-time
          </li>
        </ul>
      </div>

      <div v-reveal="{ delay: 120 }" class="hero__visual">
        <div class="blob blob--one" aria-hidden="true"></div>
        <div class="blob blob--two" aria-hidden="true"></div>

        <div class="hero__portrait">
          <img
            src="/profile.jpg?v=2"
            alt="Portrait of Putri Sadiyah"
            width="1214"
            height="1568"
          />
        </div>

        <span class="hero__chip hero__chip--one">
          <AppIcon name="palette" :size="14" />
          UI/UX
        </span>
        <span class="hero__chip hero__chip--two">
          <AppIcon name="cpu" :size="14" />
          AI
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  min-height: calc(100svh - var(--nav-h));
  padding: clamp(32px, 6vw, 64px) 0 80px;
  scroll-margin-top: var(--nav-h);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: clamp(32px, 6vw, 72px);
}

.hero__copy {
  max-width: 580px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-2);
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.1;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2.4s ease-in-out infinite;
}

.hero__hi {
  margin-top: 22px;
  color: var(--text-3);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  animation: rise 0.6s 0.06s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero__title {
  margin-top: 6px;
  font-size: clamp(2.5rem, 5.6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
  min-height: 1.12em;
  animation: rise 0.65s 0.12s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.caret {
  display: inline-block;
  width: 3px;
  height: 0.92em;
  margin-left: 5px;
  border-radius: 2px;
  background: var(--accent);
  vertical-align: -0.06em;
  animation: blink 1.1s steps(2, start) infinite;
}

.hero__sub {
  max-width: 52ch;
  margin-top: 18px;
  color: var(--text-2);
  font-size: clamp(1rem, 1.5vw, 1.12rem);
  line-height: 1.7;
  animation: rise 0.65s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  animation: rise 0.65s 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 28px;
  color: var(--text-3);
  font-size: 0.85rem;
  animation: rise 0.65s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero__facts li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero__facts svg {
  flex-shrink: 0;
  color: var(--accent-text);
}

.hero__visual {
  position: relative;
  width: 100%;
  max-width: 460px;
  justify-self: center;
  padding: 12px;
}

.hero__visual::before {
  content: '';
  position: absolute;
  right: -14px;
  bottom: -18px;
  width: 150px;
  height: 150px;
  background-image: radial-gradient(var(--accent) 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.22;
  pointer-events: none;
}

.blob {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
}

.blob--one {
  top: -6%;
  right: -8%;
  width: 80%;
  aspect-ratio: 1;
  background: radial-gradient(circle at 35% 35%, #a78bfa, #6366f1 55%, transparent 72%);
  opacity: 0.62;
  animation: drift-a 18s ease-in-out infinite;
}

.blob--two {
  bottom: -8%;
  left: -12%;
  width: 55%;
  aspect-ratio: 1;
  background: radial-gradient(circle at 50% 50%, #c4b5fd, #8b5cf6 55%, transparent 75%);
  opacity: 0.4;
  animation: drift-b 22s ease-in-out infinite;
}

.hero__portrait {
  position: relative;
  z-index: 1;
  width: min(100%, 420px);
  margin-inline: auto;
  padding: 10px;
  border-radius: 30px;
  background: linear-gradient(
    160deg,
    rgba(129, 140, 248, 0.6),
    rgba(99, 102, 241, 0.08) 45%,
    rgba(139, 92, 246, 0.4)
  );
  box-shadow: 0 32px 90px rgba(99, 102, 241, 0.28);
}

.hero__portrait img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 22px;
}

.hero__chip {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 13px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-2);
  font-size: 0.76rem;
  font-weight: 700;
  box-shadow: var(--shadow-md);
}

.hero__chip svg {
  color: var(--accent-text);
}

.hero__chip--one {
  top: 16%;
  left: -6px;
}

.hero__chip--two {
  right: -4px;
  bottom: 14%;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(34, 197, 94, 0);
  }
}

@keyframes drift-a {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-14px, 18px) scale(1.06);
  }
}

@keyframes drift-b {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(18px, -14px) scale(1.08);
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding: 36px 0 64px;
  }

  .hero__grid {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero__copy {
    max-width: 640px;
    margin-inline: auto;
  }

  .hero__sub {
    margin-inline: auto;
  }

  .hero__actions,
  .hero__facts {
    justify-content: center;
  }

  .hero__visual {
    max-width: 360px;
  }

  .hero__chip--one {
    left: -2px;
  }

  .hero__chip--two {
    right: -2px;
  }
}
</style>
