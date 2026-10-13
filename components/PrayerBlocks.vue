<script setup lang="ts">
import type { Block } from '~/types/prayer'

const props = withDefaults(defineProps<{ blocks: Block[]; dropCap?: boolean }>(), { dropCap: false })

/** Índice del primer párrafo, que lleva la inicial grande en rojo. */
const firstP = computed(() => (props.dropCap ? props.blocks.findIndex((b) => b.type === 'p') : -1))
</script>

<template>
  <div class="blocks">
    <template v-for="(b, i) in blocks" :key="i">
      <p v-if="b.type === 'p'" class="pr-p" :class="{ 'has-drop': i === firstP }">{{ b.text }}</p>

      <h3 v-else-if="b.type === 'h'" class="pr-h">{{ b.text }}</h3>

      <p v-else-if="b.type === 'rubric'" class="pr-rubric">{{ b.text }}</p>

      <PrayerRef v-else-if="b.type === 'ref'" :slug="b.slug" :times="b.times" />

      <div v-else-if="b.type === 'vr'" class="pr-vr">
        <p><span class="mark" aria-label="Versículo">℣.</span>{{ b.v }}</p>
        <p class="pr-vr__r"><span class="mark" aria-label="Respuesta">℟.</span>{{ b.r }}</p>
      </div>

      <figure v-else-if="b.type === 'quote'" class="pr-quote">
        <blockquote>{{ b.text }}</blockquote>
        <figcaption v-if="b.cite">{{ b.cite }}</figcaption>
      </figure>

      <div v-else-if="b.type === 'litany'" class="pr-litany">
        <p class="pr-litany__resp">
          <span class="mark">℟.</span><em>{{ b.response.charAt(0).toUpperCase() + b.response.slice(1) }}</em>
        </p>
        <ul>
          <li v-for="item in b.items" :key="item">
            {{ item }}<span class="pr-litany__r">, {{ b.response }}</span>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style scoped>
.blocks {
  font-family: var(--font-text);
  font-size: var(--text-size);
  line-height: 1.62;
  max-width: var(--measure);
}

.pr-p {
  white-space: pre-line;
  margin: 0 0 1.1em;
  hanging-punctuation: first;
}

/* Inicial roja, como en los libros litúrgicos */
.pr-p.has-drop::first-letter {
  float: left;
  font-weight: 700;
  font-size: 3.35em;
  line-height: 0.82;
  padding: 0.08em 0.1em 0 0;
  color: var(--rubric);
}

.pr-h {
  font-size: 1.05em;
  font-style: italic;
  font-weight: 700;
  margin: 1.6em 0 0.5em;
  color: var(--ink-soft);
}

.pr-rubric {
  font-style: italic;
  color: var(--rubric);
  font-size: 0.88em;
  margin: 1.2em 0 0.6em;
}

.mark {
  color: var(--rubric);
  font-weight: 700;
  margin-right: 0.35em;
}

.pr-vr {
  margin: 0 0 1em;
}

.pr-vr p {
  margin: 0;
  padding-left: 1.5em;
  text-indent: -1.5em;
}

.pr-vr__r {
  font-weight: 700;
}

.pr-quote {
  margin: 0 0 1.4em;
  padding-left: 1rem;
  border-left: 2px solid var(--gold);
}

.pr-quote blockquote {
  margin: 0;
  font-style: italic;
}

.pr-quote figcaption {
  font-family: var(--font-ui);
  font-size: 0.8em;
  color: var(--ink-faint);
  margin-top: 0.25rem;
}

.pr-litany {
  margin: 0.5em 0 1.4em;
}

.pr-litany__resp {
  font-size: 0.92em;
  margin: 0 0 0.5em;
  color: var(--ink-soft);
}

.pr-litany ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.pr-litany li {
  padding: 0.28em 0;
  border-bottom: 1px dotted var(--line);
}

.pr-litany__r {
  color: var(--ink-faint);
  font-style: italic;
  font-size: 0.85em;
}
</style>
