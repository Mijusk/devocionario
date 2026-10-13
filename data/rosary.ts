export type MysterySetSlug = 'gozosos' | 'dolorosos' | 'gloriosos' | 'luminosos'

export interface Mystery {
  title: string
  cite: string
  /** Fruto o virtud que se pide, según la tradición. */
  fruit: string
}

export interface MysterySet {
  slug: MysterySetSlug
  title: string
  /** Días de la semana (0 = domingo … 6 = sábado). */
  days: number[]
  daysLabel: string
  mysteries: Mystery[]
}

export const mysterySets: MysterySet[] = [
  {
    slug: 'gozosos',
    title: 'Misterios gozosos',
    days: [1, 6],
    daysLabel: 'Lunes y sábados',
    mysteries: [
      { title: 'La Anunciación del ángel a María', cite: 'Lc 1, 26-38', fruit: 'La humildad' },
      { title: 'La Visitación de María a su prima Isabel', cite: 'Lc 1, 39-56', fruit: 'La caridad con el prójimo' },
      { title: 'El nacimiento de Jesús en Belén', cite: 'Lc 2, 1-20', fruit: 'El espíritu de pobreza' },
      { title: 'La Presentación de Jesús en el templo', cite: 'Lc 2, 22-38', fruit: 'La obediencia' },
      { title: 'El Niño Jesús perdido y hallado en el templo', cite: 'Lc 2, 41-52', fruit: 'Buscar a Dios en todo' },
    ],
  },
  {
    slug: 'dolorosos',
    title: 'Misterios dolorosos',
    days: [2, 5],
    daysLabel: 'Martes y viernes',
    mysteries: [
      { title: 'La oración de Jesús en el Huerto de los Olivos', cite: 'Mt 26, 36-46', fruit: 'La conformidad con la voluntad de Dios' },
      { title: 'La flagelación del Señor', cite: 'Jn 19, 1', fruit: 'La mortificación de los sentidos' },
      { title: 'La coronación de espinas', cite: 'Mt 27, 27-31', fruit: 'La humildad ante las humillaciones' },
      { title: 'Jesús con la cruz a cuestas camino del Calvario', cite: 'Jn 19, 17', fruit: 'La paciencia en las pruebas' },
      { title: 'La crucifixión y muerte de Jesús', cite: 'Lc 23, 33-46', fruit: 'El amor a la cruz' },
    ],
  },
  {
    slug: 'gloriosos',
    title: 'Misterios gloriosos',
    days: [3, 0],
    daysLabel: 'Miércoles y domingos',
    mysteries: [
      { title: 'La Resurrección del Señor', cite: 'Mt 28, 1-10', fruit: 'La fe' },
      { title: 'La Ascensión del Señor a los cielos', cite: 'Hch 1, 6-11', fruit: 'La esperanza' },
      { title: 'La venida del Espíritu Santo sobre los apóstoles', cite: 'Hch 2, 1-13', fruit: 'Los dones del Espíritu Santo' },
      { title: 'La Asunción de María a los cielos', cite: 'Ap 12, 1', fruit: 'Una buena muerte' },
      { title: 'La coronación de María como Reina de cielos y tierra', cite: 'Ap 12, 1', fruit: 'La devoción a María' },
    ],
  },
  {
    slug: 'luminosos',
    title: 'Misterios luminosos',
    days: [4],
    daysLabel: 'Jueves',
    mysteries: [
      { title: 'El Bautismo de Jesús en el Jordán', cite: 'Mt 3, 13-17', fruit: 'Vivir el propio bautismo' },
      { title: 'La autorrevelación de Jesús en las bodas de Caná', cite: 'Jn 2, 1-11', fruit: 'Hacer lo que Él nos diga' },
      { title: 'El anuncio del Reino de Dios invitando a la conversión', cite: 'Mc 1, 14-15', fruit: 'La conversión' },
      { title: 'La Transfiguración del Señor', cite: 'Lc 9, 28-36', fruit: 'El deseo de santidad' },
      { title: 'La institución de la Eucaristía', cite: 'Mt 26, 26-29', fruit: 'El amor a la Eucaristía' },
    ],
  },
]

export const ordinals = ['Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto']

export function mysterySetForDay(day: number): MysterySet {
  return mysterySets.find((s) => s.days.includes(day)) ?? mysterySets[0]
}
