const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default {
  mounted(el, binding) {
    el.classList.add('reveal')

    const delay = Number(binding.value?.delay ?? 0)
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`
      window.setTimeout(() => {
        el.style.transitionDelay = ''
      }, delay + 900)
    }

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    el._revealObserver = observer
  },

  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}
