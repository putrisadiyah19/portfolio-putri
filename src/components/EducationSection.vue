<script setup>
import AppIcon from './AppIcon.vue'

const education = [
  {
    icon: 'award',
    type: 'University',
    title: 'Bachelor of Informatics',
    org: 'Universitas AMIKOM Yogyakarta',
    period: '2023 – Present',
    blurb: 'Studying informatics while designing and building UI/UX and front-end projects.',
    tags: ['Informatics'],
  },
  {
    icon: 'palette',
    type: 'Vocational high school',
    title: 'Multimedia',
    org: 'SMK Negeri 1 Sukamara',
    period: '2020 – 2023',
    blurb: 'Multimedia foundation in visual design and digital production.',
    tags: ['Multimedia'],
  },
]
</script>

<template>
  <section id="education" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <span class="kicker">Education</span>
        <h2 class="section-title">Where I studied</h2>
        <p class="section-sub">
          A formal foundation in informatics and multimedia, carried into design and front-end work.
        </p>
      </div>

      <div class="edu__grid">
        <article
          v-for="(item, index) in education"
          :key="item.title"
          v-reveal="{ delay: index * 90 }"
          class="edu-card"
        >
          <span class="edu-card__icon">
            <AppIcon :name="item.icon" :size="22" />
          </span>

          <div class="edu-card__meta">
            <span class="edu-card__type">{{ item.type }}</span>
            <span class="edu-card__period">{{ item.period }}</span>
          </div>

          <h3>{{ item.title }}</h3>
          <p class="edu-card__org">{{ item.org }}</p>
          <p class="edu-card__blurb">{{ item.blurb }}</p>

          <ul class="edu-card__tags">
            <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.edu-card {
  position: relative;
  padding: 28px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--bg-elev);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.edu-card::before {
  content: '';
  position: absolute;
  inset: -60% -30% auto -30%;
  height: 70%;
  background: radial-gradient(ellipse at center, var(--accent-soft), transparent 70%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.edu-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: 0 22px 52px var(--glow);
}

.edu-card:hover::before {
  opacity: 1;
}

.edu-card__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 18px;
  border-radius: 14px;
  background: var(--accent-soft);
  color: var(--accent-text);
}

.edu-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
  color: var(--text-3);
  font-size: 0.78rem;
  font-weight: 600;
}

.edu-card__type {
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.edu-card h3 {
  margin-bottom: 4px;
  font-size: 1.2rem;
}

.edu-card__org {
  color: var(--text-2);
  font-size: 0.95rem;
  font-weight: 600;
}

.edu-card__blurb {
  margin-top: 10px;
  color: var(--text-3);
  font-size: 0.9rem;
  line-height: 1.65;
}

.edu-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.edu-card__tags li {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-2);
  font-size: 0.8rem;
  font-weight: 600;
}

@media (max-width: 720px) {
  .edu__grid {
    grid-template-columns: 1fr;
  }
}
</style>
