<script setup lang="ts">
import type { Prayer } from '~/types/prayer'

/**
 * Oración paso a paso (Rosario, Santa Brígida, Coronilla…).
 * Recuerda en qué paso se quedó cada oración. Se avanza con los botones,
 * deslizando el dedo o con las flechas del teclado.
 */
const props = defineProps<{ prayer: Prayer }>()

const steps = computed(() => props.prayer.steps ?? [])
const progress = useStepProgress()
const { doneToday, toggleToday } = useTracking()

const index = computed({
  get: () => Math.min(progress.value[props.prayer.slug] ?? 0, Math.max(steps.value.length - 1, 0)),
  set: (v: number) => {
    progress.value = { ...progress.value, [props.prayer.slug]: v }
  },
})

const finished = ref(false)
const step = computed(() => steps.value[index.value])
const counts = ref<Record<number, number>>({})
const stepCount = computed({
  get: () => counts.value[index.value] ?? 0,
  set: (v: number) => (counts.value = { ...counts.value, [index.value]: v }),
})
const counterDone = computed(() => !step.value?.count || stepCount.value >= step.value.count)

const isLast = computed(() => index.value === steps.value.length - 1)
const pct = computed(() => (finished.value ? 100 : ((index.value + 1) / steps.value.length) * 100))

const topEl = ref<HTMLElement | null>(null)
const scrollTop = () => {
  if (!import.meta.client || !topEl.value) return
  const y = topEl.value.getBoundingClientRect().top + window.scrollY - 70
  if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y), behavior: 'instant' as ScrollBehavior })
}

const next = () => {
  if (isLast.value) {
    finished.value = true
    index.value = 0
    counts.value = {}
  } else {
    index.value++
  }
  nextTick(scrollTop)
}
const prev = () => {
  if (finished.value) {
    finished.value = false
    index.value = steps.value.length - 1
  } else if (index.value > 0) {
    index.value--
  }
  nextTick(scrollTop)
}
const restart = () => {
  finished.value = false
  index.value = 0
  counts.value = {}
}

// Gestos: deslizar en horizontal cambia de paso.
let sx = 0
let sy = 0
const onTouchStart = (e: TouchEvent) => {
  sx = e.touches[0].clientX
  sy = e.touches[0].clientY
}
const onTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - sx
  const dy = e.changedTouches[0].clientY - sy
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) {
    if (dx < 0 && !finished.value) next()
    else if (dx > 0) prev()
  }
}

