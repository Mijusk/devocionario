<script setup lang="ts">
/**
 * Contador de cuentas: se toca en cualquier punto del área para pasar a la
 * siguiente. Cada cuenta del rosario se ilumina en oro al rezarla.
 */
const props = defineProps<{ total: number; text: string }>()
const count = defineModel<number>({ default: 0 })
const emit = defineEmits<{ done: [] }>()

const complete = computed(() => count.value >= props.total)

const tap = () => {
  if (complete.value) return
  count.value++
  if (import.meta.client && 'vibrate' in navigator) navigator.vibrate?.(count.value === props.total ? [12, 60, 12] : 10)
  if (count.value === props.total) emit('done')
}

const undo = () => {
  if (count.value > 0) count.value--
}
</script>

<template>
  <div class="counter" :class="{ 'is-complete': complete }">
    <button class="counter__tap" :disabled="complete" @click="tap">
      <span class="counter__text">{{ text }}</span>
      <span class="counter__hint">
        <template v-if="complete">Completado</template>
        <template v-else-if="count === 0">Toca para contar cada una</template>
        <template v-else>{{ count }} de {{ total }}</template>
      </span>
    </button>

    <div class="counter__beads" role="progressbar" :aria-valuemin="0" :aria-valuemax="total" :aria-valuenow="count" :aria-label="`${count} de ${total}`">
      <span v-for="n in total" :key="n" class="bead" :class="{ 'is-on': n <= count, 'is-last': n === count }" />
    </div>

    <button v-if="count > 0" class="counter__undo" @click="undo">Deshacer la última</button>
  </div>
</template>

<style scoped>
.counter {
  margin: 1.25rem 0 1.5rem;
}

.counter__tap {
  display: block;
  width: 100%;
  text-align: left;
  padding: 1.1rem 1.15rem 1rem;
  border-radius: 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  transition: transform 0.08s ease, border-color 0.2s ease;
}

.counter__tap:active:not(:disabled) {
  transform: scale(0.985);
  border-color: var(--gold);
}

.counter__tap:disabled {
  cursor: default;
}

.counter__text {
  display: block;
  font-family: var(--font-text);
  font-size: var(--text-size);
  line-height: 1.55;
  white-space: pre-line;
}

.counter__hint {
  display: block;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--rubric);
  font-weight: 500;
}

.is-complete .counter__hint {
  color: var(--gold);
}

.counter__beads {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1rem 0 0.25rem;
}

.bead {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
  border: 1.5px solid var(--gold-soft);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.bead.is-on {
  background: var(--gold);
  border-color: var(--gold);
}

.bead.is-last {
  transform: scale(1.3);
}

.counter__undo {
  display: block;
  margin: 0.5rem auto 0;
  font-size: 0.9rem;
  color: var(--ink-faint);
  padding: 0.5rem 0.75rem;
}
</style>
