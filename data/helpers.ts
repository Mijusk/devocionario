import type { Block } from '~/types/prayer'

/** Atajos para escribir las oraciones de forma legible. */
export const p = (text: string): Block => ({ type: 'p', text })
export const h = (text: string): Block => ({ type: 'h', text })
export const rubric = (text: string): Block => ({ type: 'rubric', text })
export const ref = (slug: string, times?: number): Block => ({ type: 'ref', slug, times })
export const vr = (v: string, r: string): Block => ({ type: 'vr', v, r })
export const quote = (text: string, cite?: string): Block => ({ type: 'quote', text, cite })
export const litany = (response: string, items: string[]): Block => ({ type: 'litany', response, items })

/** Padre Nuestro, Avemaría y Gloria, tan habituales al final de cada paso. */
export const pnAmGloria = (): Block[] => [ref('padre-nuestro'), ref('avemaria'), ref('gloria')]
