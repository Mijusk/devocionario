import type { Settings } from './useDevotion'
import { isMyPrayer, mergeMyPrayers, type MyPrayer } from '~/utils/myPrayer'

/**
 * Copia de seguridad de lo que el usuario guarda en este navegador.
 *
 * Se exporta a un archivo .json y al restaurar se COMBINA con lo que ya hay
 * (nunca se borra nada): se suman guardadas y días rezados.
 */

const APP = 'devocionario'
const VERSION = 1

export interface BackupFile {
  app: typeof APP
  version: number
  createdAt: string
  favorites: string[]
  tracking: Record<string, string[]>
  palabras: string[]
  /** Oraciones escritas por el usuario (desde la versión con «Mis oraciones»). */
  mine?: MyPrayer[]
  settings?: Partial<Settings>
}

export interface RestoreSummary {
  favorites: number
  days: number
  palabras: number
  mine: number
}

const union = (a: string[], b: string[]) => [...a, ...b.filter((x) => !a.includes(x))]
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string')
const isDay = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s)

/** Comprueba que el archivo es una copia del Devocionario y la limpia. */
export function parseBackup(raw: string): BackupFile {
  let data: any
  try {
    data = JSON.parse(raw)
  } catch {
    throw new Error('El archivo no se puede leer. Elige el archivo .json que guardaste desde el Devocionario.')
  }
  if (!data || data.app !== APP) {
    throw new Error('Este archivo no es una copia del Devocionario.')
  }
  if (typeof data.version !== 'number' || data.version > VERSION) {
    throw new Error('Esta copia es de una versión más nueva del Devocionario. Actualiza la página y vuelve a intentarlo.')
  }
  const tracking: Record<string, string[]> = {}
  if (data.tracking && typeof data.tracking === 'object') {
    for (const [slug, days] of Object.entries(data.tracking)) {
      if (isStringArray(days)) tracking[slug] = days.filter(isDay)
    }
  }
  return {
    app: APP,
    version: data.version,
    createdAt: typeof data.createdAt === 'string' ? data.createdAt : '',
    favorites: isStringArray(data.favorites) ? data.favorites : [],
    tracking,
    palabras: isStringArray(data.palabras) ? data.palabras : [],
    mine: Array.isArray(data.mine) ? data.mine.filter(isMyPrayer) : [],
    settings: data.settings && typeof data.settings === 'object' ? data.settings : undefined,
  }
}

/** Combina una copia con los datos actuales, sin perder nada de ninguno de los dos. */
export function mergeBackup(
  current: { favorites: string[]; tracking: Record<string, string[]>; palabras: string[]; mine: MyPrayer[] },
  backup: BackupFile,
) {
  const tracking = { ...current.tracking }
  let days = 0
  for (const [slug, list] of Object.entries(backup.tracking)) {
    const before = tracking[slug] ?? []
    const merged = union(before, list).sort()
    days += merged.length - before.length
    tracking[slug] = merged
  }
  const favorites = union(current.favorites, backup.favorites)
  const palabras = union(current.palabras, backup.palabras)
  const mine = mergeMyPrayers(current.mine, backup.mine ?? [])
  return {
    favorites,
    tracking,
    palabras,
    mine: mine.list,
    added: {
      favorites: favorites.length - current.favorites.length,
      days,
      palabras: palabras.length - current.palabras.length,
      mine: mine.added,
    } satisfies RestoreSummary,
  }
}

/** Días que han pasado desde una fecha ISO. */
export const daysSince = (iso: string | null, now = new Date()) =>
  iso ? Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000) : null

export function useBackup() {
  const { favorites } = useFavorites()
  const { log: tracking } = useTracking()
  const palabras = useLocalState<string[]>('palabras-guardadas', () => [])
  const settings = useSettings()
  const { list: mine } = useMyPrayers()
  const meta = useLocalState<{ lastBackupAt: string | null }>('backup', () => ({ lastBackupAt: null }))

  /** ¿Hay algo que merezca la pena guardar? */
  const hasData = computed(
    () =>
      favorites.value.length > 0 ||
      palabras.value.length > 0 ||
      mine.value.length > 0 ||
      Object.values(tracking.value).some((d) => d.length > 0),
  )

  const build = (): BackupFile => ({
    app: APP,
    version: VERSION,
    createdAt: new Date().toISOString(),
    favorites: favorites.value,
    tracking: tracking.value,
    palabras: palabras.value,
    mine: mine.value,
    settings: { ...settings.value },
  })

  /**
   * En el móvil abre el menú de compartir (WhatsApp, Drive, correo…);
   * si no se puede, descarga el archivo.
   * Devuelve false si el usuario cancela.
   */
  const save = async (): Promise<boolean> => {
    const backup = build()
    const name = `devocionario-copia-${dayKey()}.json`
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const file = new File([blob], name, { type: 'application/json' })

    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Copia del Devocionario' })
        meta.value = { lastBackupAt: backup.createdAt }
        return true
      }
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return false
      // Si compartir falla por otro motivo, se descarga.
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    meta.value = { lastBackupAt: backup.createdAt }
    return true
  }

  /** Lee un archivo de copia y lo combina con lo actual. */
  const restore = async (file: File): Promise<RestoreSummary> => {
    const backup = parseBackup(await file.text())
    const merged = mergeBackup(
      { favorites: favorites.value, tracking: tracking.value, palabras: palabras.value, mine: mine.value },
      backup,
    )
    mine.value = merged.mine
    favorites.value = merged.favorites
    tracking.value = merged.tracking
    palabras.value = merged.palabras
    // Los ajustes de lectura solo se toman de la copia si aquí siguen de fábrica.
    const s = settings.value
    const isDefault = s.fontScale === 1 && s.theme === 'auto' && !s.showLatin
    if (backup.settings && isDefault) settings.value = { ...s, ...backup.settings }
    return merged.added
  }

  /** Muestra el aviso si hay devociones en curso y no hay copia reciente. */
  const REMIND_AFTER_DAYS = 30
  const reminder = computed(() => {
    const totalDays = Object.values(tracking.value).reduce((n, d) => n + d.length, 0)
    if (!totalDays) return null
    const days = daysSince(meta.value.lastBackupAt)
    if (days === null) return totalDays >= 7 ? 'Aún no tienes copia de tus días rezados.' : null
    if (days < REMIND_AFTER_DAYS) return null
    const months = Math.floor(days / 30)
    return `Tu última copia es de hace ${months <= 1 ? 'un mes' : `${months} meses`}.`
  })

  return { save, restore, hasData, reminder, lastBackupAt: computed(() => meta.value.lastBackupAt) }
}

/**
 * Pide al navegador que no borre los datos aunque falte espacio.
 * No muestra nada al usuario (salvo Firefox de escritorio, que pregunta).
 */
export async function requestPersistentStorage() {
  try {
    if (!navigator.storage?.persist) return
    if (await navigator.storage.persisted()) return
    await navigator.storage.persist()
  } catch {
    /* no soportado */
  }
}
