/**
 * Modelo de datos del devocionario.
 *
 * Una oración se compone de bloques. Las oraciones guiadas (Santa Brígida,
 * novenas…) se dividen además en pasos, cada uno con sus propios bloques.
 */

export type Block =
  /** Párrafo normal. Los saltos de línea (\n) se respetan como versos. */
  | { type: 'p'; text: string }
  /** Subtítulo dentro de la oración. */
  | { type: 'h'; text: string }
  /** Rúbrica: indicación en rojo (como en los misales), no se reza. */
  | { type: 'rubric'; text: string }
  /** Referencia a una oración básica (Padre Nuestro, Avemaría…). Se despliega al tocarla. */
  | { type: 'ref'; slug: string; times?: number }
  /** Versículo y respuesta (V/ R/). */
  | { type: 'vr'; v: string; r: string }
  /** Cita bíblica o frase destacada. */
  | { type: 'quote'; text: string; cite?: string }
  /** Letanía: invocaciones que comparten la misma respuesta. */
  | { type: 'litany'; response: string; items: string[] }

export interface Step {
  title: string
  subtitle?: string
  blocks: Block[]
  /**
   * Repeticiones con contador táctil (p. ej. las 10 Avemarías de un misterio).
   * El texto que se repite va en `countText`.
   */
  count?: number
  countText?: string
  /** Bloques que se muestran tras completar el contador. */
  after?: Block[]
}

export type CategorySlug =
  | 'basicas'
  | 'dia'
  | 'marianas'
  | 'espiritu-santo'
  | 'pasion'
  | 'santos'
  | 'vida'

export type IconName =
  | 'cross'
  | 'sun'
  | 'moon'
  | 'star'
  | 'flame'
  | 'heart'
  | 'crown'
  | 'leaf'
  | 'home'
  | 'compass'
  | 'beads'
  | 'bookmark'
  | 'search'
  | 'type'
  | 'chevron-left'
  | 'chevron-right'
  | 'share'
  | 'check'
  | 'close'
  | 'clock'

export interface Category {
  slug: CategorySlug
  title: string
  description: string
  icon: IconName
}

export interface Prayer {
  slug: string
  title: string
  /** Frase corta para tarjetas y resultados de búsqueda. */
  summary?: string
  category: CategorySlug
  tags?: string[]
  /** Autor o atribución tradicional. */
  author?: string
  /** Nota breve (contexto, cuándo rezarla…). */
  note?: string
  /** Texto de la oración. */
  blocks?: Block[]
  /** Si existe, la oración se reza paso a paso. */
  steps?: Step[]
  /** Texto original en latín, para mostrar en paralelo. */
  latin?: Block[]
  /** Permite llevar la cuenta de días rezados (devociones largas). */
  tracking?: { label: string; goalDays?: number }
}
