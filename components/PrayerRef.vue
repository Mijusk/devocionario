<script setup lang="ts">
import { prayersBySlug } from '~/data'

/**
 * Oración básica dentro de otra (Padre Nuestro, Credo…).
 * Plegada muestra solo el título, que es lo que basta a quien ya se la sabe;
 * al tocarla se despliega el texto completo.
 */
const props = defineProps<{ slug: string; times?: number }>()
const prayer = computed(() => prayersBySlug[props.slug])
const open = ref(false)
const id = useId()
</script>

<template>
  <div v-if="prayer" class="ref" :class="{ 'is-open': open }">
    <button class="ref__head" :aria-expanded="open" :aria-controls="id" @click="open = !open">
      <span class="ref__title">{{ prayer.title }}</span>
      <span v-if="times && times > 1" class="ref__times">{{ times }} veces</span>
      <AppIcon name="chevron-right" :size="18" class="ref__chev" />
    </button>
    <div v-show="open" :id="id" class="ref__body">
      <PrayerBlocks :blocks="prayer.blocks ?? []" />
    </div>
  </div>
</template>

<style scoped>
.ref {
  margin: 0.4em 0 1em;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  font-size: 1rem;
}

.ref__head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.6rem 0.9rem;
  text-align: left;
}

.ref__title {
  flex: 1;
  font-family: var(--font-text);
  font-weight: 700;
  font-size: calc(1.05rem * var(--reading-scale));
}

.ref__times {
  font-family: var(--font-ui);
  font-size: 0.85rem;
  color: var(--rubric);
}

.ref__chev {
  color: var(--ink-faint);
  transition: transform 0.2s ease;
}

.is-open .ref__chev {
  transform: rotate(90deg);
}

.ref__body {
  padding: 0 0.9rem 0.1rem;
  border-top: 1px dotted var(--line);
  padding-top: 0.8rem;
}
</style>
