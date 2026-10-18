import { palabras, type Palabra } from '~/data/palabras'

const byId: Record<string, Palabra> = Object.fromEntries(palabras.map((p) => [p.id, p]))

interface PalabraState {
  /** Última palabra sacada y el día en que se sacó. */
  current: { id: string; day: string } | null
  /** Las que aún no han salido en esta vuelta. */
  bag: string[]
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Palabra de vida: se saca al azar y no se repite hasta que han salido todas.
 * La palabra sacada se mantiene durante el día, para volver a leerla.
 */
export function usePalabra() {
  const state = useLocalState<PalabraState>('palabra', () => ({ current: null, bag: [] }))
  const saved = useLocalState<string[]>('palabras-guardadas', () => [])

  /** Solo cuenta como «la de hoy» si se sacó hoy. */
  const today = computed(() => {
    const c = state.value.current
    return c && c.day === dayKey() ? byId[c.id] ?? null : null
  })

  const draw = () => {
    let bag = state.value.bag.filter((id) => byId[id])
    if (!bag.length) bag = shuffle(palabras.map((p) => p.id))
    // Evita que la nueva vuelta empiece con la misma que acaba de salir.
    if (bag[0] === state.value.current?.id && bag.length > 1) bag.push(bag.shift()!)
    const [id, ...rest] = bag
    state.value = { current: { id, day: dayKey() }, bag: rest }
    return byId[id]
  }

  const isSaved = (id: string) => saved.value.includes(id)
  const toggleSaved = (id: string) => {
    saved.value = isSaved(id) ? saved.value.filter((s) => s !== id) : [id, ...saved.value]
  }
  const savedPalabras = computed(() => saved.value.map((id) => byId[id]).filter((p): p is Palabra => !!p))

  return { today, draw, isSaved, toggleSaved, savedPalabras }
}

/** Texto listo para compartir por WhatsApp, Telegram… */
export const palabraParaCompartir = (p: Palabra) => `«${p.texto}» (${p.cita})`
