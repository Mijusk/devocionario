<script setup lang="ts">
import { prayersBySlug } from '~/data'
import type { PrayerLink } from '~/composables/useMyPrayers'
import type { HourKey } from '~/composables/useToday'
import { mysterySetForDay } from '~/data/rosary'

useHead({ title: 'Devocionario' })

const now = useNow()
const mounted = ref(false)

// Apertura: al abrir la app o recargar, «Paz y bien» sobre la vidriera cerrada
// durante un segundo; luego las dos hojas se abren y aparece el cielo de la hora.
// Al volver a Hoy desde otra pantalla ya no se repite (solo en la primera carga).
type Phase = 'intro' | 'opening' | 'open'
const nuxtApp = useNuxtApp()
const phase = ref<Phase>(import.meta.server || nuxtApp.isHydrating ? 'intro' : 'open')
const timers: ReturnType<typeof setTimeout>[] = []
const openWindow = () => {
  if (phase.value !== 'intro') return
  phase.value = 'opening'
  timers.push(setTimeout(() => (phase.value = 'open'), 2000))
}

onMounted(() => {
  mounted.value = true
  if (phase.value === 'intro') {
    // Al menos un segundo entero a la vista, contando desde que empezó a cargar.
    timers.push(setTimeout(openWindow, Math.max(700, 1300 - performance.now())))
  }
})
onBeforeUnmount(() => timers.forEach(clearTimeout))

const today = computed(() => longDate(now.value))
const season = computed(() => liturgicalSeason(now.value))
const set = computed(() => mysterySetForDay(now.value.getDay()))
const greeting = computed(() => greetingFor(now.value))

// Las cinco horas del día. La que toca ahora va marcada; tocar otra la muestra
// en la ventana sin salir de la pantalla.
const hours = computed(() => hoursOfDay(now.value))
const nowKey = computed(() => currentHourKey(now.value))
const picked = ref<HourKey | null>(null)
const shown = computed(() => hours.value.find((h) => h.key === (picked.value ?? nowKey.value))!)
const pick = (key: HourKey) => (picked.value = key === nowKey.value ? null : key)

// El cielo de la ventana sigue la hora real. El script inicial del <head> ya
// pone data-sky antes de pintar; aquí solo se mantiene al día.
watchEffect(() => {
  if (import.meta.client && mounted.value) document.documentElement.dataset.sky = skyFor(now.value)
})

const recent = useRecent()
const { resolve } = usePrayerLinks()
const recentPrayer = computed(() => (recent.value ? resolve(recent.value.slug) : undefined))
const { favorites } = useFavorites()
const favPrayers = computed(() =>
  favorites.value
    .map(resolve)
    .filter((p): p is PrayerLink => !!p)
    .slice(0, 5),
)
const { active, daysFor, doneToday, streak } = useTracking()
const tracked = computed(() => active.value.map((s) => prayersBySlug[s]).filter(Boolean))
const progress = (slug: string, goal?: number) => (goal ? Math.min(1, daysFor(slug).length / goal) : 0)

const showSettings = ref(false)

// La ventana de lo alto: arco apuntado, en unidades de un lienzo de 100 × 150.
const ARCH = 'M0 146V58C0 30 22 9 50 0C78 9 100 30 100 58V146Q100 150 96 150H4Q0 150 0 146Z'
const ARCH_IN = 'M3.4 146.6V58.6C3.4 32 24.5 12.4 50 4.2C75.5 12.4 96.6 32 96.6 58.6V146.6Z'
// Las dos hojas de la vidriera, dentro del filete de oro.
const LEAF_L = 'M3.4 146.6V58.6C3.4 32 24.5 12.4 50 4.2V146.6Z'
const LEAF_R = 'M50 4.2C75.5 12.4 96.6 32 96.6 58.6V146.6H50Z'

// Estrellas fijas en la parte alta del cielo: [x %, y %, tamaño].
// Quedan fuera de los textos: en lo alto del arco y en los márgenes.
const stars = [
  [50, 6.5, 1.1], [39, 11, 0.55], [61, 10.5, 0.75], [30, 16.5, 0.5], [70, 16, 0.8],
  [10, 27, 0.6], [91, 30, 0.7], [8, 45, 0.5], [92, 48, 0.55], [11, 62, 0.45], [89, 66, 0.5],
]
</script>

