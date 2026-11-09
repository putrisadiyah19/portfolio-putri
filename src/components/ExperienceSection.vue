<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const items = [
  {
    id: 'git-solution',
    type: 'Experience',
    icon: 'briefcase',
    title: 'Fullstack Web Developer Intern',
    org: 'PT GIT Solution · Remote',
    period: 'Oct – Dec 2024',
    certificate: '/certificates/git-solution-2024.pdf',
  },
  {
    id: 'ccna',
    type: 'Certification',
    icon: 'award',
    title: 'Cisco CCNA: Introduction to Networks',
    org: 'Cisco Networking Academy',
    period: 'Jan 2025',
    certificate: '/certificates/ccna-2025.jpg',
  },
  {
    id: 'ignition',
    type: 'Competition',
    icon: 'sparkles',
    title: 'Ignition Informatika 2025',
    org: 'Participant · AI category',
    period: '2025',
    certificate: '/certificates/ignition-2025.jpg',
  },
  {
    id: 'amcc-2023',
    type: 'Organization',
    icon: 'users',
    title: 'AMCC',
    org: 'Web Programming Division · Batch 2023',
    period: 'Dec 2023 – Jun 2024',
    certificate: '/certificates/amcc-2023.jpg',
  },
  {
    id: 'amcc-2025',
    type: 'Organization',
    icon: 'users',
    title: 'AMCC',
    org: 'Web Programming Division · Batch 2024',
    period: 'Mar – Jul 2025',
    certificate: '/certificates/amcc-2025.jpg',
  },
]

const activeCertificate = ref(null)
const isPdf = computed(() => activeCertificate.value?.certificate.endsWith('.pdf') ?? false)

function openCertificate(item) {
  activeCertificate.value = item
  document.body.style.overflow = 'hidden'
}

function closeCertificate() {
  activeCertificate.value = null
  document.body.style.overflow = ''
}

function onKeydown(event) {
  if (event.key === 'Escape' && activeCertificate.value) closeCertificate()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <span class="kicker">Experience</span>
        <h2 class="section-title">Experience &amp; certifications</h2>
        <p class="section-sub">
          Internships, certifications, competitions, and community work that shaped how I build.
        </p>
      </div>

      <ol class="timeline">
        <li
          v-for="(item, index) in items"
          :key="item.id"
          v-reveal="{ delay: index * 90 }"
          class="timeline__item"
        >
          <span class="timeline__marker">
            <AppIcon :name="item.icon" :size="19" />
          </span>

          <div class="timeline__card">
            <div class="timeline__top">
              <span class="timeline__type">{{ item.type }}</span>
              <span class="timeline__period">{{ item.period }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.org }}</p>
            <button
              class="timeline__cert"
              type="button"
              aria-haspopup="dialog"
              @click="openCertificate(item)"
            >
              <AppIcon name="award" :size="15" />
              View Certificate
            </button>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="activeCertificate"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`Certificate ${activeCertificate.title}`"
        @click.self="closeCertificate"
      >
        <button
          class="lightbox__close"
          type="button"
          aria-label="Close certificate"
          @click="closeCertificate"
        >
          <AppIcon name="close" :size="22" />
        </button>

        <figure class="lightbox__panel">
          <iframe
            v-if="isPdf"
            class="lightbox__frame"
            :src="activeCertificate.certificate"
            :title="`Certificate ${activeCertificate.title}`"
          ></iframe>
          <img
            v-else
            class="lightbox__image"
            :src="activeCertificate.certificate"
            :alt="`Certificate ${activeCertificate.title}`"
          />
          <figcaption class="lightbox__caption">
            {{ activeCertificate.title }} · {{ activeCertificate.period }}
          </figcaption>
        </figure>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.timeline {
  position: relative;
  max-width: 820px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 21px;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  opacity: 0.35;
}

.timeline__item {
  position: relative;
  padding-left: 68px;
  padding-bottom: 24px;
}

.timeline__item:last-child {
  padding-bottom: 0;
}

.timeline__marker {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg-elev);
  color: var(--accent-text);
  box-shadow: var(--shadow-sm);
}

.timeline__card {
  padding: 20px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elev);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.timeline__card:hover {
  transform: translateX(4px);
  border-color: var(--accent);
  box-shadow: 0 14px 36px var(--glow);
}

.timeline__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.timeline__type {
  color: var(--accent-text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.timeline__period {
  color: var(--text-3);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.timeline__card h3 {
  font-size: 1.08rem;
  letter-spacing: -0.01em;
}

.timeline__card p {
  margin-top: 4px;
  color: var(--text-2);
  font-size: 0.9rem;
}

.timeline__cert {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  padding: 8px 13px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--accent-text);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}

.timeline__cert:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.timeline__cert:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(5, 8, 18, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.lightbox__panel {
  width: min(1040px, 100%);
  max-height: 90vh;
  margin: 0;
  overflow: auto;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-elev);
  box-shadow: var(--shadow-md);
}

.lightbox__image,
.lightbox__frame {
  display: block;
  width: 100%;
  max-height: 74vh;
  border-radius: 12px;
  background: #ffffff;
}

.lightbox__image {
  height: auto;
  object-fit: contain;
}

.lightbox__frame {
  height: 74vh;
  border: 0;
}

.lightbox__caption {
  padding: 12px 6px 4px;
  color: var(--text-2);
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.lightbox__close {
  position: fixed;
  top: max(16px, env(safe-area-inset-top));
  right: 20px;
  z-index: 101;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.72);
  color: #ffffff;
  cursor: pointer;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.lightbox__close:hover {
  background: rgba(15, 23, 42, 0.92);
}

.lightbox__close:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .timeline__item {
    padding-left: 56px;
  }

  .timeline::before {
    left: 18px;
  }

  .timeline__marker {
    width: 38px;
    height: 38px;
    border-radius: 12px;
  }

  .timeline__card {
    padding: 18px;
  }

  .timeline__top {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .lightbox {
    padding: 12px;
  }

  .lightbox__panel {
    padding: 8px;
  }

  .lightbox__frame {
    height: 66vh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-enter-active,
  .lightbox-leave-active {
    transition: none;
  }
}
</style>
