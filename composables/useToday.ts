import { mysterySetForDay } from '~/data/rosary'

/** Domingo de Pascua (algoritmo de Meeus/Jones/Butcher, calendario gregoriano). */
export function easterSunday(year: number) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

/** Tiempo pascual: del Domingo de Resurrección a Pentecostés (49 días después). */
export function isEasterTime(date: Date) {
  const easter = easterSunday(date.getFullYear())
  const pentecost = new Date(easter)
  pentecost.setDate(easter.getDate() + 49)
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return d >= easter && d <= pentecost
}

export interface Suggestion {
  greeting: string
  title: string
  reason: string
  to: string
}

export type HourKey = 'manana' | 'mediodia' | 'misericordia' | 'rosario' | 'noche'

/** Un momento de oración del día, como las horas de un libro de horas. */
export interface Hour extends Suggestion {
  key: HourKey
  /** Nombre corto para la línea de las horas. */
  name: string
}

/** Los cinco momentos de oración del día, en orden. */
export function hoursOfDay(date: Date): Hour[] {
  const set = mysterySetForDay(date.getDay())
  const pascua = isEasterTime(date)
  return [
    { key: 'manana', name: 'Mañana', greeting: 'Buenos días', title: 'Oración de la mañana', reason: 'Empieza el día poniéndolo en manos de Dios.', to: '/oracion/oracion-de-la-manana' },
    pascua
      ? { key: 'mediodia', name: 'Regina Coeli', greeting: 'Buenos días', title: 'Regina Coeli', reason: 'En tiempo pascual, al mediodía se reza el Regina Coeli.', to: '/oracion/regina-coeli' }
      : { key: 'mediodia', name: 'Ángelus', greeting: 'Buenos días', title: 'Ángelus', reason: 'Al mediodía, la hora tradicional del Ángelus.', to: '/oracion/angelus' },
    { key: 'misericordia', name: 'Misericordia', greeting: 'Buenas tardes', title: 'Coronilla de la Divina Misericordia', reason: 'A las tres de la tarde, la hora de la misericordia.', to: '/oracion/coronilla-divina-misericordia' },
    { key: 'rosario', name: 'Rosario', greeting: 'Buenas tardes', title: 'Santo Rosario', reason: `Hoy tocan los ${set.title.toLowerCase()}.`, to: `/rosario?m=${set.slug}` },
    { key: 'noche', name: 'Noche', greeting: 'Buenas noches', title: 'Oración de la noche', reason: 'Repasa el día y descansa en paz.', to: '/oracion/oracion-de-la-noche' },
  ]
}

/** Qué momento del día toca ahora. */
export function currentHourKey(date: Date): HourKey {
  const h = date.getHours()
  if (h >= 5 && h < 11) return 'manana'
  if (h >= 11 && h < 15) return 'mediodia'
  if (h >= 15 && h < 16) return 'misericordia'
  if (h >= 16 && h < 21) return 'rosario'
  return 'noche'
}

/** Saludo como se dice en España: «buenas tardes» desde la hora de comer. */
export function greetingFor(date: Date) {
  const h = date.getHours()
  if (h >= 6 && h < 14) return 'Buenos días'
  if (h >= 14 && h < 21) return 'Buenas tardes'
  return 'Buenas noches'
}

export function suggestionFor(date: Date): Suggestion {
  const key = currentHourKey(date)
  const { title, reason, to } = hoursOfDay(date).find((h) => h.key === key)!
  return { greeting: greetingFor(date), title, reason, to }
}

/** Color del cielo de la ventana de la home según la hora real. */
export type Sky = 'alba' | 'dia' | 'tarde' | 'noche'
export function skyFor(date: Date): Sky {
  const h = date.getHours()
  if (h >= 6 && h < 9) return 'alba'
  if (h >= 9 && h < 17) return 'dia'
  if (h >= 17 && h < 21) return 'tarde'
  return 'noche'
}

export type SeasonKey = 'adviento' | 'navidad' | 'cuaresma' | 'semana-santa' | 'pascua' | 'ordinario'
export interface Season {
  key: SeasonKey
  name: string
  /** Color litúrgico del tiempo. */
  color: 'morado' | 'blanco' | 'rojo' | 'verde'
}

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

/** Tiempo litúrgico (calendario romano, con la Epifanía el 6 de enero, como en España). */
export function liturgicalSeason(date: Date): Season {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const y = d.getFullYear()
  const easter = easterSunday(y)
  const christmas = new Date(y, 11, 25)
  // Adviento: cuatro domingos antes de Navidad.
  const lastSunday = addDays(christmas, -(christmas.getDay() || 7))
  const advent = addDays(lastSunday, -21)
  // Navidad: hasta el Bautismo del Señor, el domingo después de Epifanía.
  const epiphany = new Date(y, 0, 6)
  const baptism = addDays(epiphany, 7 - epiphany.getDay())

  if (d >= christmas || d <= baptism) return { key: 'navidad', name: 'Tiempo de Navidad', color: 'blanco' }
  if (d >= advent) return { key: 'adviento', name: 'Adviento', color: 'morado' }
  if (d >= addDays(easter, -46) && d < addDays(easter, -7)) return { key: 'cuaresma', name: 'Cuaresma', color: 'morado' }
  if (d >= addDays(easter, -7) && d < easter) return { key: 'semana-santa', name: 'Semana Santa', color: 'rojo' }
  if (d >= easter && d <= addDays(easter, 49)) return { key: 'pascua', name: 'Tiempo pascual', color: 'blanco' }
  return { key: 'ordinario', name: 'Tiempo ordinario', color: 'verde' }
}

/** Fecha y hora actuales, refrescadas cada minuto (solo en el cliente). */
export function useNow() {
  const now = ref(new Date())
  if (import.meta.client) {
    let timer: ReturnType<typeof setInterval> | undefined
    onMounted(() => {
      now.value = new Date()
      timer = setInterval(() => (now.value = new Date()), 60_000)
    })
    onBeforeUnmount(() => clearInterval(timer))
  }
  return now
}

export const longDate = (d: Date) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(d)
