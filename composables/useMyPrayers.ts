import { prayersBySlug } from '~/data'
import { cleanFolder, firstLine, isMine, newMyPrayerId, sameFolder, type MyPrayer } from '~/utils/myPrayer'
import { SITE_URL } from './usePalabra'

/** Oraciones escritas por el usuario. */
export function useMyPrayers() {
  const list = useLocalState<MyPrayer[]>('mis-oraciones', () => [])

  /** Ordenadas por la última modificación. */
  const sorted = computed(() => [...list.value].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)))
  const get = (id: string) => list.value.find((p) => p.id === id)

  /** Carpetas existentes, en orden alfabético. */
  const folders = computed(() => {
    const names: string[] = []
    for (const p of list.value) {
      if (p.folder && !names.some((n) => sameFolder(n, p.folder))) names.push(p.folder)
    }
    return names.sort((a, b) => a.localeCompare(b, 'es'))
  })

  /** Si ya existe una carpeta con ese nombre (sin contar mayúsculas ni tildes), usa su grafía. */
  const canonicalFolder = (name?: string) => {
    const clean = cleanFolder(name)
    return clean ? folders.value.find((f) => sameFolder(f, clean)) ?? clean : undefined
  }

  /** Oraciones agrupadas: primero las carpetas (A-Z), después las que no tienen. */
  const grouped = computed(() => ({
    folders: folders.value.map((name) => ({ name, prayers: sorted.value.filter((p) => sameFolder(p.folder, name)) })),
    loose: sorted.value.filter((p) => !p.folder),
  }))

  /** Cambia el nombre de una carpeta en todas sus oraciones (o las une a otra existente). */
  const renameFolder = (from: string, to: string) => {
    const target = canonicalFolder(to)
    list.value = list.value.map((p) => (sameFolder(p.folder, from) ? { ...p, folder: target } : p))
    return target
  }

  /** Crea o actualiza. Devuelve el id. */
  const save = (data: Pick<MyPrayer, 'title' | 'text' | 'author' | 'note' | 'folder'>, id?: string) => {
    const now = new Date().toISOString()
    const clean = {
      title: data.title.trim(),
      text: data.text.replace(/\s+$/, ''),
      author: data.author?.trim() || undefined,
      note: data.note?.trim() || undefined,
      folder: canonicalFolder(data.folder),
    }
    const existing = id ? get(id) : undefined
    if (existing) {
      list.value = list.value.map((p) => (p.id === id ? { ...p, ...clean, updatedAt: now } : p))
      return existing.id
    }
    const created: MyPrayer = { id: newMyPrayerId(), ...clean, createdAt: now, updatedAt: now }
    list.value = [created, ...list.value]
    return created.id
  }

  /** Borra la oración y la quita también de guardadas y de «Seguir rezando». */
  const remove = (id: string) => {
    list.value = list.value.filter((p) => p.id !== id)
    const { favorites } = useFavorites()
    favorites.value = favorites.value.filter((s) => s !== id)
    const recent = useRecent()
    if (recent.value?.slug === id) recent.value = null
  }

  return { list, sorted, folders, grouped, get, save, remove, renameFolder }
}

export interface PrayerLink {
  slug: string
  title: string
  summary?: string
  to: string
  mine: boolean
}

/** Busca una oración, sea de la web o propia, y da lo necesario para enlazarla. */
export function usePrayerLinks() {
  const { get } = useMyPrayers()
  const resolve = (slug: string): PrayerLink | undefined => {
    const p = prayersBySlug[slug]
    if (p) return { slug, title: p.title, summary: p.summary, to: `/oracion/${slug}`, mine: false }
    if (!isMine(slug)) return undefined
    const m = get(slug)
    return m ? { slug, title: m.title, summary: firstLine(m.text), to: myPrayerUrl(slug), mine: true } : undefined
  }
  return { resolve }
}

export const myPrayerUrl = (id: string) => `/mis-oraciones/ver?id=${encodeURIComponent(id)}`
/** Editar una oración, o crear una nueva (opcionalmente ya dentro de una carpeta). */
export const myPrayerEditUrl = (id?: string, folder?: string) =>
  id
    ? `/mis-oraciones/editar?id=${encodeURIComponent(id)}`
    : folder
      ? `/mis-oraciones/editar?carpeta=${encodeURIComponent(folder)}`
      : '/mis-oraciones/editar'

/** Texto completo para compartir: la oración solo existe en este móvil. */
export const myPrayerParaCompartir = (p: MyPrayer) =>
  [p.title, p.author, '', p.text.trim(), '', 'Reza en el Devocionario:', SITE_URL]
    .filter((x) => x !== undefined)
    .join('\n')