<template>
  <div class="page">
    <header class="home-head">
      <span class="home-head__brand"><span class="home-head__mark" aria-hidden="true">✠</span>Devocionario</span>
      <button class="home-head__btn" aria-label="Ajustes de lectura y apariencia" @click="showSettings = true">
        <AppIcon name="settings" :size="22" />
      </button>
    </header>

    <section class="ventana" :class="`is-${phase}`" aria-labelledby="hoy-title">
      <svg class="ventana__glass" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ventana-cielo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" class="sky-1" />
            <stop offset="0.55" class="sky-2" />
            <stop offset="1" class="sky-3" />
          </linearGradient>
          <radialGradient id="ventana-luz" cx="0.5" cy="1" r="0.8">
            <stop offset="0" class="glow-1" />
            <stop offset="1" class="glow-2" />
          </radialGradient>
          <!-- Vidriera: cristal de lapislázuli, luz que lo atraviesa y emplomado en rombos -->
          <linearGradient id="vidriera-cristal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#14275c" />
            <stop offset="0.6" stop-color="#1f3d82" />
            <stop offset="1" stop-color="#2a4c94" />
          </linearGradient>
          <radialGradient id="vidriera-luz" cx="0.5" cy="0.42" r="0.6">
            <stop offset="0" stop-color="#f3dfae" stop-opacity="0.32" />
            <stop offset="1" stop-color="#f3dfae" stop-opacity="0" />
          </radialGradient>
          <pattern id="vidriera-plomo" patternUnits="userSpaceOnUse" width="9.5" height="13">
            <path d="M4.75 0L9.5 6.5L4.75 13L0 6.5Z" fill="none" stroke="#e7cd8f" stroke-opacity="0.5" stroke-width="0.3" />
          </pattern>
        </defs>
        <path :d="ARCH" fill="url(#ventana-cielo)" />
        <path :d="ARCH" fill="url(#ventana-luz)" />
        <path :d="ARCH_IN" class="ventana__lead" vector-effect="non-scaling-stroke" />
      </svg>

      <div class="ventana__stars" aria-hidden="true">
        <svg
          v-for="([x, y, s], i) in stars"
          :key="i"
          viewBox="-3 -3 6 6"
          :style="{ left: `${x}%`, top: `${y}%`, width: `${s * 0.85}rem` }"
        >
          <path d="M0 -2.4L.5 -.5L2.4 0L.5 .5L0 2.4L-.5 .5L-2.4 0L-.5 -.5Z" />
        </svg>
      </div>

      <div v-if="phase !== 'open'" class="vidriera" aria-hidden="true" @click="openWindow">
        <div class="vidriera__hoja vidriera__hoja--izq">
          <svg viewBox="0 0 50 150" preserveAspectRatio="none">
            <path :d="LEAF_L" fill="url(#vidriera-cristal)" />
            <path :d="LEAF_L" fill="url(#vidriera-plomo)" />
            <path :d="LEAF_L" fill="url(#vidriera-luz)" />
            <path d="M50 4.2V146.6" class="vidriera__parteluz" vector-effect="non-scaling-stroke" />
          </svg>
        </div>
        <div class="vidriera__hoja vidriera__hoja--der">
          <svg viewBox="50 0 50 150" preserveAspectRatio="none">
            <path :d="LEAF_R" fill="url(#vidriera-cristal)" />
            <path :d="LEAF_R" fill="url(#vidriera-plomo)" />
            <path :d="LEAF_R" fill="url(#vidriera-luz)" />
            <path d="M50 4.2V146.6" class="vidriera__parteluz" vector-effect="non-scaling-stroke" />
          </svg>
        </div>
        <p class="vidriera__paz">Paz y bien</p>
      </div>

      <div class="ventana__inner">
        <p class="ventana__date">
          <template v-if="mounted">{{ today }}</template>
          <template v-else>&nbsp;</template>
        </p>
        <p class="ventana__season">
          <template v-if="mounted">
            <span class="season-mark" :data-color="season.color" aria-hidden="true" />{{ season.name }}
          </template>
          <template v-else>&nbsp;</template>
        </p>

        <h1 id="hoy-title" class="ventana__greeting">{{ mounted ? greeting : 'Paz y bien' }}</h1>

        <div class="ventana__now" :class="{ 'is-ready': mounted }" aria-live="polite">
          <p class="ventana__prayer">{{ mounted ? shown.title : '…' }}</p>
          <p class="ventana__reason">{{ mounted ? shown.reason : '' }}</p>
          <NuxtLink :to="mounted ? shown.to : '/explorar'" class="btn btn--gold ventana__cta">Rezar ahora</NuxtLink>
        </div>

        <ol class="horas" :class="{ 'is-ready': mounted }" aria-label="Las horas de oración del día">
          <li v-for="h in hours" :key="h.key">
            <button
              class="horas__btn"
              :class="{ 'is-now': mounted && h.key === nowKey, 'is-shown': mounted && h.key === shown.key }"
              :aria-pressed="mounted && h.key === shown.key"
              @click="pick(h.key)"
            >
              <span class="horas__dot" aria-hidden="true" />
              <span class="horas__name">{{ h.name }}</span>
              <span v-if="mounted && h.key === nowKey" class="visually-hidden">(ahora)</span>
            </button>
          </li>
        </ol>
      </div>
    </section>

    <PalabraDeVida />

    <section>
      <h2 class="section-title">El Rosario de hoy</h2>
      <NuxtLink :to="mounted ? `/rosario?m=${set.slug}` : '/rosario'" class="rosary">
        <span class="rosary__icon"><AppIcon name="beads" :size="24" /></span>
        <span class="row__body">
          <span class="row__title">{{ mounted ? set.title : 'Santo Rosario' }}</span>
          <span class="rosary__summary">{{ mounted ? `Empieza por ${set.mysteries[0].title.charAt(0).toLowerCase()}${set.mysteries[0].title.slice(1)}.` : 'Guiado, misterio a misterio.' }}</span>
        </span>
        <AppIcon name="chevron-right" :size="18" class="row__icon" />
      </NuxtLink>
    </section>

    <section v-if="mounted && recentPrayer">
      <h2 class="section-title">Seguir rezando</h2>
      <ul class="rows">
        <li>
          <NuxtLink :to="recentPrayer.to" class="row">
            <span class="row__body">
              <span class="row__title">{{ recentPrayer.title }}</span>
              <span v-if="recentPrayer.summary" class="row__summary">{{ recentPrayer.summary }}</span>
            </span>
            <AppIcon name="chevron-right" :size="18" class="row__icon" />
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section v-if="mounted && tracked.length">
      <h2 class="section-title">Devociones en curso</h2>
      <ul class="rows">
        <li v-for="p in tracked" :key="p.slug">
          <NuxtLink :to="`/oracion/${p.slug}`" class="row devotion">
            <span class="row__body">
              <span class="row__title">{{ p.title }}</span>
              <span class="row__summary">
                {{ daysFor(p.slug).length }} {{ daysFor(p.slug).length === 1 ? 'día' : 'días' }}<template v-if="p.tracking?.goalDays"> de {{ p.tracking.goalDays }}</template><template v-if="streak(p.slug) > 1">, {{ streak(p.slug) }} seguidos</template>
              </span>
              <span v-if="p.tracking?.goalDays" class="devotion__bar" aria-hidden="true">
                <span :style="{ transform: `scaleX(${progress(p.slug, p.tracking.goalDays)})` }" />
              </span>
            </span>
            <span class="status" :class="{ 'is-done': doneToday(p.slug) }">
              <AppIcon :name="doneToday(p.slug) ? 'check' : 'clock'" :size="18" />
              {{ doneToday(p.slug) ? 'Hecho hoy' : 'Pendiente' }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="section-title">Guardadas</h2>
      <ul v-if="mounted && favPrayers.length" class="rows">
        <li v-for="p in favPrayers" :key="p.slug">
          <NuxtLink :to="p.to" class="row">
            <span class="row__body">
              <span class="row__title">{{ p.title }}</span>
            </span>
            <AppIcon name="chevron-right" :size="18" class="row__icon" />
          </NuxtLink>
        </li>
      </ul>
      <p v-else class="hint">
        Guarda las oraciones que reces a menudo con el marcador
        <AppIcon name="bookmark" :size="16" class="inline-icon" /> y aparecerán aquí.
      </p>
    </section>

    <ReadingSettings v-model="showSettings" />
  </div>
</template>

<style scoped>
/* ── Cabecera discreta ─────────────────────────────────────────────── */
.home-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -0.25rem -0.5rem 0.75rem 0;
}

