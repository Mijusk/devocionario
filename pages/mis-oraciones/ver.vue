<script setup lang="ts">
import { textToBlocks } from '~/utils/myPrayer'

/** Lectura de una oración propia. Se ve igual que las demás, con «Editar». */
const route = useRoute()
const { get } = useMyPrayers()
const { isFavorite, toggle } = useFavorites()
const recent = useRecent()

const id = computed(() => (typeof route.query.id === 'string' ? route.query.id : ''))
const prayer = computed(() => (id.value ? get(id.value) : undefined))
const blocks = computed(() => (prayer.value ? textToBlocks(prayer.value.text) : []))

const mounted = ref(false)
const notFound = ref(false)
const showSettings = ref(false)
const shareNote = ref('')

useHead(() => ({ title: `${prayer.value?.title ?? 'Mi oración'} · Devocionario` }))
useWakeLock()

onMounted(() => {
  mounted.value = true
  setTimeout(() => {
    if (!prayer.value) notFound.value = true
  }, 400)
})

watch(
  prayer,
  (p) => {
    if (p && import.meta.client) recent.value = { slug: p.id, at: Date.now() }
  },
  { immediate: true },
)

const share = async () => {
  if (!prayer.value) return
  const text = myPrayerParaCompartir(prayer.value)
  try {
    if (navigator.share) await navigator.share({ title: prayer.value.title, text })
    else {
      await navigator.clipboard.writeText(text)
      shareNote.value = 'Texto copiado'
      setTimeout(() => (shareNote.value = ''), 2000)
    }
  } catch {
    /* compartir cancelado */
  }
}
</script>

<template>
  <div class="page">
    <TopBar title="Mis oraciones" back="/explorar">
      <template v-if="prayer">
        <button :aria-pressed="isFavorite(prayer.id)" :aria-label="isFavorite(prayer.id) ? 'Quitar de guardadas' : 'Guardar'" @click="toggle(prayer.id)">
          <AppIcon name="bookmark" :filled="isFavorite(prayer.id)" />
        </button>
        <button aria-label="Compartir el texto" @click="share">
          <AppIcon name="share" />
        </button>
        <button aria-label="Ajustes de lectura" @click="showSettings = true">
          <AppIcon name="type" />
        </button>
      </template>
    </TopBar>

    <article v-if="prayer" class="prayer">
      <header class="prayer__head">
        <h1>{{ prayer.title }}</h1>
        <p v-if="prayer.author" class="prayer__author">{{ prayer.author }}</p>
        <p v-if="prayer.note" class="prayer__note">{{ prayer.note }}</p>
      </header>

      <PrayerBlocks :blocks="blocks" drop-cap />

      <NuxtLink :to="myPrayerEditUrl(prayer.id)" class="edit">
        <AppIcon name="edit" :size="18" />
        Editar
      </NuxtLink>
    </article>

    <div v-else-if="mounted && notFound" class="missing">
      <p>Esta oración no está en este móvil. Las oraciones que escribes se guardan solo en el dispositivo donde las creas; para pasarlas a otro, usa la copia de seguridad de Guardadas.</p>
      <NuxtLink to="/explorar" class="btn">Ver mis oraciones</NuxtLink>
    </div>

    <p v-if="shareNote" class="toast" role="status">{{ shareNote }}</p>
    <ReadingSettings v-model="showSettings" />
  </div>
</template>

<style scoped>
.prayer__head {
  margin: 1.25rem 0 2rem;
  max-width: var(--measure);
}

.prayer__head h1 {
  font-size: clamp(2rem, 8vw, 2.75rem);
  letter-spacing: -0.01em;
}

.prayer__author {
  font-family: var(--font-text);
  font-style: italic;
  color: var(--ink-soft);
  margin: 0.4rem 0 0;
  font-size: 1.1rem;
}

.prayer__note {
  margin: 1rem 0 0;
  padding: 0.75rem 0.9rem;
  border-left: 2px solid var(--gold);
  background: var(--vellum-deep);
  border-radius: 0 10px 10px 0;
  color: var(--ink-soft);
  font-size: 0.98rem;
  white-space: pre-line;
}

.edit {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  padding: 0.55rem 1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-weight: 500;
  color: var(--lapis);
}

.missing {
  padding-top: 2rem;
  color: var(--ink-soft);
}

.missing p {
  max-width: 30rem;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: calc(var(--nav-h) + var(--safe-b) + 1rem);
  transform: translateX(-50%);
  background: var(--ink);
  color: var(--vellum);
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  margin: 0;
  z-index: 30;
}
</style>
