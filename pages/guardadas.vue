<script setup lang="ts">
import { prayersBySlug } from '~/data'

useHead({ title: 'Guardadas · Devocionario' })

const { favorites, toggle } = useFavorites()
const list = computed(() => favorites.value.map((s) => prayersBySlug[s]).filter((p) => !!p))
const { active, daysFor, doneToday, toggleToday, streak } = useTracking()
const tracked = computed(() => active.value.map((s) => prayersBySlug[s]).filter((p) => !!p))
const showSettings = ref(false)
</script>

<template>
  <div class="page">
    <header class="head">
      <h1>Guardadas</h1>
      <button class="btn btn--quiet" @click="showSettings = true">
        <AppIcon name="type" :size="20" />
        Lectura
      </button>
    </header>

    <ClientOnly>
      <ul v-if="list.length" class="rows">
        <li v-for="p in list" :key="p.slug" class="fav">
          <NuxtLink :to="`/oracion/${p.slug}`" class="row">
            <span class="row__body">
              <span class="row__title">{{ p.title }}</span>
              <span v-if="p.summary" class="row__summary">{{ p.summary }}</span>
            </span>
          </NuxtLink>
          <button class="fav__remove" :aria-label="`Quitar ${p.title} de guardadas`" @click="toggle(p.slug)">
            <AppIcon name="bookmark" filled :size="22" />
          </button>
        </li>
      </ul>
      <div v-else class="empty">
        <p>Aún no has guardado ninguna oración.</p>
        <p>Ábrela y toca el marcador <AppIcon name="bookmark" :size="16" class="inline-icon" /> de arriba para tenerla siempre a mano aquí.</p>
        <NuxtLink to="/explorar" class="btn">Ver oraciones</NuxtLink>
      </div>

      <section v-if="tracked.length">
        <h2 class="section-title">Devociones en curso</h2>
        <ul class="rows">
          <li v-for="p in tracked" :key="p.slug" class="fav">
            <NuxtLink :to="`/oracion/${p.slug}`" class="row">
              <span class="row__body">
                <span class="row__title">{{ p.title }}</span>
                <span class="row__summary">
                  {{ daysFor(p.slug).length }} {{ daysFor(p.slug).length === 1 ? 'día' : 'días' }}<template v-if="streak(p.slug) > 1">, {{ streak(p.slug) }} seguidos</template>
                </span>
              </span>
            </NuxtLink>
            <button
              class="fav__remove"
              :class="{ 'is-done': doneToday(p.slug) }"
              :aria-pressed="doneToday(p.slug)"
              :aria-label="doneToday(p.slug) ? 'Desmarcar hoy' : 'Marcar hoy como rezado'"
              @click="toggleToday(p.slug)"
            >
              <AppIcon :name="doneToday(p.slug) ? 'check' : 'clock'" :size="22" />
            </button>
          </li>
        </ul>
      </section>
    </ClientOnly>

    <ReadingSettings v-model="showSettings" />
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0 1.5rem;
}

.head h1 {
  font-size: clamp(2.2rem, 9vw, 3rem);
}

.fav {
  display: flex;
  align-items: center;
}

.fav .row {
  flex: 1;
  min-width: 0;
}

.fav__remove {
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  color: var(--gold);
  flex: none;
}

.empty {
  color: var(--ink-soft);
  padding: 1rem 0;
}

.empty p {
  margin: 0 0 0.75rem;
  max-width: 28rem;
}

.empty .btn {
  margin-top: 0.5rem;
}

.inline-icon {
  vertical-align: -0.2em;
  color: var(--gold);
}
</style>