.home-head__brand {
  display: inline-flex;
  align-items: baseline;
  gap: 0.45rem;
  font-family: var(--font-text);
  font-weight: 500;
  font-size: 1.15rem;
  letter-spacing: 0.01em;
}

.home-head__mark {
  color: var(--rubric);
  font-size: 0.95em;
}

.home-head__btn {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  color: var(--ink-soft);
}

.home-head__btn:active {
  background: var(--vellum-deep);
}

@media (min-width: 900px) {
  .home-head__brand {
    visibility: hidden;
  }
}

/* ── La ventana: arco apuntado con el cielo de la hora ─────────────── */
.ventana {
  --sky-1: #193b80;
  --sky-2: #2b58a3;
  --sky-3: #4a76bb;
  --glow: #cfe0ff;
  --glow-o: 0.22;
  --stars: 0;
  position: relative;
  isolation: isolate;
  color: #f6f1e4;
  filter: drop-shadow(0 18px 30px rgb(19 39 90 / 0.22));
}

:root[data-sky='alba'] .ventana {
  --sky-1: #182a5e;
  --sky-2: #3a4885;
  --sky-3: #a97b80;
  --glow: #f3c49a;
  --glow-o: 0.55;
  --stars: 0.3;
}

:root[data-sky='tarde'] .ventana {
  --sky-1: #141f4b;
  --sky-2: #33386f;
  --sky-3: #8c5640;
  --glow: #f0a560;
  --glow-o: 0.45;
  --stars: 0.5;
}

