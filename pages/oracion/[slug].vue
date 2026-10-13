<script setup lang="ts">
import { prayersBySlug, categories } from '~/data'

const route = useRoute()
const prayer = computed(() => prayersBySlug[String(route.params.slug)])

if (!prayer.value) {
  throw createError({ statusCode: 404, statusMessage: 'Esta oración no existe', fatal: true })
}

const category = computed(() => categories.find((c) => c.slug === prayer.value?.category))
const settings = useSettings()
const { isFavorite, toggle } = useFavorites()
const recent = useRecent()
const { daysFor, streak } = useTracking()
const showSettings = ref(false)
const shareNote = ref('')

useHead(() => ({ title: `${prayer.value?.title} · Devocionario` }))
useSeoMeta({
  description: () => prayer.value?.summary ?? 'Oración del Devocionario.',
  ogTitle: () => prayer.value?.title,
})

useWakeLock()
onMounted(() => {
  if (prayer.value) recent.value = { slug: prayer.value.slug, at: Date.now() }
})

const share = async () => {
  const url = window.location.href
  try {
    if (navigator.share) {
      await navigator.share({ title: prayer.value?.title, url })
    } else {
      await navigator.clipboard.writeText(url)
      shareNote.value = 'Enlace copiado'
      setTimeout(() => (shareNote.value = ''), 2000)
    }
  } catch {
    /* compartir cancelado */
  }
}
</script>

<template>
  <div v-if="prayer" class="page">
    <TopBar :title="category?.title" :back="category ? `/explorar/${category.slug}` : '/explorar'">
      <button :aria-pressed="isFavorite(prayer.slug)" :aria-label="isFavorite(prayer.slug) ? 'Quitar de guardadas' : 'Guardar'" @click="toggle(prayer.slug)">
        <AppIcon name="bookmark" :filled="isFavorite(prayer.slug)" />
      </button>
      <button aria-label="Compartir" @click="share">
        <AppIcon name="share" />
      </button>
      <button aria-label="Ajustes de lectura" @click="showSettings = true">
        <AppIcon name="type" />
      </button>
    </TopBar>

    <article class="prayer">
      <header class="prayer__head">
        <h1>{{ prayer.title }}</h1>
        <p v-if="prayer.author" class="prayer__author">{{ prayer.author }}</p>
        <p v-if="prayer.note" class="prayer__note">{{ prayer.note }}</p>
        <ClientOnly>
          <p v-if="prayer.tracking && daysFor(prayer.slug).length" class="prayer__track">
            <AppIcon name="check" :size="18" />
            {{ daysFor(prayer.slug).length }} {{ daysFor(prayer.slug).length === 1 ? 'día rezado' : 'días rezados' }}<template v-if="streak(prayer.slug) > 1">, {{ streak(prayer.slug) }} seguidos</template>
          </p>
        </ClientOnly>
      </header>

      <GuidedPrayer v-if="prayer.steps" :prayer="prayer" />

      <div v-else class="prayer__body" :class="{ 'has-latin': settings.showLatin && prayer.latin }">
        <PrayerBlocks :blocks="prayer.blocks ?? []" drop-cap />
        <section v-if="settings.showLatin && prayer.latin" class="latin" lang="la">
          <h2 class="latin__title">En latín</h2>
          <PrayerBlocks :blocks="prayer.latin" />
        </section>
      </div>

      <button v-if="prayer.latin && !prayer.steps && !settings.showLatin" class="latin-toggle" @click="settings.showLatin = true">
        Ver también en latín
      </button>
    </article>

    <p v-if="shareNote" class="toast" role="status">{{ shareNote }}</p>
    <ReadingSettings v-model="showSettings" :has-latin="!!prayer.latin" />
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
}

.prayer__track {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.9rem 0 0;
  color: var(--gold);
  font-weight: 500;
}

@media (min-width: 1100px) {
  .prayer__body.has-latin {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  .prayer__body.has-latin .latin {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
  }
}

.latin {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  color: var(--ink-soft);
}

.latin :deep(.pr-p),
.latin :deep(.pr-vr) {
  font-style: italic;
}

.latin__title {
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  color: var(--rubric);
  margin-bottom: 1rem;
}

.latin-toggle {
  margin-top: 1rem;
  color: var(--lapis);
  font-weight: 500;
  padding: 0.5rem 0;
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
