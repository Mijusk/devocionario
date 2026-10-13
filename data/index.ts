import type { Category, Prayer } from '~/types/prayer'
import { basicas } from './prayers/basicas'
import { dia } from './prayers/dia'
import { marianas } from './prayers/marianas'
import { espirituSanto } from './prayers/espiritu-santo'
import { pasion } from './prayers/pasion'
import { santos } from './prayers/santos'
import { vida } from './prayers/vida'

export const categories: Category[] = [
  { slug: 'basicas', title: 'Oraciones básicas', description: 'Las que todo cristiano lleva en el corazón.', icon: 'cross' },
  { slug: 'dia', title: 'Para cada día', description: 'Mañana, mesa, estudio y noche.', icon: 'sun' },
  { slug: 'marianas', title: 'Con María', description: 'Ángelus, Salve, letanías y más.', icon: 'star' },
  { slug: 'espiritu-santo', title: 'Espíritu Santo', description: 'Para empezar con luz.', icon: 'flame' },
  { slug: 'pasion', title: 'Pasión y misericordia', description: 'Santa Brígida, Coronilla, Alma de Cristo.', icon: 'heart' },
  { slug: 'santos', title: 'Santos', description: 'San José, San Miguel, Santa Brígida…', icon: 'crown' },
  { slug: 'vida', title: 'Vida cristiana', description: 'Paz, alegría, caridad y pureza.', icon: 'leaf' },
]

export const prayers: Prayer[] = [
  ...basicas,
  ...dia,
  ...marianas,
  ...espirituSanto,
  ...pasion,
  ...santos,
  ...vida,
]

export const prayersBySlug: Record<string, Prayer> = Object.fromEntries(
  prayers.map((p) => [p.slug, p]),
)

/** Frase del inicio, tomada de la portada del devocionario original. */
export const epigraph = {
  text: 'No temas, porque has encontrado gracia ante Dios.',
  cite: 'Lc 1, 30',
}