:root[data-sky='noche'] .ventana {
  --sky-1: #0c1736;
  --sky-2: #13224b;
  --sky-3: #1d3368;
  --glow: #7694dc;
  --glow-o: 0.2;
  --stars: 0.95;
}

@media (min-width: 900px) {
  .ventana {
    max-width: 28rem;
    margin-inline: auto;
  }
}

.ventana__glass {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: visible;
}

.sky-1 { stop-color: var(--sky-1); }
.sky-2 { stop-color: var(--sky-2); }
.sky-3 { stop-color: var(--sky-3); }
.glow-1 { stop-color: var(--glow); stop-opacity: var(--glow-o); }
.glow-2 { stop-color: var(--glow); stop-opacity: 0; }

/* Filete de oro que repite el arco, como el emplomado de una vidriera */
.ventana__lead {
  fill: none;
  stroke: rgb(227 199 133 / 0.7);
  stroke-width: 1;
}

.ventana__stars {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: var(--stars);
  pointer-events: none;
}

.ventana__stars svg {
  position: absolute;
  transform: translate(-50%, -50%);
  fill: #ecd59c;
}

.ventana__inner {
  padding: 5.5rem 1.75rem 1.4rem;
  text-align: center;
}

.ventana__date {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #e7cd8f;
}

.ventana__date::first-letter {
  text-transform: uppercase;
}

.ventana__season {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin: 0.1rem 0 0;
  font-family: var(--font-text);
  font-style: italic;
  font-size: 0.95rem;
  color: rgb(246 241 228 / 0.72);
}

