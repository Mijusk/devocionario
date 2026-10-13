<script setup lang="ts">
import { prayers, categories } from '~/data'

const route = useRoute()
const category = computed(() => categories.find((c) => c.slug === route.params.categoria))

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Esta sección no existe', fatal: true })
}

const list = computed(() => prayers.filter((p) => p.category === category.value?.slug))

useHead(() => ({ title: `${category.value?.title} · Devocionario` }))
</script>

<template>
  <div v-if="category" class="page">
    <TopBar back="/explorar" />

    <header class="head">
      <span class="head__icon"><AppIcon :name="category.icon" :size="28" /></span>
      <h1>{{ category.title }}</h1>
      <p>{{ category.description }}</p>
    </header>

    <ul class="rows">
      <li v-for="p in list" :key="p.slug">
        <NuxtLink :to="`/oracion/${p.slug}`" class="row">
          <span class="row__body">
            <span class="row__title">{{ p.title }}</span>
            <span v-if="p.summary" class="row__summary">{{ p.summary }}</span>
          </span>
          <span v-if="p.steps" class="badge">Paso a paso</span>
          <AppIcon name="chevron-right" :size="18" class="row__icon" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.head {
  margin: 1rem 0 1.75rem;
}

.head__icon {
  color: var(--gold);
}

.head h1 {
  font-size: clamp(2rem, 8vw, 2.6rem);
  margin-top: 0.4rem;
}

.head p {
  margin: 0.35rem 0 0;
  color: var(--ink-soft);
  font-family: var(--font-text);
  font-style: italic;
  font-size: 1.1rem;
}

.badge {
  flex: none;
  font-size: 0.8rem;
  color: var(--lapis);
  border: 1px solid currentColor;
  border-radius: 999px;
  padding: 0.1rem 0.55rem;
}
</style>
