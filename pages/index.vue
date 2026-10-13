<script setup lang="ts">
import { prayersBySlug, epigraph } from '~/data'
import { mysterySetForDay } from '~/data/rosary'

useHead({ title: 'Devocionario' })

const now = useNow()
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const suggestion = computed(() => suggestionFor(now.value))
const today = computed(() => longDate(now.value))
const set = computed(() => mysterySetForDay(now.value.getDay()))

const recent = useRecent()
const recentPrayer = computed(() => (recent.value ? prayersBySlug[recent.value.slug] : undefined))
const { favorites } = useFavorites()
const favPrayers = computed(() => favorites.value.map((s) => prayersBySlug[s]).filter(Boolean).slice(0, 5))
const { active, daysFor, doneToday, streak } = useTracking()
const tracked = computed(() => active.value.map((s) => prayersBySlug[s]).filter(Boolean))

// Estrellas del retablo: posiciones fijas, como el cielo de la tabla gótica.
const stars = [
  [8, 14, 1], [22, 6, 0.8], [37, 18, 0.6], [58, 9, 1], [74, 20, 0.7], [90, 12, 0.9],
  [14, 38, 0.6], [86, 40, 0.7], [6, 66, 0.8], [94, 70, 0.6], [80, 88, 0.9], [18, 90, 0.7],
]
</script>

<template>
  <div class="page">
    <section class="retablo" aria-labelledby="hoy-title">
      <svg class="retablo__stars" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g v-for="([x, y, s], i) in stars" :key="i" :transform="`translate(${x} ${y}) scale(${s})`">
          <path d="M0 -2.2 L0.55 -0.55 L2.2 0 L0.55 0.55 L0 2.2 L-0.55 0.55 L-2.2 0 L-0.55 -0.55 Z" />
        </g>
      </svg>

      <div class="retablo__inner">
        <p class="retablo__date">
          <template v-if="mounted">{{ today }}</template>
          <template v-else>&nbsp;</template>
        </p>
        <h1 id="hoy-title" class="retablo__greeting">{{ mounted ? suggestion.greeting : 'Paz y bien' }}</h1>

        <div class="retablo__now" :class="{ 'is-ready': mounted }">
          <p class="retablo__label">Para este momento</p>
          <p class="retablo__prayer">{{ mounted ? suggestion.title : '…' }}</p>
          <p class="retablo__reason">{{ mounted ? suggestion.reason : '' }}</p>
          <NuxtLink :to="mounted ? suggestion.to : '/explorar'" class="btn btn--gold retablo__cta">Rezar ahora</NuxtLink>
        </div>

        <figure class="retablo__epigraph">
          <blockquote>{{ epigraph.text }}</blockquote>
          <figcaption>{{ epigraph.cite }}</figcaption>
        </figure>
      </div>
    </section>

    <section>
      <h2 class="section-title">El Rosario de hoy</h2>
      <NuxtLink :to="mounted ? `/rosario?m=${set.slug}` : '/rosario'" class="rosary">
        <span class="rosary__icon"><AppIcon name="beads" :size="26" /></span>
        <span class="row__body">
          <span class="row__title">{{ mounted ? set.title : 'Santo Rosario' }}</span>
          <span class="row__summary">{{ mounted ? `Empieza por ${set.mysteries[0].title.charAt(0).toLowerCase()}${set.mysteries[0].title.slice(1)}.` : 'Guiado, misterio a misterio.' }}</span>
        </span>
        <AppIcon name="chevron-right" :size="18" class="row__icon" />
      </NuxtLink>
    </section>

    <section v-if="mounted && recentPrayer">
      <h2 class="section-title">Seguir rezando</h2>
      <ul class="rows">
        <li>
          <NuxtLink :to="`/oracion/${recentPrayer.slug}`" class="row">
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
          <NuxtLink :to="`/oracion/${p.slug}`" class="row">
            <span class="row__body">
              <span class="row__title">{{ p.title }}</span>
              <span class="row__summary">
                {{ daysFor(p.slug).length }} {{ daysFor(p.slug).length === 1 ? 'día' : 'días' }}<template v-if="p.tracking?.goalDays"> de {{ p.tracking.goalDays }}</template><template v-if="streak(p.slug) > 1">, {{ streak(p.slug) }} seguidos</template>
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
        <li v-for="p in favPrayers" :key="p!.slug">
          <NuxtLink :to="`/oracion/${p!.slug}`" class="row">
            <span class="row__body">
              <span class="row__title">{{ p!.title }}</span>
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
  </div>
</template>

<style scoped>
/* El retablo: arco de lapislázuli con estrellas doradas */
.retablo {
  position: relative;
  overflow: hidden;
  margin-top: 0.25rem;
  border-radius: 48% 48% 22px 22px / 15rem 15rem 22px 22px;
  background:
    radial-gradient(120% 80% at 50% 0%, #2c4e93 0%, transparent 70%),
    #1f3a73;
  color: #f4f0e4;
  isolation: isolate;
}

:root[data-theme='dark'] .retablo {
  background: radial-gradient(120% 80% at 50% 0%, #22407e 0%, transparent 70%), #182b57;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .retablo {
    background: radial-gradient(120% 80% at 50% 0%, #22407e 0%, transparent 70%), #182b57;
  }
}

@media (min-width: 900px) {
  .retablo {
    max-width: 30rem;
    margin-inline: auto;
  }
}

/* Filete dorado interior, que repite la forma del arco */
.retablo::before {
  content: '';
  position: absolute;
  inset: 7px;
  border: 1px solid rgb(216 191 133 / 0.6);
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
}

.retablo__stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: #d8bf85;
  opacity: 0.55;
  z-index: -1;
}

.retablo__inner {
  position: relative;
  z-index: 2;
  padding: 4.25rem 1.6rem 1.75rem;
  text-align: center;
}

.retablo__date {
  margin: 0;
  font-size: 0.95rem;
  color: #d8bf85;
}

.retablo__date::first-letter {
  text-transform: uppercase;
}

.retablo__greeting {
  font-size: clamp(2.4rem, 11vw, 3.4rem);
  margin: 0.3rem 0 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.retablo__now {
  margin: 0 auto;
  max-width: 22rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgb(216 191 133 / 0.35);
}

.retablo__label {
  margin: 0;
  font-family: var(--font-text);
  font-style: italic;
  color: #d8bf85;
}

.retablo__prayer {
  margin: 0.15rem 0 0.35rem;
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.65rem;
  line-height: 1.15;
}

.retablo__reason {
  margin: 0 0 1.25rem;
  color: rgb(244 240 228 / 0.8);
  min-height: 1.45em;
}

.retablo__cta {
  min-width: 11rem;
}

/* Único momento animado de la app: la sugerencia aparece al cargar */
.retablo__now {
  opacity: 0.001;
  transition: opacity 0.5s ease 0.1s;
}

.retablo__now.is-ready {
  opacity: 1;
}

.retablo__epigraph {
  margin: 2rem 0 0;
  font-family: var(--font-text);
  font-style: italic;
  font-size: 0.98rem;
  color: rgb(244 240 228 / 0.72);
}

.retablo__epigraph blockquote {
  margin: 0;
}

.retablo__epigraph figcaption {
  font-family: var(--font-ui);
  font-style: normal;
  font-size: 0.8rem;
  margin-top: 0.2rem;
  color: #d8bf85;
}

.rosary {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 0.25rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.rosary .row__summary {
  white-space: normal;
}

.rosary__icon {
  color: var(--gold);
  flex: none;
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
