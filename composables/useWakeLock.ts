/**
 * Mantiene la pantalla encendida mientras se reza.
 * Si el navegador no lo soporta, no hace nada.
 */
export function useWakeLock() {
  let sentinel: { release: () => Promise<void> } | null = null

  const request = async () => {
    try {
      const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } }
      if (nav.wakeLock && document.visibilityState === 'visible') sentinel = await nav.wakeLock.request('screen')
    } catch {
      sentinel = null
    }
  }

  const onVisibility = () => {
    if (document.visibilityState === 'visible') request()
  }

  onMounted(() => {
    request()
    document.addEventListener('visibilitychange', onVisibility)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', onVisibility)
    sentinel?.release().catch(() => {})
    sentinel = null
  })
}
