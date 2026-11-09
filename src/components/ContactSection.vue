<script setup>
import { onBeforeUnmount, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const email = 'sadiyahputri32@gmail.com'
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const copied = ref(false)
const showToast = ref(false)
const sending = ref(false)
const feedback = ref(null)
const form = ref({ name: '', email: '', message: '' })
let timer = null

function fallbackCopy(text) {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  document.execCommand('copy')
  document.body.removeChild(field)
}

async function copyEmail() {
  let success = false

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email)
      success = true
    }
  } catch (error) {
    success = false
  }

  if (!success) {
    try {
      fallbackCopy(email)
      success = true
    } catch (error) {
      success = false
    }
  }

  if (!success) return

  copied.value = true
  showToast.value = true
  clearTimeout(timer)
  timer = window.setTimeout(() => {
    copied.value = false
    showToast.value = false
  }, 2200)
}

async function submitForm() {
  if (sending.value) return

  feedback.value = null
  const name = form.value.name.trim()
  const mail = form.value.email.trim()
  const message = form.value.message.trim()

  if (!name || !mail || !message) {
    feedback.value = { type: 'error', text: 'Nama, email, dan pesan wajib diisi.' }
    return
  }

  if (!emailPattern.test(mail)) {
    feedback.value = { type: 'error', text: 'Masukkan alamat email yang valid.' }
    return
  }

  sending.value = true

  try {
    if (!accessKey) throw new Error('Missing Web3Forms access key')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email: mail,
        message,
        subject: `Pesan baru dari ${name}`,
      }),
    })

    const result = await response.json().catch(() => ({}))
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Request failed')
    }

    form.value = { name: '', email: '', message: '' }
    feedback.value = { type: 'success', text: 'Pesan terkirim! Terima kasih 😊' }
  } catch (error) {
    feedback.value = { type: 'error', text: 'Gagal mengirim, coba lagi' }
  } finally {
    sending.value = false
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="contact__card">
        <div v-reveal class="contact__inner">
          <span class="kicker">Contact</span>
          <h2 class="contact__title">Let's build something together</h2>
          <p class="contact__sub">
            Have a project in mind or a role to fill? I'm open to freelance work, internships, and
            full-time opportunities. Tell me what you're building — I'll get back to you soon.
          </p>

          <div class="contact__actions">
            <a
              class="btn btn--primary"
              href="https://www.linkedin.com/in/putrisadiyah"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon name="linkedin" :size="18" />
              LinkedIn
            </a>

            <a
              class="btn btn--ghost"
              href="https://github.com/putrisadiyah19"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon name="github" :size="18" />
              GitHub
            </a>

            <button class="btn btn--ghost" type="button" @click="copyEmail">
              <AppIcon :name="copied ? 'check' : 'copy'" :size="18" />
              {{ copied ? 'Copied!' : 'Copy Email' }}
            </button>

            <a
              class="btn btn--ghost"
              href="/cv-putri-id.pdf"
              download="CV-Halimatussadiyah-Lola-Putri.pdf"
            >
              <AppIcon name="download" :size="18" />
              Download CV
            </a>

            <a
              class="btn btn--ghost"
              href="/resume-putri-en.pdf"
              download="Resume-Halimatussadiyah-Lola-Putri.pdf"
            >
              <AppIcon name="download" :size="18" />
              Download Resume
            </a>
          </div>

          <a class="contact__mail" href="mailto:sadiyahputri32@gmail.com">
            <AppIcon name="mail" :size="16" />
            {{ email }}
          </a>

          <form class="contact__form" novalidate @submit.prevent="submitForm">
            <div class="contact__form-row">
              <label class="field">
                <span>Nama</span>
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  placeholder="Nama lengkap"
                  required
                />
              </label>

              <label class="field">
                <span>Email</span>
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="nama@email.com"
                  required
                />
              </label>
            </div>

            <label class="field">
              <span>Pesan</span>
              <textarea
                v-model="form.message"
                name="message"
                rows="4"
                placeholder="Ceritakan project atau peran yang Anda tawarkan..."
                required
              ></textarea>
            </label>

            <p
              v-if="feedback"
              class="contact__feedback"
              :class="`is-${feedback.type}`"
              role="status"
              aria-live="polite"
            >
              {{ feedback.text }}
            </p>

            <button
              class="btn btn--primary contact__submit"
              type="submit"
              :disabled="sending"
              :aria-busy="sending"
            >
              <AppIcon name="send" :size="17" />
              {{ sending ? 'Mengirim...' : 'Kirim Pesan' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <Transition name="toast">
      <div v-if="showToast" class="toast" role="status" aria-live="polite">
        <AppIcon name="check" :size="16" />
        Email disalin!
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.contact__card {
  position: relative;
  overflow: hidden;
  padding: clamp(32px, 6vw, 64px);
  border: 1px solid var(--border);
  border-radius: 32px;
  background: var(--bg-elev);
  box-shadow: var(--shadow-sm);
}

.contact__card::before {
  content: '';
  position: absolute;
  top: -280px;
  left: 50%;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-soft), transparent 65%);
  transform: translateX(-50%);
  pointer-events: none;
}

.contact__inner {
  position: relative;
  max-width: 680px;
  margin-inline: auto;
  text-align: center;
}

.contact__title {
  font-size: clamp(2rem, 4.4vw, 3rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.contact__sub {
  max-width: 56ch;
  margin: 16px auto 0;
  color: var(--text-2);
  font-size: 1.02rem;
  line-height: 1.7;
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

.contact__mail {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  color: var(--text-3);
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.25s ease;
}

.contact__mail:hover {
  color: var(--accent-text);
}

.contact__form {
  max-width: 560px;
  margin: 28px auto 0;
  padding-top: 26px;
  border-top: 1px solid var(--border);
  text-align: left;
}

.contact__form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 14px;
}

.field {
  display: grid;
  gap: 6px;
}

.field span {
  color: var(--text-2);
  font-size: 0.8rem;
  font-weight: 600;
}

.field input,
.field textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg);
  color: var(--text);
  font: inherit;
  font-size: 0.9rem;
  line-height: 1.5;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.field textarea {
  min-height: 118px;
  resize: vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--text-3);
  opacity: 0.75;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.contact__feedback {
  margin-top: 14px;
  padding: 11px 16px;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 600;
  text-align: center;
}

.contact__feedback.is-success {
  border-color: rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.contact__feedback.is-error {
  border-color: rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
}

:global([data-theme='dark']) .contact__feedback.is-success {
  color: #86efac;
}

:global([data-theme='dark']) .contact__feedback.is-error {
  color: #fca5a5;
}

.contact__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
}

.contact__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  z-index: 80;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font-size: 0.88rem;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  transform: translateX(-50%);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}

@media (max-width: 640px) {
  .contact__form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .contact__actions {
    flex-direction: column;
  }

  .contact__actions .btn {
    width: 100%;
  }
}
</style>
