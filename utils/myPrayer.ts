import type { Block } from '../types/prayer'

/** Oración escrita por el usuario. Vive solo en su navegador (y en sus copias). */
export interface MyPrayer {
  id: string
  title: string
  text: string
  author?: string
  note?: string
  createdAt: string
  updatedAt: string
}

export const MY_PREFIX = 'mia-'
export const isMine = (slug: string) => slug.startsWith(MY_PREFIX)
export const newMyPrayerId = () => `${MY_PREFIX}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`

/** Línea que inserta el botón del editor. */
export const BASICS_LINE = 'Padre Nuestro, Avemaría y Gloria'

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/** Nombres que se reconocen como oraciones básicas (ya sin tildes ni mayúsculas). */
const BASICS: Record<string, string> = {
  'padre nuestro': 'padre-nuestro',
  padrenuestro: 'padre-nuestro',
  avemaria: 'avemaria',
  'ave maria': 'avemaria',
  gloria: 'gloria',
  credo: 'credo',
  salve: 'salve',
  'senal de la cruz': 'senal-de-la-cruz',
  'yo confieso': 'yo-confieso',
  'acto de contricion': 'acto-de-contricion',
  'angel de la guarda': 'angel-de-la-guarda',
}

/** «Avemarías» → avemaria, «Padres nuestros» → padre-nuestro. */
function basicSlug(name: string) {
  if (BASICS[name]) return BASICS[name]
  const singular = name
    .split(' ')
    .map((w) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w))
    .join(' ')
  return BASICS[singular]
}

/**
 * Si un párrafo es solo una lista de oraciones básicas
 * («Padre Nuestro, Avemaría y Gloria», «3 Avemarías», «Gloria (3 veces)»),
 * devuelve sus referencias para mostrarlas como enlaces que se despliegan.
 */
export function parseBasics(paragraph: string): Block[] | null {
  const parts = norm(paragraph)
    .replace(/[.;:]+$/, '')
    .split(/\s*(?:,|\+|\n|\by\b|\be\b)\s*/)
    .filter(Boolean)
  if (!parts.length) return null

  const refs: Block[] = []
  for (const part of parts) {
    let name = part
    let times: number | undefined
    const before = name.match(/^(\d+)\s+(.+)$/)
    const after = name.match(/^(.+?)\s*(?:x\s*(\d+)|\(\s*(\d+)\s*(?:veces)?\s*\))$/)
    if (before) {
      times = Number(before[1])
      name = before[2]
    } else if (after) {
      name = after[1]
      times = Number(after[2] ?? after[3])
    }
    const slug = basicSlug(name.trim())
    if (!slug) return null
    refs.push({ type: 'ref', slug, times: times && times > 1 ? times : undefined })
  }
  return refs
}

/** Convierte el texto escrito en bloques: un párrafo por cada línea en blanco. */
export function textToBlocks(text: string): Block[] {
  return text
    .replace(/\r\n?/g, '\n')
    .split(/\n\s*\n/)
    .map((par) => par.trim())
    .filter(Boolean)
    .flatMap((par) => parseBasics(par) ?? [{ type: 'p', text: par } as Block])
}

/** Primera línea del texto, para las listas. */
export const firstLine = (text: string) => {
  const line = text.trim().split('\n')[0] ?? ''
  return line.length > 70 ? `${line.slice(0, 70).trimEnd()}…` : line
}

/** Comprueba que algo leído de una copia es una oración válida. */
export function isMyPrayer(v: unknown): v is MyPrayer {
  const p = v as MyPrayer
  return (
    !!p &&
    typeof p.id === 'string' &&
    isMine(p.id) &&
    typeof p.title === 'string' &&
    typeof p.text === 'string' &&
    typeof p.updatedAt === 'string'
  )
}

/**
 * Combina oraciones propias de una copia con las actuales.
 * Se emparejan por id o por título; de cada pareja se queda la más reciente.
 */
export function mergeMyPrayers(current: MyPrayer[], incoming: MyPrayer[]) {
  const result = [...current]
  let added = 0
  for (const inc of incoming) {
    const i = result.findIndex((p) => p.id === inc.id || norm(p.title) === norm(inc.title))
    if (i === -1) {
      result.push(inc)
      added++
    } else if (inc.updatedAt > result[i].updatedAt) {
      result[i] = { ...inc, id: result[i].id }
    }
  }
  return { list: result, added }
}
