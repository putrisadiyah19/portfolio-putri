<script setup>
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'uiux', label: 'UI/UX' },
  { key: 'web', label: 'Web' },
  { key: 'ai', label: 'AI' },
]

const projects = [
  {
    title: 'Cinema Ticketing Platform',
    category: 'web',
    categoryLabel: 'Web',
    meta: 'PT GIT Solution · 2024',
    description:
      'Fullstack web developer internship building a cinema ticketing platform, covering film browsing, seat selection, and the admin side of the booking flow.',
    tags: ['Fullstack', 'Web App', 'Booking Flow'],
    links: [
      {
        label: 'View Project',
        href: 'https://www.figma.com/design/sCFyH0vqtCRDZsrmoc8Vmr/WebMOA-Kelompok-3?node-id=90-197&t=McRg753Q79K5ueN6-1',
      },
    ],
    image: '/projects/ticketing.png',
    alt: 'Cinema ticketing platform interface showing film listings and seat selection',
    monogram: 'CT',
    from: '#6366f1',
    to: '#312e81',
  },
  {
    title: 'RoBERTa Mental Health Classifier',
    category: 'ai',
    categoryLabel: 'AI',
    meta: 'Research · 2025',
    description:
      'A RoBERTa-based model that classifies six mental-health categories from Reddit narratives, with ADWIN drift monitoring to track changing language patterns.',
    tags: ['RoBERTa', 'NLP', 'ADWIN'],
    links: [
      {
        label: 'Demo',
        href: 'https://huggingface.co/putrisadiyah19/mental-health-roberta',
      },
      {
        label: 'Code',
        href: 'https://github.com/putrisadiyah19/mental-health-app',
      },
    ],
    image: '/projects/roberta.png',
    alt: 'Illustration of text narratives flowing into a RoBERTa model that sorts them into mental-health categories, with a drift-monitoring dashboard',
    monogram: 'MH',
    from: '#8b5cf6',
    to: '#5b21b6',
  },
  {
    title: 'DEWIJI',
    category: 'uiux',
    categoryLabel: 'UI/UX',
    meta: 'Team project',
    description:
      'A Yogyakarta tourism platform designed with a team, from user research and flows to high-fidelity screens that make local destinations easier to explore.',
    tags: ['Figma', 'User Flow', 'Tourism'],
    links: [
      {
        label: 'View Prototype',
        href: 'https://www.figma.com/design/9mXRwIEvYzQi9d9W2NNN1W/NEW-FP-P.WEB?node-id=5-445&t=84IjQYco3OQ1HqQU-1',
      },
    ],
    image: '/projects/dewiji.png',
    alt: 'DEWIJI tourism website mockup showing destination discovery screens',
    monogram: 'DW',
    from: '#22d3ee',
    to: '#0e7490',
  },
  {
    title: 'MYJOYY',
    category: 'uiux',
    categoryLabel: 'UI/UX',
    meta: 'App concept',
    description:
      'A home and office cleaning service app focused on a simple booking flow and clear service information, so scheduling help feels effortless.',
    tags: ['Figma', 'Prototyping', 'Service App'],
    links: [
      {
        label: 'View Prototype',
        href: 'https://www.figma.com/design/jrxbHIdwUmrFHrnxtX2DaR/Mockup-IMK-kel-3?node-id=75-933&t=CF8jitLiyDZ8BzF5-1',
      },
    ],
    image: '/projects/myjoyy.jpg',
    alt: 'MYJOYY cleaning service app home screen showing service categories and popular services',
    monogram: 'MJ',
    from: '#f472b6',
    to: '#9d174d',
  },
  {
    title: 'Nicky Frozen – Sistem POS',
    category: 'uiux',
    categoryLabel: 'UI/UX',
    meta: 'POS system · QA',
    description:
      'UI/UX design for a point-of-sale (POS) system for a frozen food business, covering the transaction flow, product management, and visual QA.',
    tags: ['POS', 'UI/UX', 'QA'],
    links: [
      {
        label: 'View Prototype',
        href: 'https://www.figma.com/design/93ZGM9HYqLhhlTjRXxOXIa/NICKY-FROZEN?node-id=41-21&t=uj3Tp8PVWriqexjs-1',
      },
    ],
    image: '/projects/nicky-frozen.png',
    alt: 'Nicky Frozen POS interface showing transaction and product management screens',
    monogram: 'NF',
    from: '#38bdf8',
    to: '#0c4a6e',
  },
]

const categoryIcons = {
  uiux: 'palette',
  web: 'code',
  ai: 'cpu',
}

const activeFilter = ref('all')

const filteredProjects = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter.value)
)

const hasHref = (href) => typeof href === 'string' && href.trim() !== '' && href.trim() !== '#'

const getLinks = (project) => (project.links || []).filter((item) => hasHref(item.href))

