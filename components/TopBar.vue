<script setup lang="ts">
/** Barra superior de las pantallas de lectura: volver, título y acciones. */
/** `strong`: el título es el de la oración (más destacado, hasta dos líneas). */
defineProps<{ title?: string; back?: string; strong?: boolean }>()

const router = useRouter()
const goBack = (fallback?: string) => {
  if (import.meta.client && window.history.state?.back) router.back()
  else router.push(fallback ?? '/')
}
</script>

<template>
  <header class="topbar">
    <button v-if="back" class="topbar__btn" aria-label="Volver" @click="goBack(back)">
      <AppIcon name="chevron-left" />
    </button>
    <component :is="strong ? 'h1' : 'span'" class="topbar__title" :class="{ 'is-strong': strong }">{{ title }}</component>
    <div class="topbar__actions">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: calc(-1rem - var(--safe-t)) -1rem 0;
  padding: calc(0.4rem + var(--safe-t)) 0.5rem 0.4rem;
  background: color-mix(in srgb, var(--vellum) 90%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@media (min-width: 900px) {
  .topbar {
    margin: -2.5rem -2rem 0;
    padding: 1rem 1.5rem 0.5rem;
  }
}

.topbar__title {
  flex: 1;
  min-width: 0;
  font-weight: 500;
  color: var(--ink-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.25rem;
}

.topbar__title.is-strong {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.2;
  color: var(--ink);
  margin: 0;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.topbar__actions {
  display: flex;
  gap: 0.1rem;
}

.topbar__btn,
.topbar__actions :deep(button) {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  color: var(--ink);
}

.topbar__actions :deep(button[aria-pressed='true']) {
  color: var(--gold);
}
</style>
