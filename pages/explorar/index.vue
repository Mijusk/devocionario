<script setup lang="ts">
import { prayers, categories } from '~/data'
import { firstLine } from '~/utils/myPrayer'

useHead({ title: 'Oraciones · Devocionario' })

const route = useRoute()
const router = useRouter()
const query = ref(String(route.query.q ?? ''))
const { sorted: mine } = useMyPrayers()

/** Resultados: primero tus oraciones, luego las de la web. */
const results = computed(() => {
  const words = normalize(query.value).split(/\s+/).filter(Boolean)
  const own = mine.value
    .filter((m) => {
      const hay = normalize(`${m.title} ${m.author ?? ''} ${m.text}`)
      return words.length && words.every((w) => hay.includes(w))
    })
    .map((m) => ({ key: m.id, title: m.title, summary: firstLine(m.text), to: myPrayerUrl(m.id), mine: true }))
  const web = searchPrayers(prayers, query.value).map((p) => ({ key: p.slug, title: p.title, summary: p.summary, to: `/oracion/${p.slug}`, mine: false }))
  return [...own, ...web]
})
const searching = computed(() => query.value.trim().length > 0)

const countIn = (slug: string) => prayers.filter((p) => p.category === slug).length

// Mantiene la búsqueda en la URL, para que «atrás» la recupere.
watch(query, (q) => {
  router.replace({ query: q.trim() ? { q } : {} })
})
</script>

<template>
  <div class="page">
    <h1 class="title">Oraciones</h1>

    <div class="search">
      <AppIcon name="search" :size="20" class="search__icon" />
      <label for="q" class="visually-hidden">Buscar una oración</label>
      <input
        id="q"
        v-model="query"
        type="search"
        placeholder="Buscar: Salve, San José, mañana…"
        autocomplete="off"
        enterkeyhint="search"
      />
      <button v-if="searching" class="search__clear" aria-label="Borrar búsqueda" @click="query = ''">
        <AppIcon name="close" :size="18" />
      </button>
    </div>

    <section v-if="searching" aria-live="polite">
      <p class="section-title">
        {{ results.length ? `${results.length} ${results.length === 1 ? 'oración' : 'oraciones'}` : 'Ninguna oración contiene esas palabras' }}
      </p>
      <ul v-if="results.length" class="rows">
        <li v-for="p in results" :key="p.key">
          <NuxtLink :to="p.to" class="row">
            <span class="row__body">
              <span class="row__title">{{ p.title }}</span>
              <span v-if="p.summary" class="row__summary">{{ p.summary }}</span>
            </span>
            <span v-if="p.mine" class="mine-badge">Tuya</span>
          </NuxtLink>
        </li>
      </ul>
      <p v-else class="empty">Prueba con otra palabra, o busca por tema: «perdón», «noche», «familia».</p>
    </section>

    <section v-else>
      <ClientOnly>
        <h2 class="section-title mine-title">Mis oraciones</h2>
        <ul class="rows mine">
          <li v-for="m in mine" :key="m.id">
            <NuxtLink :to="myPrayerUrl(m.id)" class="row">
              <span class="row__body">
                <span class="row__title">{{ m.title }}</span>
                <span class="row__summary">{{ firstLine(m.text) }}</span>
              </span>
              <AppIcon name="chevron-right" :size="18" class="row__icon" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="myPrayerEditUrl()" class="row row--new">
              <span class="cat-icon cat-icon--new"><AppIcon name="plus" :size="22" /></span>
              <span class="row__body">
                <span class="row__title">Nueva oración</span>
                <span v-if="!mine.length" class="row__summary">Escribe tus propias oraciones y tenlas siempre a mano.</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
        <h2 class="section-title">Del devocionario</h2>
      </ClientOnly>

      <ul class="rows cats">
        <li v-for="c in categories" :key="c.slug">
          <NuxtLink :to="`/explorar/${c.slug}`" class="row">
            <span class="cat-icon"><AppIcon :name="c.icon" :size="22" /></span>
            <span class="row__body">
              <span class="row__title">{{ c.title }}</span>
              <span class="row__summary">{{ c.description }}</span>
            </span>
            <span class="count">{{ countIn(c.slug) }}</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/rosario" class="row">
            <span class="cat-icon"><AppIcon name="beads" :size="22" /></span>
            <span class="row__body">
              <span class="row__title">Santo Rosario</span>
              <span class="row__summary">Guiado, con contador de Avemarías.</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.title {
  font-size: clamp(2.2rem, 9vw, 3rem);
  margin: 0.5rem 0 1.25rem;
}

.search {
  position: sticky;
  top: calc(0.5rem + var(--safe-t));
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 3.25rem;
  padding: 0 0.6rem 0 1rem;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--line);
  margin-bottom: 1.5rem;
}

.search:focus-within {
  border-color: var(--gold);
}

.search__icon {
  color: var(--ink-faint);
  flex: none;
}

.search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 1.05rem;
  color: var(--ink);
  outline: none;
}

.search input::-webkit-search-cancel-button {
  display: none;
}

.search__clear {
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  color: var(--ink-faint);
}

.cat-icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  flex: none;
  color: var(--gold);
  border: 1px solid var(--gold-soft);
  border-radius: 50%;
}

.mine-title {
  margin-top: 0.5rem;
}

.cat-icon--new {
  border-style: dashed;
}

.row--new .row__title {
  color: var(--lapis);
}

.mine-badge {
  flex: none;
  font-size: 0.8rem;
  color: var(--gold);
  border: 1px solid var(--gold-soft);
  border-radius: 999px;
  padding: 0.1rem 0.55rem;
}

.count {
  color: var(--ink-faint);
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
}

.empty {
  color: var(--ink-soft);
}
</style>