const onKey = (e: KeyboardEvent) => {
  const t = e.target as HTMLElement
  if (t && ['INPUT', 'TEXTAREA'].includes(t.tagName)) return
  if (e.key === 'ArrowRight' && !finished.value) next()
  if (e.key === 'ArrowLeft') prev()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div ref="topEl" class="guided" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
    <div
      class="bar"
      role="progressbar"
      :aria-valuemin="1"
      :aria-valuemax="steps.length"
      :aria-valuenow="index + 1"
      :aria-label="`Paso ${index + 1} de ${steps.length}`"
    >
      <span :style="{ width: `${pct}%` }" />
    </div>

    <Transition name="step" mode="out-in">
      <section v-if="!finished && step" :key="index" class="step" aria-live="polite">
        <h2 class="step__title">{{ step.title }}</h2>
        <p v-if="step.subtitle" class="step__subtitle">{{ step.subtitle }}</p>

        <!-- Enlaces secundarios (promesas, nota): solo en el primer paso -->
        <div v-if="index === 0 && $slots.extras" class="step__extras"><slot name="extras" /></div>

        <PrayerBlocks :blocks="step.blocks" :drop-cap="index === 0" />

        <BeadCounter v-if="step.count" v-model="stepCount" :total="step.count" :text="step.countText ?? ''" />

        <div v-if="step.after?.length" class="step__after" :class="{ 'is-waiting': !counterDone }">
          <PrayerBlocks :blocks="step.after" />
        </div>
      </section>

      <section v-else key="end" class="end">
        <p class="end__cross" aria-hidden="true">✠</p>
        <h2>Amén</h2>
        <p class="end__text">Que el Señor te bendiga y te guarde.</p>

        <div v-if="prayer.tracking" class="end__track">
          <button class="btn" :class="doneToday(prayer.slug) ? 'btn--quiet' : 'btn--gold'" @click="toggleToday(prayer.slug)">
            <AppIcon :name="doneToday(prayer.slug) ? 'check' : 'clock'" :size="20" />
            {{ doneToday(prayer.slug) ? 'Hoy ya está anotado' : 'Anotar el día de hoy' }}
          </button>
        </div>

        <div v-if="$slots.extras" class="end__extras"><slot name="extras" /></div>

        <div class="end__actions">
          <button class="btn btn--quiet" @click="restart">Volver a empezar</button>
          <NuxtLink to="/" class="btn">Ir a Hoy</NuxtLink>
        </div>
      </section>
    </Transition>

    <nav v-if="!finished" class="pager" aria-label="Navegación entre pasos">
      <button class="pager__btn" :disabled="index === 0" @click="prev">
        <AppIcon name="chevron-left" :size="20" />
        Anterior
      </button>
      <button class="pager__btn pager__btn--next" :class="{ 'is-ready': counterDone }" @click="next">
        {{ isLast ? 'Terminar' : 'Siguiente' }}
        <AppIcon name="chevron-right" :size="20" />
      </button>
    </nav>
  </div>
</template>

<style scoped>
.guided {
  padding-bottom: 5rem;
}

.bar {
  height: 3px;
  background: var(--line);
  border-radius: 3px;
  overflow: hidden;
  margin: 0.5rem 0 1.25rem;
}

.bar span {
  display: block;
  height: 100%;
  background: var(--gold);
  transition: width 0.35s ease;
}

.step__extras,
.end__extras {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.1rem;
  margin: -0.25rem 0 1rem;
  font-size: 0.95rem;
}

.end__extras {
  justify-content: center;
  margin: 0 0 1.25rem;
}

.step__extras :deep(button),
.end__extras :deep(button) {
  color: var(--lapis);
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: var(--line);
  text-underline-offset: 0.2em;
  padding: 0.35rem 0;
}

.step__title {
  font-size: clamp(1.6rem, 6vw, 2.1rem);
  margin: 0.2rem 0 0.25rem;
}

.step__subtitle {
  font-family: var(--font-text);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--ink-soft);
  margin: 0 0 1rem;
}

.step__title + :deep(.blocks) {
  margin-top: 1rem;
}

.step__after {
  transition: opacity 0.3s ease;
}

.step__after.is-waiting {
  opacity: 0.45;
}

.pager {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(var(--nav-h) + var(--safe-b));
  z-index: 15;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  background: linear-gradient(to top, var(--vellum) 65%, transparent);
}

@media (min-width: 900px) {
  .pager {
    left: 15rem;
    bottom: 0;
    padding: 1rem 2rem 1.5rem;
  }
}

.pager__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 3rem;
  padding: 0 1.1rem;
  border-radius: 999px;
  font-weight: 700;
  border: 1px solid var(--line);
  background: var(--surface);
}

.pager__btn:disabled {
  opacity: 0.35;
}

.pager__btn--next {
  margin-left: auto;
}

.pager__btn--next.is-ready {
  background: var(--lapis);
  border-color: var(--lapis);
  color: var(--vellum);
}

.end {
  text-align: center;
  padding: 2rem 0 1rem;
}

.end__cross {
  color: var(--rubric);
  font-size: 2rem;
  margin: 0;
}

.end h2 {
  font-size: 2.6rem;
  margin: 0.25rem 0 0.5rem;
}

.end__text {
  font-family: var(--font-text);
  font-size: 1.15rem;
  color: var(--ink-soft);
  margin: 0 auto 1.75rem;
  max-width: 24rem;
}

.end__track {
  margin-bottom: 1rem;
}

.end__actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.step-enter-active,
.step-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(14px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-14px);
}
</style>
