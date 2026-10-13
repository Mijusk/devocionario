<script setup lang="ts">
import { mysterySets, mysterySetForDay, type MysterySetSlug } from '~/data/rosary'
import { buildRosary } from '~/data/rosary-prayer'

useHead({ title: 'Santo Rosario · Devocionario' })
useWakeLock()

const route = useRoute()
const router = useRouter()
const mounted = ref(false)
const todaySlug = ref<MysterySetSlug>('gozosos')

onMounted(() => {
  todaySlug.value = mysterySetForDay(new Date().getDay()).slug
  mounted.value = true
})

const selected = computed<MysterySetSlug>(() => {
  const q = String(route.query.m ?? '')
  return (mysterySets.some((s) => s.slug === q) ? q : todaySlug.value) as MysterySetSlug
})

const set = computed(() => mysterySets.find((s) => s.slug === selected.value)!)
const prayer = computed(() => buildRosary(set.value))

const choose = (slug: MysterySetSlug) => router.replace({ query: { m: slug } })
</script>

<template>
  <div class="page">
    <header class="head">
      <h1>Santo Rosario</h1>
      <p>Elige los misterios y reza paso a paso. Toca la tarjeta del Avemaría para contar cada cuenta.</p>
    </header>

    <div class="sets" role="radiogroup" aria-label="Misterios">
      <button
        v-for="s in mysterySets"
        :key="s.slug"
        role="radio"
        class="set"
        :class="{ 'is-on': mounted && selected === s.slug }"
        :aria-checked="mounted && selected === s.slug"
        @click="choose(s.slug)"
      >
        <span class="set__title">{{ s.title.replace('Misterios ', '') }}</span>
        <span class="set__days">{{ mounted && s.slug === todaySlug ? 'Hoy' : s.daysLabel }}</span>
      </button>
    </div>

    <details class="mysteries">
      <summary>Ver los cinco misterios</summary>
      <ol>
        <li v-for="m in set.mysteries" :key="m.title">
          {{ m.title }} <span class="cite">{{ m.cite }}</span>
        </li>
      </ol>
    </details>

    <ClientOnly>
      <GuidedPrayer :key="prayer.slug" :prayer="prayer" />
      <template #fallback>
        <p class="loading">Preparando el Rosario…</p>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.head {
  margin: 0.5rem 0 1.25rem;
}

.head h1 {
  font-size: clamp(2.2rem, 9vw, 3rem);
}

.head p {
  color: var(--ink-soft);
  margin: 0.5rem 0 0;
  max-width: 32rem;
}

.sets {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .sets {
    grid-template-columns: repeat(4, 1fr);
  }
}

.set {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.7rem 0.9rem;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface);
  text-align: left;
}

.set__title {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.15rem;
  text-transform: capitalize;
}

.set__days {
  font-size: 0.85rem;
  color: var(--ink-faint);
}

.set.is-on {
  background: var(--lapis);
  border-color: var(--lapis);
  color: var(--vellum);
}

.set.is-on .set__days {
  color: var(--gold-soft);
}

.mysteries {
  margin-bottom: 1.5rem;
  color: var(--ink-soft);
}

.mysteries summary {
  cursor: pointer;
  padding: 0.5rem 0;
  color: var(--lapis);
  font-weight: 500;
}

.mysteries ol {
  margin: 0.25rem 0 0;
  padding-left: 1.25rem;
  font-family: var(--font-text);
  font-size: 1.05rem;
}

.mysteries li {
  margin-bottom: 0.3rem;
}

.cite {
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--ink-faint);
  white-space: nowrap;
}

.loading {
  color: var(--ink-faint);
}
</style>
