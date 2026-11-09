<script setup>
import AppIcon from './AppIcon.vue'

const groups = [
  {
    title: 'Design',
    icon: 'palette',
    blurb: 'Interfaces people enjoy using.',
    items: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'User Flow'],
  },
  {
    title: 'Development',
    icon: 'code',
    blurb: 'Clean, responsive front ends.',
    items: ['HTML', 'CSS', 'JavaScript', 'React/Next.js', 'Tailwind', 'Git'],
  },
  {
    title: 'AI & Data',
    icon: 'cpu',
    blurb: 'Models, data, and experiments.',
    items: ['Python', 'RoBERTa/NLP', 'Web Scraping', 'Data Analysis', 'Streamlit'],
  },
]
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div v-reveal class="section-head">
        <span class="kicker">Skills</span>
        <h2 class="section-title">What I work with</h2>
        <p class="section-sub">
          A blend of design craft, front-end engineering, and applied AI — chosen to move an idea
          from first sketch to a working product.
        </p>
      </div>

      <div class="skills__grid">
        <article
          v-for="(group, index) in groups"
          :key="group.title"
          v-reveal="{ delay: index * 90 }"
          class="skill-card"
        >
          <span class="skill-card__icon">
            <AppIcon :name="group.icon" :size="22" />
          </span>
          <h3>{{ group.title }}</h3>
          <p>{{ group.blurb }}</p>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.skill-card {
  position: relative;
  padding: 28px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--bg-elev);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}

.skill-card::before {
  content: '';
  position: absolute;
  inset: -60% -30% auto -30%;
  height: 70%;
  background: radial-gradient(ellipse at center, var(--accent-soft), transparent 70%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.skill-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: 0 22px 52px var(--glow);
}

.skill-card:hover::before {
  opacity: 1;
}

.skill-card__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 18px;
  border-radius: 14px;
  background: var(--accent-soft);
  color: var(--accent-text);
}

.skill-card h3 {
  margin-bottom: 6px;
  font-size: 1.2rem;
}

.skill-card p {
  margin-bottom: 18px;
  color: var(--text-3);
  font-size: 0.9rem;
}

.skill-card ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-card li {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-2);
  font-size: 0.8rem;
  font-weight: 600;
}

@media (max-width: 980px) {
  .skills__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .skills__grid {
    grid-template-columns: 1fr;
  }
}
</style>
