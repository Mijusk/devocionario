/**
 * Estado compartido que se guarda en localStorage.
 *
 * En el servidor (y durante la hidratación) vale el valor por defecto, así
 * el HTML pre-generado coincide siempre. Justo después de montar la app se
 * carga lo guardado y a partir de ahí cada cambio se persiste.
 */
export function useLocalState<T>(key: string, initial: () => T) {
  const state = useState<T>(`ls:${key}`, initial)

  if (import.meta.client) {
    const nuxtApp = useNuxtApp()
    const loadedFlag = useState<Record<string, boolean>>('ls:__loaded', () => ({}))

    const load = () => {
      if (loadedFlag.value[key]) return
      loadedFlag.value[key] = true
      try {
        const raw = localStorage.getItem(`dv:${key}`)
        if (raw != null) state.value = merge(initial(), JSON.parse(raw))
      } catch {
        /* almacenamiento no disponible: seguimos con el valor por defecto */
      }
      watch(
        state,
        (v) => {
          try {
            localStorage.setItem(`dv:${key}`, JSON.stringify(v))
          } catch {
            /* ignorado */
          }
        },
        { deep: true },
      )
    }

    if (nuxtApp.isHydrating) nuxtApp.hook('app:mounted', load)
    else load()
  }

  return state
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v)

/** Mezcla lo guardado con los valores por defecto (por si se añaden ajustes nuevos). */
function merge<T>(defaults: T, stored: unknown): T {
  if (isPlainObject(defaults) && isPlainObject(stored)) return { ...defaults, ...stored } as T
  return stored as T
}
