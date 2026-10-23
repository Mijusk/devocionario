<script setup lang="ts">
import type { IconName } from '~/types/prayer'

const route = useRoute()

const items: { to: string; label: string; icon: IconName; match: (p: string) => boolean }[] = [
  { to: '/', label: 'Hoy', icon: 'home', match: (p) => p === '/' },
  { to: '/explorar', label: 'Oraciones', icon: 'compass', match: (p) => p.startsWith('/explorar') || p.startsWith('/oracion') || p.startsWith('/mis-oraciones') },
  { to: '/rosario', label: 'Rosario', icon: 'beads', match: (p) => p.startsWith('/rosario') },
  { to: '/guardadas', label: 'Guardadas', icon: 'bookmark', match: (p) => p.startsWith('/guardadas') },
]
</script>

<template>
  <div class="shell">
    <nav class="nav" aria-label="Secciones">
      <NuxtLink to="/" class="nav__brand" aria-label="Devocionario, inicio">
        <span class="nav__mark" aria-hidden="true">✠</span>
        <span>Devocionario</span>
      </NuxtLink>
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="nav__item"
        :class="{ 'is-active': item.match(route.path) }"
        :aria-current="item.match(route.path) ? 'page' : undefined"
      >
        <AppIcon :name="item.icon" :size="23" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
    <main class="shell__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 20;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: calc(var(--nav-h) + var(--safe-b));
  padding-bottom: var(--safe-b);
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  border-top: 1px solid var(--line-soft);
}

.nav__brand {
  display: none;
}

.nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--ink-faint);
  position: relative;
  transition: color 0.15s ease;
}

.nav__item.is-active {
  color: var(--lapis);
}

/* Pequeño rombo dorado sobre la sección activa */
.nav__item.is-active::before {
  content: '';
  position: absolute;
  top: 0.35rem;
  width: 5px;
  height: 5px;
  background: var(--gold);
  transform: rotate(45deg);
}

.nav__item.is-active :deep(svg) {
  margin-top: 0.35rem;
}

@media (min-width: 900px) {
  .shell {
    display: grid;
    grid-template-columns: 15rem 1fr;
    min-height: 100vh;
  }

  .nav {
    position: sticky;
    top: 0;
    inset: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 2rem 1.25rem;
    border-top: 0;
    border-right: 1px solid var(--line);
    background: var(--vellum);
    backdrop-filter: none;
  }

  .nav__brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-text);
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 1.75rem;
    padding: 0 0.75rem;
  }

  .nav__mark {
    color: var(--rubric);
  }

  .nav__item {
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.85rem;
    font-size: 1.05rem;
    padding: 0.65rem 0.75rem;
    border-radius: 10px;
  }

  .nav__item.is-active {
    background: var(--vellum-deep);
  }

  .nav__item.is-active::before {
    top: 50%;
    left: -0.6rem;
    margin-top: -2.5px;
  }

  .nav__item.is-active :deep(svg) {
    margin-top: 0;
  }
}
</style>
