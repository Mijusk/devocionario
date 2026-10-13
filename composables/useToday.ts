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

export function suggestionFor(date: Date): Suggestion {
  const hour = date.getHours()
  const set = mysterySetForDay(date.getDay())

  if (hour >= 5 && hour < 11) {
    return { greeting: 'Buenos días', title: 'Oración de la mañana', reason: 'Empieza el día poniéndolo en manos de Dios.', to: '/oracion/oracion-de-la-manana' }
  }
  if (hour >= 11 && hour < 15) {
    return isEasterTime(date)
      ? { greeting: 'Buenos días', title: 'Regina Coeli', reason: 'En tiempo pascual, al mediodía se reza el Regina Coeli.', to: '/oracion/regina-coeli' }
      : { greeting: 'Buenos días', title: 'Ángelus', reason: 'Es mediodía, la hora tradicional del Ángelus.', to: '/oracion/angelus' }
  }
  if (hour >= 15 && hour < 16) {
    return { greeting: 'Buenas tardes', title: 'Coronilla de la Divina Misericordia', reason: 'Las tres de la tarde, la hora de la misericordia.', to: '/oracion/coronilla-divina-misericordia' }
  }
  if (hour >= 16 && hour < 21) {
    return { greeting: 'Buenas tardes', title: 'Santo Rosario', reason: `Hoy tocan los ${set.title.toLowerCase()}.`, to: `/rosario?m=${set.slug}` }
  }
  return { greeting: 'Buenas noches', title: 'Oración de la noche', reason: 'Repasa el día y descansa en paz.', to: '/oracion/oracion-de-la-noche' }
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
