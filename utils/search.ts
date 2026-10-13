import type { Block, Prayer } from '~/types/prayer'

/** Minúsculas y sin tildes, para que «angel» encuentre «Ángelus». */
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

const blockText = (b: Block): string => {
  switch (b.type) {
    case 'p':
    case 'h':
    case 'rubric':
    case 'quote':
      return b.text
    case 'vr':
      return `${b.v} ${b.r}`
    case 'litany':
      return b.items.join(' ')
    default:
      return ''
  }
}

interface Indexed {
  prayer: Prayer
  title: string
  meta: string
  body: string
}

let index: Indexed[] | null = null

function buildIndex(prayers: Prayer[]) {
  return prayers.map((prayer) => {
    const blocks = [...(prayer.blocks ?? []), ...(prayer.steps ?? []).flatMap((s) => [...s.blocks, { type: 'p', text: `${s.title} ${s.subtitle ?? ''} ${s.countText ?? ''}` } as Block])]
    return {
      prayer,
      title: normalize(prayer.title),
      meta: normalize([prayer.summary, prayer.author, ...(prayer.tags ?? [])].filter(Boolean).join(' ')),
      body: normalize(blocks.map(blockText).join(' ')),
    }
  })
}

/**
 * Búsqueda sencilla y rápida: todas las palabras deben aparecer.
 * Puntúa más alto las coincidencias en el título.
 */
export function searchPrayers(prayers: Prayer[], query: string): Prayer[] {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  if (!words.length) return []
  index ??= buildIndex(prayers)

  return index
    .map((item) => {
      let score = 0
      for (const w of words) {
        if (item.title.includes(w)) score += item.title.startsWith(w) ? 12 : 8
        else if (item.meta.includes(w)) score += 4
        else if (item.body.includes(w)) score += 1
        else return null
      }
      return { prayer: item.prayer, score }
    })
    .filter((r): r is { prayer: Prayer; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.prayer)
}