/* El color litúrgico del tiempo, como la cinta de un misal */
.season-mark {
  width: 0.5rem;
  height: 0.5rem;
  transform: rotate(45deg);
  background: #f6f1e4;
}
.season-mark[data-color='verde'] { background: #6fb086; }
.season-mark[data-color='morado'] { background: #a98bd4; }
.season-mark[data-color='rojo'] { background: #e0675e; }
.season-mark[data-color='blanco'] { background: #f6f1e4; box-shadow: 0 0 0 1px #e7cd8f; }

.ventana__greeting {
  margin: 1.1rem 0 1.4rem;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(2.6rem, 12vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

.ventana__now {
  margin: 0 auto;
  max-width: 21rem;
  padding-top: 1.3rem;
  border-top: 1px solid rgb(227 199 133 / 0.3);
  opacity: 0.001;
  transition: opacity 0.5s ease 0.1s;
}

.ventana__now.is-ready {
  opacity: 1;
}

.ventana__prayer {
  margin: 0;
  font-family: var(--font-text);
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 1.15;
  text-wrap: balance;
}

.ventana__reason {
  margin: 0.4rem 0 1.3rem;
  color: rgb(246 241 228 / 0.8);
  min-height: 1.45em;
  text-wrap: balance;
}

.ventana__cta {
  min-width: 11rem;
}

/* ── Apertura: la vidriera se abre ─────────────────────────────────── */
.vidriera {
  position: absolute;
  inset: 0;
  z-index: 3;
  perspective: 1100px;
  cursor: pointer;
}

.vidriera__hoja {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  backface-visibility: hidden;
  transition:
    transform 1.6s cubic-bezier(0.42, 0.04, 0.22, 1),
    opacity 0.6s ease 0.95s;
}

.vidriera__hoja svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* Cada hoja gira sobre su bisagra, en el filete de oro del borde */
.vidriera__hoja--izq {
  left: 0;
  transform-origin: 6.8% 50%;
}

.vidriera__hoja--der {
  right: 0;
  transform-origin: 93.2% 50%;
}

.vidriera__parteluz {
  stroke: #e7cd8f;
  stroke-opacity: 0.85;
  stroke-width: 1.5;
}

.vidriera__paz {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  margin: 0;
  padding-bottom: 8%;
  font-family: var(--font-text);
  font-style: italic;
  font-size: clamp(2.6rem, 12vw, 3.4rem);
  letter-spacing: -0.02em;
  color: #f6f1e4;
  text-shadow: 0 2px 18px rgb(8 16 40 / 0.6);
  transition: opacity 0.4s ease, transform 0.6s ease;
}

.ventana.is-opening .vidriera {
  pointer-events: none;
}

.ventana.is-opening .vidriera__hoja--izq {
  transform: rotateY(-96deg);
  opacity: 0;
}

.ventana.is-opening .vidriera__hoja--der {
  transform: rotateY(96deg);
  opacity: 0;
}

.ventana.is-opening .vidriera__paz {
  opacity: 0;
  transform: scale(0.97);
}

/* Lo de dentro aparece cuando las hojas ya van abiertas */
.ventana.is-intro .ventana__inner,
.ventana.is-intro .ventana__stars {
  opacity: 0;
}

.ventana.is-opening .ventana__inner {
  transition: opacity 0.9s ease 0.6s;
}

.ventana.is-opening .ventana__stars {
  transition: opacity 1.2s ease 0.6s;
}

@media (prefers-reduced-motion: reduce) {
  .vidriera__hoja {
    transform: none !important;
  }
}

/* ── Las horas del día ─────────────────────────────────────────────── */
.horas {
  position: relative;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 2rem -1rem 0;
  padding: 0;
  opacity: 0.001;
  transition: opacity 0.5s ease 0.2s;
}

.horas.is-ready {
  opacity: 1;
}

/* La línea del día, de la mañana a la noche */
.horas::before {
  content: '';
  position: absolute;
  left: 10%;
  right: 10%;
  top: calc(0.55rem + 4.5px);
  height: 1px;
  background: rgb(227 199 133 / 0.38);
}

.horas__btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.55rem 0 0.35rem;
  font-size: 0.8rem;
  color: rgb(246 241 228 / 0.72);
  border-radius: 8px;
}

.horas__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid rgb(231 205 143 / 0.75);
  background: var(--sky-3);
  transition: transform 0.2s ease;
}

.horas__btn.is-now .horas__dot {
  background: #e7cd8f;
  border-color: #e7cd8f;
  box-shadow: 0 0 0 4px rgb(231 205 143 / 0.18), 0 0 12px rgb(231 205 143 / 0.55);
}

.horas__btn.is-shown {
  color: #f6f1e4;
  font-weight: 700;
}

.horas__btn.is-shown .horas__dot {
  transform: scale(1.25);
}

.horas__btn:focus-visible {
  outline-color: #e7cd8f;
}

/* ── Resto de la pantalla ──────────────────────────────────────────── */
.rosary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.1rem;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--line-soft);
  box-shadow: var(--shadow);
}

.rosary:active {
  background: var(--vellum-deep);
}

.rosary__icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  flex: none;
  border-radius: 50%;
  color: var(--gold);
  border: 1px solid var(--gold-soft);
}

.rosary__summary {
  display: block;
  color: var(--ink-soft);
  font-size: 0.95rem;
  margin-top: 0.15rem;
}

.devotion__bar {
  display: block;
  height: 3px;
  margin-top: 0.55rem;
  border-radius: 2px;
  background: var(--line-soft);
  overflow: hidden;
}

.devotion__bar span {
  display: block;
  height: 100%;
  background: linear-gradient(to right, var(--gold-soft), var(--gold));
  transform-origin: left;
}

.status {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: var(--rubric);
}

.status.is-done {
  color: var(--gold);
}

.hint {
  color: var(--ink-soft);
  margin: 0.25rem 0 0;
}

.inline-icon {
  vertical-align: -0.2em;
  color: var(--gold);
}
</style>
