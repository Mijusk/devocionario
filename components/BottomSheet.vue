<script setup lang="ts">
/**
 * Panel que sube desde abajo (en escritorio, centrado).
 * Se cierra tocando fuera, con la X o con Escape.
 */
const open = defineModel<boolean>({ default: false })
defineProps<{ title: string; subtitle?: string }>()
const titleId = useId()

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}
watch(open, (v) => {
  if (!import.meta.client) return
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="open" class="scrim" @click.self="open = false">
        <section class="sheet" role="dialog" aria-modal="true" :aria-labelledby="titleId">
          <header class="sheet__head">
            <div>
              <h2 :id="titleId">{{ title }}</h2>
              <p v-if="subtitle" class="sheet__subtitle">{{ subtitle }}</p>
            </div>
            <button class="sheet__close" aria-label="Cerrar" @click="open = false">
              <AppIcon name="close" />
            </button>
          </header>
          <div class="sheet__body">
            <slot />
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.scrim {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgb(10 14 26 / 0.45);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.sheet {
  width: 100%;
  max-width: 34rem;
  max-height: 82vh;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  color: var(--ink);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -10px 40px rgb(0 0 0 / 0.18);
}

@media (min-width: 900px) {
  .scrim {
    align-items: center;
  }
  .sheet {
    border-radius: 20px;
  }
}

.sheet__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0.75rem 0.5rem 1.25rem;
}

.sheet__head h2 {
  font-size: 1.45rem;
  padding-top: 0.4rem;
}

.sheet__subtitle {
  margin: 0.2rem 0 0;
  color: var(--ink-soft);
  font-size: 0.95rem;
}

.sheet__close {
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  place-items: center;
  flex: none;
}

.sheet__body {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.5rem 1.25rem calc(1.5rem + var(--safe-b));
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.2s ease;
}
.sheet-enter-active .sheet,
.sheet-leave-active .sheet {
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from .sheet,
.sheet-leave-to .sheet {
  transform: translateY(30%);
}
</style>
