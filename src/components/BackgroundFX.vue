<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

const root = ref(null)
const reducedMotion = usePrefersReducedMotion()

let raf = 0
let currentX = 0.5
let currentY = 0.35
let targetX = currentX
let targetY = currentY
let currentScroll = 0
let targetScroll = 0
let live = false

function paint() {
  const el = root.value
  if (!el) return
  el.style.setProperty('--px', currentX.toFixed(4))
  el.style.setProperty('--py', currentY.toFixed(4))
  el.style.setProperty('--scroll-y', `${currentScroll.toFixed(2)}px`)
}

function tick() {
  raf = 0
  const dx = targetX - currentX
  const dy = targetY - currentY
  const ds = targetScroll - currentScroll
  currentX += dx * 0.09
  currentY += dy * 0.09
  currentScroll += ds * 0.09
  paint()
  if (Math.abs(dx) > 0.0008 || Math.abs(dy) > 0.0008 || Math.abs(ds) > 0.05) {
    raf = requestAnimationFrame(tick)
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(tick)
}

function onPointerMove(event) {
  if (event.pointerType === 'touch') return
  targetX = event.clientX / window.innerWidth
  targetY = event.clientY / window.innerHeight
  if (!live) {
    live = true
    root.value?.classList.add('is-live')
  }
  schedule()
}

function onScroll() {
  targetScroll = Math.max(-150, Math.min(0, -window.scrollY * 0.04))
  schedule()
}

onMounted(() => {
  paint()
  if (reducedMotion.value) return
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div ref="root" class="bg-fx" aria-hidden="true">
    <div class="bg-fx__orb bg-fx__orb--a">
      <span class="bg-fx__blob bg-fx__blob--a"></span>
    </div>
    <div class="bg-fx__orb bg-fx__orb--b">
      <span class="bg-fx__blob bg-fx__blob--b"></span>
    </div>
    <div class="bg-fx__orb bg-fx__orb--c">
      <span class="bg-fx__blob bg-fx__blob--c"></span>
    </div>
    <div class="bg-fx__grid"></div>
    <div class="bg-fx__spot"></div>
  </div>
</template>

<style scoped>
.bg-fx {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background-color: var(--bg);
  contain: layout paint;
  transition: background-color 0.35s ease;
}

.bg-fx__orb {
  position: absolute;
  inset: -12%;
  will-change: transform;
  transform: translate3d(
    calc((var(--px, 0.5) - 0.5) * var(--shift-x, 48px)),
    calc((var(--py, 0.35) - 0.5) * var(--shift-y, 36px) + var(--scroll-y, 0px)),
    0
  );
}

.bg-fx__orb--b {
  --shift-x: -64px;
  --shift-y: 44px;
}

.bg-fx__orb--c {
  --shift-x: 34px;
  --shift-y: -50px;
}

.bg-fx__blob {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

.bg-fx__blob--a {
  top: -20%;
  right: -14%;
  width: clamp(24rem, 56vw, 52rem);
  aspect-ratio: 1;
  background: radial-gradient(circle at 50% 50%, var(--fx-a), transparent 66%);
  animation: drift-a 26s ease-in-out infinite alternate;
}

.bg-fx__blob--b {
  bottom: -26%;
  left: -16%;
  width: clamp(22rem, 50vw, 46rem);
  aspect-ratio: 1;
  background: radial-gradient(circle at 50% 50%, var(--fx-b), transparent 68%);
  animation: drift-b 32s ease-in-out infinite alternate;
}

.bg-fx__blob--c {
  top: 24%;
  left: 34%;
  width: clamp(18rem, 40vw, 36rem);
  aspect-ratio: 1;
  background: radial-gradient(circle at 50% 50%, var(--fx-c), transparent 70%);
  animation: drift-c 38s ease-in-out infinite alternate;
}

.bg-fx__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--fx-grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--fx-grid) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse 75% 60% at 50% 0%, #000 5%, transparent 78%);
  mask-image: radial-gradient(ellipse 75% 60% at 50% 0%, #000 5%, transparent 78%);
  opacity: 0.6;
}

.bg-fx__spot {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    26rem 26rem at calc(var(--px, 0.5) * 100%) calc(var(--py, 0.35) * 100%),
    var(--fx-spot),
    transparent 72%
  );
  opacity: 0;
  transition: opacity 0.6s ease;
}

.bg-fx.is-live .bg-fx__spot {
  opacity: 1;
}

@keyframes drift-a {
  to {
    transform: translate3d(-5%, 5%, 0) scale(1.08);
  }
}

@keyframes drift-b {
  to {
    transform: translate3d(6%, -4%, 0) scale(1.06);
  }
}

@keyframes drift-c {
  to {
    transform: translate3d(-4%, -6%, 0) scale(1.1);
  }
}

@media (pointer: coarse) {
  .bg-fx__spot {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-fx__orb {
    transform: none;
  }
}
</style>