const primaryLink = (project) => getLinks(project)[0]?.href || ''
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div v-reveal class="projects__bar">
        <div class="section-head projects__head">
          <span class="kicker">Projects</span>
          <h2 class="section-title">Selected projects</h2>
          <p class="section-sub">
            Interfaces, products, and data experiments I've built — from ticketing flows to a
            mental-health NLP model.
          </p>
        </div>

        <div class="filter" role="group" aria-label="Filter projects">
          <button
            v-for="filter in filters"
            :key="filter.key"
            type="button"
            class="filter__btn"
            :class="{ 'is-active': activeFilter === filter.key }"
            :aria-pressed="activeFilter === filter.key"
            @click="activeFilter = filter.key"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div v-reveal="{ delay: 100 }">
        <TransitionGroup name="card" tag="div" class="projects__grid">
          <article v-for="project in filteredProjects" :key="project.title" class="project-card">
          <div class="thumb" :style="{ '--from': project.from, '--to': project.to }">
            <img
              v-if="project.image"
              class="thumb__img"
              :src="project.image"
              :alt="project.alt"
              loading="lazy"
            />
            <div v-else class="thumb__art" aria-hidden="true">
              <span class="thumb__monogram">{{ project.monogram }}</span>
            </div>
            <span class="thumb__icon" aria-hidden="true">
              <AppIcon :name="categoryIcons[project.category]" :size="19" />
            </span>
            <a
              v-if="primaryLink(project)"
              class="thumb__hit"
              :href="primaryLink(project)"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Open ${project.title} project`"
            >
              <span class="thumb__overlay" aria-hidden="true">
                <span class="thumb__cta">
                  View Project
                  <AppIcon name="external" :size="15" />
                </span>
              </span>
            </a>
          </div>

          <div class="project-card__body">
            <div class="project-card__meta">
              <span class="project-card__cat">{{ project.categoryLabel }}</span>
              <span>{{ project.meta }}</span>
            </div>

            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>

            <ul class="project-card__tags">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>

            <div v-if="getLinks(project).length" class="project-card__links">
              <a
                v-for="item in getLinks(project)"
                :key="item.href"
                :href="item.href"
                class="project-card__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.label }}
                <AppIcon name="arrow-right" :size="16" />
              </a>
            </div>
          </div>
        </article>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects__bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.projects__head {
  margin-bottom: 0;
}

.filter {
  display: inline-flex;
  flex-shrink: 0;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.filter__btn {
  padding: 8px 17px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-2);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}

.filter__btn:hover {
  color: var(--accent-text);
}

.filter__btn.is-active {
  background: var(--accent-fill);
  color: var(--accent-fill-fg);
  box-shadow: 0 8px 18px var(--glow);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  align-items: start;
}

.project-card {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--bg-elev);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease,
    opacity 0.35s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 24px 55px var(--glow);
}

.thumb {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(135deg, var(--from), var(--to));
}

.thumb__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card:hover .thumb__img,
.project-card:focus-within .thumb__img {
  transform: scale(1.05);
}

.thumb__art {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.thumb__art::before {
  content: '';
  position: absolute;
  top: -70px;
  left: -50px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
}

.thumb__art::after {
  content: '';
  position: absolute;
  right: -50px;
  bottom: -80px;
  width: 200px;
  height: 200px;
  border-radius: 40%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(24deg);
}

.project-card:hover .thumb__art,
.project-card:focus-within .thumb__art {
  transform: scale(1.07);
}

.thumb__monogram {
  position: relative;
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.thumb__icon {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.thumb__hit {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: block;
  color: inherit;
}

.thumb__hit:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.thumb__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 14, 30, 0.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.project-card:hover .thumb__overlay,
.project-card:focus-within .thumb__overlay {
  opacity: 1;
}

.thumb__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: #ffffff;
  color: #1e1b4b;
  font-size: 0.88rem;
  font-weight: 600;
  transform: translateY(8px);
  transition: transform 0.35s ease;
}

.project-card:hover .thumb__cta,
.project-card:focus-within .thumb__cta {
  transform: translateY(0);
}

.project-card__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px 24px 24px;
}

.project-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-3);
  font-size: 0.78rem;
  font-weight: 600;
}

.project-card__cat {
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.project-card h3 {
  font-size: 1.22rem;
  letter-spacing: -0.015em;
}

.project-card__body > p {
  color: var(--text-2);
  font-size: 0.92rem;
  line-height: 1.65;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 2px;
}

.project-card__tags li {
  padding: 5px 11px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-3);
  font-size: 0.74rem;
  font-weight: 600;
}

.project-card__links {
  position: relative;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 20px;
  margin-top: 6px;
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent-text);
  font-size: 0.88rem;
  font-weight: 700;
  transition: gap 0.25s ease, opacity 0.25s ease;
}

.project-card__link:hover {
  gap: 9px;
}

.card-move,
.card-enter-active,
.card-leave-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

@media (max-width: 900px) {
  .projects__bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .projects__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .filter {
    width: 100%;
    justify-content: space-between;
  }

  .filter__btn {
    flex: 1;
    padding: 8px 10px;
  }
}
</style>
