<script setup lang="ts">
/**
 * Cruz flotante: un crucifijo pequeño siempre a mano, abajo a la derecha.
 * - Un toque la amplía en el centro y difumina lo que hay detrás.
 * - Otro toque, en cualquier sitio, la devuelve a su lugar.
 * - Se puede arrastrar por toda la pantalla. La posición no se guarda:
 *   cada vez que se abre la app vuelve abajo a la derecha.
 * - Se desactiva en Ajustes («Cruz flotante»).
 */
const settings = useSettings()
const enabled = computed(() => settings.value.floatingCross !== false)

const mounted = ref(false)
onMounted(() => (mounted.value = true))

// Desplazamiento respecto a la posición inicial (abajo a la derecha).
const offset = reactive({ x: 0, y: 0 })
const btn = ref<HTMLButtonElement | null>(null)
const big = ref<HTMLImageElement | null>(null)
const open = ref(false)
const closing = ref(false)

// ── Arrastrar ──────────────────────────────────────────────────────────
let start: { px: number; py: number; ox: number; oy: number; rect: DOMRect } | null = null
let dragged = false

const onDown = (e: PointerEvent) => {
  if (!btn.value) return
  start = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y, rect: btn.value.getBoundingClientRect() }
  dragged = false
  btn.value.setPointerCapture(e.pointerId)
}

const onMove = (e: PointerEvent) => {
  if (!start) return
  const dx = e.clientX - start.px
  const dy = e.clientY - start.py
  if (!dragged && Math.hypot(dx, dy) < 6) return
  dragged = true
  // Sin salirse de la pantalla.
  const r = start.rect
  const minX = -r.left + 4
  const maxX = window.innerWidth - r.right - 4
  const minY = -r.top + 4
  const maxY = window.innerHeight - r.bottom - 4
  offset.x = start.ox + Math.min(maxX, Math.max(minX, dx))
  offset.y = start.oy + Math.min(maxY, Math.max(minY, dy))
}

const onUp = (e: PointerEvent) => {
  if (!start) return
  btn.value?.releasePointerCapture?.(e.pointerId)
  start = null
}

// Se abre con el «clic», no al levantar el dedo: si se abriera en pointerup,
// el clic que el navegador lanza justo después caería sobre el velo y la
// cerraría al instante. Tras arrastrar, ese clic se ignora.
const onClick = () => {
  if (dragged) {
    dragged = false
    return
  }
  show()
}

const onCancel = () => {
  start = null
}

// ── Ampliar y devolver ─────────────────────────────────────────────────
const reduced = () => import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Transformación que lleva la cruz grande a donde está la pequeña. */
const fromButton = () => {
  const a = btn.value?.getBoundingClientRect()
  const b = big.value?.getBoundingClientRect()
  if (!a || !b || !b.width) return 'none'
  const s = a.height / b.height
  const dx = a.left + a.width / 2 - (b.left + b.width / 2)
  const dy = a.top + a.height / 2 - (b.top + b.height / 2)
  return `translate(${dx}px, ${dy}px) scale(${s})`
}

let openedAt = 0

const show = async () => {
  if (open.value) return
  openedAt = performance.now()
  open.value = true
  closing.value = false
  await nextTick()
  if (!big.value || reduced()) return
  big.value.animate([{ transform: fromButton(), opacity: 0.85 }, { transform: 'none', opacity: 1 }], {
    duration: 420,
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  })
}

const hide = async () => {
  if (!open.value || closing.value) return
  // Por si algún navegador entrega tarde el toque que la abrió.
  if (performance.now() - openedAt < 350) return
  closing.value = true
  if (big.value && !reduced()) {
    const anim = big.value.animate([{ transform: 'none', opacity: 1 }, { transform: fromButton(), opacity: 0.9 }], {
      duration: 320,
      easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
      fill: 'forwards',
    })
    await anim.finished.catch(() => {})
  }
  open.value = false
  closing.value = false
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    openedAt = 0
    hide()
  }
}
watch(open, (v) => {
  if (!import.meta.client) return
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => import.meta.client && window.removeEventListener('keydown', onKey))

// Si se desactiva con la cruz abierta, se cierra.
watch(enabled, (v) => !v && (open.value = false))
</script>

<template>
  <ClientOnly>
    <template v-if="mounted && enabled">
      <button
        ref="btn"
        class="cruz"
        :class="{ 'is-hidden': open }"
        :style="{ transform: `translate(${offset.x}px, ${offset.y}px)` }"
        aria-label="Ver el crucifijo"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onCancel"
        @click="onClick"
      >
        <img src="/img/cristo-mini.webp" alt="" width="62" height="75" draggable="false" />
      </button>

      <Teleport to="body">
        <Transition name="cruz-velo">
          <div
            v-if="open"
            class="cruz-velo"
            :class="{ 'is-closing': closing }"
            role="dialog"
            aria-modal="true"
            aria-label="Crucifijo"
            @click="hide"
          >
            <img ref="big" class="cruz-velo__img" src="/img/cristo.webp" alt="Cristo crucificado" draggable="false" />
          </div>
        </Transition>
      </Teleport>
    </template>
  </ClientOnly>
</template>

<style scoped>
/* La cruz pequeña: suelta, sin círculo, con una sombra que la despega del fondo */
.cruz {
  position: fixed;
  right: 0.9rem;
  bottom: calc(var(--nav-h) + var(--safe-b) + 0.9rem);
  z-index: 30;
  width: 3.9rem;
  height: 4.7rem;
  padding: 0;
  display: grid;
  place-items: center;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: grab;
  border-radius: 8px;
}

.cruz:active {
  cursor: grabbing;
}

.cruz img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.35)) drop-shadow(0 0 1px rgb(0 0 0 / 0.4));
}

.cruz.is-hidden {
  visibility: hidden;
}

/* En las oraciones guiadas sube por encima de «Anterior / Siguiente» */
:global(body:has(.pager)) .cruz {
  bottom: calc(var(--nav-h) + var(--safe-b) + 4.9rem);
}

@media (min-width: 900px) {
  .cruz {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  :global(body:has(.pager)) .cruz {
    bottom: 6.5rem;
  }
}

/* Ampliada: lo de detrás se ve, pero difuminado */
.cruz-velo {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: calc(1.5rem + var(--safe-t)) 1rem calc(1.5rem + var(--safe-b));
  background: rgb(10 16 32 / 0.12);
  backdrop-filter: blur(7px) saturate(0.9);
  -webkit-backdrop-filter: blur(7px) saturate(0.9);
  cursor: zoom-out;
  transition:
    background-color 0.35s ease,
    backdrop-filter 0.35s ease,
    -webkit-backdrop-filter 0.35s ease;
}

/* Al cerrar, la cruz grande ya ha vuelto a su sitio: se oculta al instante */
.cruz-velo-leave-active .cruz-velo__img {
  opacity: 0;
}

.cruz-velo__img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: min(86vh, 56rem);
  object-fit: contain;
  user-select: none;
  -webkit-user-select: none;
  filter: drop-shadow(0 24px 40px rgb(0 0 0 / 0.45));
}

.cruz-velo-enter-active,
.cruz-velo-leave-active {
  transition-duration: 0.35s;
}

.cruz-velo-enter-from,
.cruz-velo-leave-to,
.cruz-velo.is-closing {
  background-color: rgb(10 16 32 / 0);
  backdrop-filter: blur(0) saturate(1);
  -webkit-backdrop-filter: blur(0) saturate(1);
}
</style>
