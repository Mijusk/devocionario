/** Ajustes de lectura. */
export interface Settings {
  /** 0 pequeña · 1 normal · 2 grande · 3 muy grande */
  fontScale: number
  theme: 'auto' | 'light' | 'dark'
  showLatin: boolean
  /** Crucifijo flotante abajo a la derecha. */
  floatingCross: boolean
}

export const FONT_SCALES = [0.9, 1, 1.12, 1.26]

export function useSettings() {
  return useLocalState<Settings>('settings', () => ({ fontScale: 1, theme: 'auto', showLatin: false, floatingCross: true }))
}

/** Aplica tema y tamaño de letra al documento. Se llama una vez, en app.vue. */
export function useApplySettings() {
  const settings = useSettings()
  if (import.meta.client) {
    // Se engancha después de cargar los ajustes guardados, para no pisar el
    // tema que ya aplicó el script inicial del <head>.
    useNuxtApp().hook('app:mounted', () => {
      watchEffect(() => {
        const el = document.documentElement
        if (settings.value.theme === 'auto') delete el.dataset.theme
        else el.dataset.theme = settings.value.theme
        el.style.setProperty('--reading-scale', String(FONT_SCALES[settings.value.fontScale] ?? 1))
      })
    })
  }
}

/** Oraciones guardadas como favoritas. */
export function useFavorites() {
  const favorites = useLocalState<string[]>('favorites', () => [])
  const isFavorite = (slug: string) => favorites.value.includes(slug)
  const toggle = (slug: string) => {
    favorites.value = isFavorite(slug)
      ? favorites.value.filter((s) => s !== slug)
      : [slug, ...favorites.value]
  }
  return { favorites, isFavorite, toggle }
}

/** Última oración abierta, para «Seguir rezando». */
export function useRecent() {
  return useLocalState<{ slug: string; at: number } | null>('recent', () => null)
}

/** Paso en el que se quedó cada oración guiada. */
export function useStepProgress() {
  return useLocalState<Record<string, number>>('steps', () => ({}))
}

/** Fecha local en formato AAAA-MM-DD. */
export function dayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Seguimiento de devociones largas: qué días se han rezado. */
export function useTracking() {
  const log = useLocalState<Record<string, string[]>>('tracking', () => ({}))

  const daysFor = (slug: string) => log.value[slug] ?? []
  const doneToday = (slug: string) => daysFor(slug).includes(dayKey())

  const toggleToday = (slug: string) => {
    const today = dayKey()
    const days = daysFor(slug)
    log.value = {
      ...log.value,
      [slug]: days.includes(today) ? days.filter((d) => d !== today) : [...days, today].sort(),
    }
  }

  /** Días seguidos hasta hoy (o hasta ayer, si hoy aún no se ha rezado). */
  const streak = (slug: string) => {
    const set = new Set(daysFor(slug))
    const cursor = new Date()
    if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
    let n = 0
    while (set.has(dayKey(cursor))) {
      n++
      cursor.setDate(cursor.getDate() - 1)
    }
    return n
  }

  const active = computed(() => Object.keys(log.value).filter((slug) => (log.value[slug]?.length ?? 0) > 0))

  return { log, daysFor, doneToday, toggleToday, streak, active }
}
