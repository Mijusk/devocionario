<script setup lang="ts">
import type { IconName } from '~/types/prayer'

const props = withDefaults(defineProps<{ name: IconName; size?: number; filled?: boolean }>(), {
  size: 24,
  filled: false,
})

type Circle = [number, number, number]
interface IconDef {
  paths: string[]
  circles?: Circle[]
}

// Cuentas del rosario en círculo, con la cruz colgando abajo.
const beads: Circle[] = Array.from({ length: 11 }, (_, i) => {
  const a = (Math.PI / 2) + (i + 1) * ((2 * Math.PI) / 13)
  return [12 + 6.4 * Math.cos(a), 9 + 6.4 * Math.sin(a), 1.15]
})

const icons: Record<IconName, IconDef> = {
  cross: { paths: ['M12 3v18', 'M7 8.5h10'] },
  sun: {
    paths: ['M12 2.5v2.5', 'M12 19v2.5', 'M2.5 12H5', 'M19 12h2.5', 'M5.3 5.3l1.8 1.8', 'M16.9 16.9l1.8 1.8', 'M5.3 18.7l1.8-1.8', 'M16.9 7.1l1.8-1.8'],
    circles: [[12, 12, 4]],
  },
  moon: { paths: ['M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'] },
  star: { paths: ['M12 3.5l2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.4l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z'] },
  flame: { paths: ['M12 3c.8 3.2 4.5 5.2 4.5 9.5a4.5 4.5 0 0 1-9 0c0-2.2 1-3.6 2.3-4.6 0 1.9.9 3.1 2.2 3.4-.4-3 .1-5.6 0-8.3z'] },
  heart: { paths: ['M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z'] },
  crown: { paths: ['M4.5 18.5h15', 'M5 18.5 3.8 8.5l4.6 3.6L12 5.5l3.6 6.6 4.6-3.6-1.2 10'] },
  leaf: { paths: ['M5 19c0-8.3 5.2-13.3 14-14-.7 8.8-5.7 14-14 14z', 'M5 19l7.5-7.5'] },
  home: { paths: ['M4 10.5 12 4l8 6.5V20h-5v-5.5H9V20H4z'] },
  compass: { paths: ['M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8z'], circles: [[12, 12, 9]] },
  beads: { paths: ['M12 16.5v5', 'M10 19h4'], circles: beads },
  bookmark: { paths: ['M6.5 3.5h11v17l-5.5-3.8-5.5 3.8z'] },
  search: { paths: ['M20 20l-4.2-4.2'], circles: [[10.8, 10.8, 6.8]] },
  type: { paths: ['M3 18 7.5 6 12 18', 'M4.7 13.5h5.6', 'M15 18v-5.2a2.6 2.6 0 0 1 5.2 0V18', 'M15 15h5.2'] },
  'chevron-left': { paths: ['M15 5l-7 7 7 7'] },
  'chevron-right': { paths: ['M9 5l7 7-7 7'] },
  share: { paths: ['M12 3.5v11', 'M7.5 8 12 3.5 16.5 8', 'M5 13v7h14v-7'] },
  check: { paths: ['M5 12.5l4.5 4.5L19 7.5'] },
  close: { paths: ['M6 6l12 12', 'M18 6 6 18'] },
  clock: { paths: ['M12 7.5V12l3 2'], circles: [[12, 12, 9]] },
  plus: { paths: ['M12 5v14', 'M5 12h14'] },
  edit: { paths: ['M4 20h4L19 9l-4-4L4 16z', 'M13.5 6.5l4 4'] },
  folder: { paths: ['M3.5 6.5h6l2 2h9v10h-17z'] },
  // Dos deslizadores: ajustes de lectura y apariencia.
  settings: { paths: ['M4 8h9', 'M17 8h3', 'M4 16h3', 'M11 16h9'], circles: [[15, 8, 2], [9, 16, 2]] },
}

const def = computed(() => icons[props.name])
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="filled ? 'currentColor' : 'none'"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in def.paths" :key="`p${i}`" :d="d" />
    <circle v-for="(c, i) in def.circles ?? []" :key="`c${i}`" :cx="c[0]" :cy="c[1]" :r="c[2]" />
  </svg>
</template>
