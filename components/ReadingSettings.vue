<script setup lang="ts">
/** Panel inferior con tamaño de letra, tema y latín. */
const open = defineModel<boolean>({ default: false })
defineProps<{ hasLatin?: boolean }>()

const settings = useSettings()
const sizes = ['Pequeña', 'Normal', 'Grande', 'Muy grande']
const themes: { value: 'auto' | 'light' | 'dark'; label: string }[] = [
  { value: 'auto', label: 'Automático' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Noche' },
]

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}
watch(open, (v) => {
  if (!import.meta.client) return
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => import.meta.client && window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="open" class="scrim" @click.self="open = false">
        <section class="sheet" role="dialog" aria-modal="true" aria-labelledby="rs-title">
          <div class="sheet__head">
            <h2 id="rs-title">Lectura</h2>
            <button class="sheet__close" aria-label="Cerrar" @click="open = false">
              <AppIcon name="close" />
            </button>
          </div>

          <fieldset class="field">
            <legend>Tamaño de letra</legend>
            <div class="sizes">
              <button
                v-for="(label, i) in sizes"
                :key="label"
                class="size"
                :class="{ 'is-on': settings.fontScale === i }"
                :aria-pressed="settings.fontScale === i"
                :aria-label="label"
                @click="settings.fontScale = i"
              >
                <span :style="{ fontSize: `${0.95 + i * 0.22}rem` }">A</span>
              </button>
            </div>
          </fieldset>

          <fieldset class="field">
            <legend>Tema</legend>
            <div class="seg">
              <button
                v-for="t in themes"
                :key="t.value"
                :class="{ 'is-on': settings.theme === t.value }"
                :aria-pressed="settings.theme === t.value"
                @click="settings.theme = t.value"
              >
                {{ t.label }}
              </button>
            </div>
          </fieldset>

          <label v-if="hasLatin" class="switch">
            <span>Mostrar también en latín</span>
            <input v-model="settings.showLatin" type="checkbox" />
          </label>

          <p class="sample">Dios te salve, María, llena eres de gracia…</p>
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
  max-width: 30rem;
  background: var(--surface);
  color: var(--ink);
  border-radius: 20px 20px 0 0;
  padding: 1rem 1.25rem calc(1.5rem + var(--safe-b));
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.sheet__head h2 {
  font-size: 1.4rem;
}

.sheet__close {
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  place-items: center;
}

.field {
  border: 0;
  margin: 0 0 1.1rem;
  padding: 0;
}

.field legend {
  font-size: 0.95rem;
  color: var(--ink-soft);
  margin-bottom: 0.45rem;
}

.sizes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.size {
  height: 3.25rem;
  border-radius: 12px;
  border: 1px solid var(--line);
  font-family: var(--font-text);
  font-weight: 700;
}

.seg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--vellum-deep);
  border-radius: 12px;
  padding: 3px;
}

.seg button {
  height: 2.6rem;
  border-radius: 9px;
  font-weight: 500;
}

.is-on {
  background: var(--lapis);
  color: var(--vellum);
  border-color: var(--lapis);
}

.switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3rem;
  font-weight: 500;
}

.switch input {
  width: 1.4rem;
  height: 1.4rem;
  accent-color: var(--lapis);
}

.sample {
  font-family: var(--font-text);
  font-size: var(--text-size);
  margin: 0.75rem 0 0;
  padding-top: 0.9rem;
  border-top: 1px solid var(--line);
  color: var(--ink-soft);
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
