<script setup lang="ts">
import { firstLine } from '~/utils/myPrayer'

/** Mis oraciones: «Nueva oración» arriba y la lista agrupada por carpetas. */
useHead({ title: 'Mis oraciones · Devocionario' })

const { list, grouped, renameFolder } = useMyPrayers()

/** Carpetas plegadas (se recuerdan entre visitas). */
const collapsed = useLocalState<string[]>('carpetas-plegadas', () => [])
const isOpen = (name: string) => !collapsed.value.includes(name)
const toggleFolder = (name: string) => {
  collapsed.value = isOpen(name) ? [...collapsed.value, name] : collapsed.value.filter((n) => n !== name)
}

// Renombrar carpeta, en línea.
const renaming = ref<string | null>(null)
const newName = ref('')
const startRename = (name: string) => {
  renaming.value = name
  newName.value = name
  nextTick(() => document.getElementById('rename-input')?.focus())
}
const confirmRename = () => {
  const from = renaming.value
  if (!from) return
  const to = renameFolder(from, newName.value)
  // Mantiene el estado plegado con el nombre nuevo.
  if (collapsed.value.includes(from)) {
    collapsed.value = collapsed.value.filter((n) => n !== from).concat(to ? [to] : [])
  }
  renaming.value = null
}
</script>

<template>
  <div class="page">
    <TopBar back="/explorar" />

    <header class="head">
      <h1>Mis oraciones</h1>
    </header>

    <NuxtLink :to="myPrayerEditUrl()" class="new">
      <span class="new__icon"><AppIcon name="plus" :size="22" /></span>
      <span class="new__body">
        <span class="new__title">Nueva oración</span>
        <span class="new__hint">Escríbela y guárdala en una carpeta si quieres.</span>
      </span>
    </NuxtLink>

    <ClientOnly>
      <p v-if="!list.length" class="empty">
        Aún no has escrito ninguna. Copia aquí la novena de una estampa, la oración que te enseñó tu abuela o la que rezas por alguien.
      </p>

      <!-- Carpetas -->
      <section v-for="f in grouped.folders" :key="f.name" class="folder" :class="{ 'is-open': isOpen(f.name) }">
        <div class="folder__head">
          <button class="folder__toggle" :aria-expanded="isOpen(f.name)" @click="toggleFolder(f.name)">
            <AppIcon name="folder" :size="22" class="folder__icon" />
            <span class="folder__name">{{ f.name }}</span>
            <span class="folder__count">{{ f.prayers.length }}</span>
            <AppIcon name="chevron-right" :size="18" class="folder__chev" />
          </button>
        </div>

        <div v-show="isOpen(f.name)" class="folder__body">
          <ul class="rows">
            <li v-for="m in f.prayers" :key="m.id">
              <NuxtLink :to="myPrayerUrl(m.id)" class="row">
                <span class="row__body">
                  <span class="row__title">{{ m.title }}</span>
                  <span class="row__summary">{{ firstLine(m.text) }}</span>
                </span>
              </NuxtLink>
            </li>
          </ul>

          <form v-if="renaming === f.name" class="rename" @submit.prevent="confirmRename">
            <label for="rename-input" class="visually-hidden">Nuevo nombre de la carpeta</label>
            <input id="rename-input" v-model="newName" type="text" maxlength="40" autocomplete="off" />
            <button type="submit" class="folder__link">Guardar</button>
            <button type="button" class="folder__link is-quiet" @click="renaming = null">Cancelar</button>
          </form>
          <div v-else class="folder__actions">
            <NuxtLink :to="myPrayerEditUrl(undefined, f.name)" class="folder__link">
              <AppIcon name="plus" :size="16" /> Añadir aquí
            </NuxtLink>
            <button class="folder__link is-quiet" @click="startRename(f.name)">Renombrar carpeta</button>
          </div>
        </div>
      </section>

      <!-- Sin carpeta -->
      <section v-if="grouped.loose.length" class="loose">
        <h2 v-if="grouped.folders.length" class="section-title">Sin carpeta</h2>
        <ul class="rows">
          <li v-for="m in grouped.loose" :key="m.id">
            <NuxtLink :to="myPrayerUrl(m.id)" class="row">
              <span class="row__body">
                <span class="row__title">{{ m.title }}</span>
                <span class="row__summary">{{ firstLine(m.text) }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </ClientOnly>
  </div>
</template>

<style scoped>
.head {
  margin: 0.75rem 0 1.25rem;
}

.head h1 {
  font-size: clamp(2.2rem, 9vw, 3rem);
}

.new {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 1rem;
  border: 1px dashed var(--gold-soft);
  border-radius: 16px;
  background: var(--surface);
  margin-bottom: 1.75rem;
}

.new__icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  flex: none;
  border-radius: 50%;
  background: var(--lapis);
  color: var(--vellum);
}

.new__body {
  display: flex;
  flex-direction: column;
}

.new__title {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.2rem;
}

.new__hint {
  font-size: 0.92rem;
  color: var(--ink-soft);
}

.empty {
  color: var(--ink-soft);
  max-width: 30rem;
}

/* Carpeta */
.folder {
  border-top: 1px solid var(--line);
}

.folder:last-of-type:not(.is-open) {
  border-bottom: 1px solid var(--line);
}

.folder__toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 3.5rem;
  padding: 0.6rem 0.25rem;
  text-align: left;
}

.folder__icon {
  color: var(--gold);
  flex: none;
}

.folder__name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.15rem;
}

.folder__count {
  color: var(--ink-faint);
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
}

.folder__chev {
  color: var(--ink-faint);
  transition: transform 0.2s ease;
}

.is-open .folder__chev {
  transform: rotate(90deg);
}

/* Las oraciones de la carpeta, sangradas bajo ella */
.folder__body {
  padding-left: 2.2rem;
  padding-bottom: 0.5rem;
}

.folder__body .rows {
  border-top: 1px solid var(--line);
}

.folder__actions,
.rename {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem 1.25rem;
  padding: 0.35rem 0.25rem 0.5rem;
}

.folder__link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--lapis);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.4rem 0;
}

.folder__link.is-quiet {
  color: var(--ink-faint);
}

.rename input {
  flex: 1 1 10rem;
  min-width: 0;
  font: inherit;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--gold);
  border-radius: 10px;
  padding: 0.5rem 0.7rem;
  outline: none;
}

.loose {
  margin-top: 0.5rem;
}

.loose:first-child .rows,
.folder + .loose .section-title {
  margin-top: 1.5rem;
}
</style>
