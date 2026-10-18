<script setup lang="ts">
import { temas } from '~/data/palabras'

/**
 * Tarjeta de «Palabra de vida» para la pantalla Hoy.
 * Antes de sacarla se ve un papel doblado; al tocar se despliega el versículo.
 */
const { today, draw, isSaved, toggleSaved } = usePalabra()

const mounted = ref(false)
onMounted(() => (mounted.value = true))

/** Cambia en cada palabra nueva, para repetir la animación de desplegar. */
const revealKey = ref(0)
const sacar = () => {
  draw()
  revealKey.value++
  if (import.meta.client && 'vibrate' in navigator) navigator.vibrate?.(8)
}

const note = ref('')
const compartir = async () => {
  if (!today.value) return
  const text = palabraParaCompartir(today.value)
  try {
    if (navigator.share) await navigator.share({ text })
    else {
      await navigator.clipboard.writeText(text)
      note.value = 'Copiada'
      setTimeout(() => (note.value = ''), 1800)
    }
  } catch {
    /* compartir cancelado */
  }
}
</script>

<template>
  <section class="palabra" aria-labelledby="palabra-title">
    <h2 id="palabra-title" class="section-title">Palabra de vida</h2>

    <div class="palabra__card">
      <!-- Aún no se ha sacado (o la página todavía no ha cargado lo guardado) -->
      <div v-if="!mounted || !today" class="palabra__closed">
        <div class="paper" aria-hidden="true">
          <span class="paper__fold" />
          <span class="paper__seal">✠</span>
        </div>
        <p class="palabra__invite">Una frase de la Escritura para llevarte hoy.</p>
        <button class="btn btn--gold" :disabled="!mounted" @click="sacar">Sacar una palabra</button>
      </div>

      <figure v-else :key="revealKey" class="palabra__open" aria-live="polite">
        <blockquote class="palabra__text">{{ today.texto }}</blockquote>
        <figcaption class="palabra__cite">
          {{ today.cita }}
          <span class="palabra__tema">{{ temas[today.tema] }}</span>
        </figcaption>

        <div class="palabra__actions">
          <button class="palabra__again" @click="sacar">Sacar otra</button>
          <span class="palabra__icons">
            <button
              :aria-pressed="isSaved(today.id)"
              :aria-label="isSaved(today.id) ? 'Quitar de guardadas' : 'Guardar esta palabra'"
              @click="toggleSaved(today.id)"
            >
              <AppIcon name="bookmark" :filled="isSaved(today.id)" :size="22" />
            </button>
            <button aria-label="Compartir esta palabra" @click="compartir">
              <AppIcon name="share" :size="22" />
            </button>
          </span>
        </div>
        <p v-if="note" class="palabra__note" role="status">{{ note }}</p>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.palabra__card {
  position: relative;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  min-height: 13.5rem;
  overflow: hidden;
}

/* ── Antes de sacarla: papel doblado con sello ─────────────────────── */
.palabra__closed {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1.25rem 1.4rem;
}

.paper {
  position: relative;
  width: 4.5rem;
  height: 3.1rem;
  background: var(--vellum);
  border: 1px solid var(--gold-soft);
  border-radius: 3px;
  margin-bottom: 0.9rem;
  box-shadow: 0 6px 14px -8px rgb(20 30 60 / 0.35);
}

.paper__fold {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 49%, var(--gold-soft) 49% 51%, transparent 51%);
  opacity: 0.6;
}

.paper__seal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--rubric);
  color: #f6e9e2;
  font-size: 0.8rem;
}

.palabra__invite {
  margin: 0 0 1rem;
  font-family: var(--font-text);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--ink-soft);
}

/* ── Palabra sacada ────────────────────────────────────────────────── */
.palabra__open {
  margin: 0;
  padding: 1.4rem 1.25rem 0.75rem;
  transform-origin: top center;
  animation: unfold 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes unfold {
  from {
    opacity: 0;
    transform: perspective(600px) rotateX(-14deg) translateY(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.palabra__text {
  margin: 0;
  font-family: var(--font-text);
  font-size: calc(1.4rem * var(--reading-scale));
  line-height: 1.38;
  text-wrap: pretty;
}

/* Comilla de apertura en rojo, colgando a la izquierda */
.palabra__text::before {
  content: '«';
  color: var(--rubric);
  margin-left: -0.5em;
  padding-right: 0.06em;
}

.palabra__text::after {
  content: '»';
  color: var(--rubric);
}

.palabra__cite {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.3rem 0.75rem;
  font-weight: 700;
  color: var(--gold);
}

.palabra__tema {
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--ink-faint);
}

.palabra__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.9rem;
  border-top: 1px solid var(--line);
  padding-top: 0.25rem;
}

.palabra__again {
  color: var(--lapis);
  font-weight: 700;
  padding: 0.7rem 0;
}

.palabra__icons {
  display: flex;
}

.palabra__icons button {
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  place-items: center;
  color: var(--ink-soft);
}

.palabra__icons button[aria-pressed='true'] {
  color: var(--gold);
}

.palabra__note {
  position: absolute;
  right: 1rem;
  bottom: 3.4rem;
  margin: 0;
  font-size: 0.85rem;
  background: var(--ink);
  color: var(--vellum);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
}
</style>
