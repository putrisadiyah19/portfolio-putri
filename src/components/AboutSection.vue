<script setup>
import AppIcon from './AppIcon.vue'

const focusAreas = ['Clear user flows', 'Thoughtful visuals', 'Code that works']
</script>

<template>
  <section id="about" class="section">
    <div class="container about__grid">
      <div v-reveal class="about__intro">
        <span class="kicker">About me</span>
        <h2 class="section-title">Design-minded,<br />code-driven.</h2>
        <p class="about__location">
          <AppIcon name="map-pin" :size="16" />
          Yogyakarta, Indonesia
        </p>
      </div>

      <div v-reveal="{ delay: 80 }" class="about__card">
        <p class="about__text">
          Hi, I'm Putri, a UI/UX designer and web developer based in Yogyakarta. I love turning ideas
          into interfaces that feel easy and enjoyable to use, from cinema ticketing platforms to
          tourism and service apps. I've worked as a Fullstack Web Developer intern at PT GIT
          Solution, and I also explore AI, building a RoBERTa-based text classification model for
          mental health screening research. I care about the details: clear user flows, thoughtful
          visuals, and code that works. Currently open to freelance projects, internships, and
          full-time opportunities.
        </p>

        <ul class="about__chips">
          <li v-for="area in focusAreas" :key="area">{{ area }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(32px, 6vw, 72px);
  align-items: start;
}

.about__intro {
  position: sticky;
  top: calc(var(--nav-h) + 32px);
}

.about__location {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  color: var(--text-3);
  font-size: 0.9rem;
}

.about__location svg {
  color: var(--accent-text);
}

.about__card {
  padding: clamp(24px, 4vw, 40px);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--bg-elev);
  box-shadow: var(--shadow-sm);
}

.about__text {
  color: var(--text-2);
  font-size: 1.05rem;
  line-height: 1.85;
}

.about__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid var(--border);
}

.about__chips li {
  padding: 7px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-text);
  font-size: 0.82rem;
  font-weight: 600;
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .about__intro {
    position: static;
  }
}
</style>
