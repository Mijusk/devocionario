<script setup lang="ts">
import { BASICS_LINE, textToBlocks } from '~/utils/myPrayer'

/** Crear (sin ?id) o editar (con ?id) una oración propia. */
const route = useRoute()
const router = useRouter()
const { get, save, remove, folders } = useMyPrayers()

const id = computed(() => (typeof route.query.id === 'string' ? route.query.id : undefined))
const editing = computed(() => !!id.value)

useHead(() => ({ title: `${editing.value ? 'Editar oración' : 'Nueva oración'} · Devocionario` }))

const form = reactive({ title: '', text: '', author: '', note: '', folder: '' })

// Carpeta: se elige entre las existentes o se escribe una nueva.
const creatingFolder = ref(false)
const folderDraft = ref('')
const chooseFolder = (name: string) => {
  form.folder = name
  creatingFolder.value = false
}
const startNewFolder = () => {
  creatingFolder.value = true
  folderDraft.value = ''
  nextTick(() => document.getElementById('folder-input')?.focus())
}
const confirmNewFolder = () => {
  const name = folderDraft.value.replace(/\s+/g, ' ').trim()
  if (name) form.folder = name
  creatingFolder.value = false
}
/** Carpetas para elegir: las existentes y, si es nueva, la que se acaba de escribir. */
const folderOptions = computed(() => {
  const list = [...folders.value]
  if (form.folder && !list.some((f) => f.toLowerCase() === form.folder.toLowerCase())) list.push(form.folder)
  return list
})
const loaded = ref(false)
const notFound = ref(false)
const showMore = ref(false)
const tab = ref<'write' | 'preview'>('write')
const error = ref('')
const confirmDelete = ref(false)

// Rellena el formulario cuando ya se ha cargado lo guardado en el navegador.
onMounted(() => {
  const stop = watchEffect(() => {
    if (!editing.value) {
      if (!loaded.value && typeof route.query.carpeta === 'string') form.folder = route.query.carpeta
      loaded.value = true
      return
    }
    const p = get(id.value!)
    if (p) {
      Object.assign(form, { title: p.title, text: p.text, author: p.author ?? '', note: p.note ?? '', folder: p.folder ?? '' })
      showMore.value = !!(p.author || p.note)
      loaded.value = true
      nextTick(autosize)
      queueMicrotask(() => stop())
    }
  })
  // Si tras cargar todo no aparece, es que no existe (borrada o de otro móvil).
  setTimeout(() => {
    if (editing.value && !loaded.value) notFound.value = true
  }, 400)
})

// El cuadro de texto crece con lo que escribes.
const textarea = ref<HTMLTextAreaElement | null>(null)
const autosize = () => {
  const el = textarea.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight + 2}px`
}

/** Inserta «Padre Nuestro, Avemaría y Gloria» como párrafo propio donde está el cursor. */
const insertBasics = () => {
  const el = textarea.value
  const pos = el ? el.selectionStart : form.text.length
  const before = form.text.slice(0, pos).replace(/\s+$/, '')
  const after = form.text.slice(pos).replace(/^\s+/, '')
  const insert = `${before ? '\n\n' : ''}${BASICS_LINE}${after ? '\n\n' : ''}`
  form.text = `${before}${insert}${after}`
  nextTick(() => {
    if (!el) return
    const cursor = before.length + insert.length
    el.focus()
    el.setSelectionRange(cursor, cursor)
    autosize()
  })
}

const preview = computed(() => textToBlocks(form.text))
const showWrite = () => {
  tab.value = 'write'
  nextTick(autosize)
}
const cancelTo = computed(() => (id.value ? myPrayerUrl(id.value) : '/mis-oraciones'))

const onSave = () => {
  error.value = ''
  if (!form.title.trim()) error.value = 'Ponle un título a la oración.'
  else if (!form.text.trim()) error.value = 'Escribe el texto de la oración.'
  if (error.value) return
  const savedId = save({ ...form }, id.value)
  router.replace(myPrayerUrl(savedId))
}

const onDelete = () => {
  if (!confirmDelete.value) {
    confirmDelete.value = true
    setTimeout(() => (confirmDelete.value = false), 4000)
    return
  }
  remove(id.value!)
  router.replace('/mis-oraciones')
}
</script>

<template>
  <div class="page">
    <TopBar :title="editing ? 'Editar oración' : 'Nueva oración'" :back="cancelTo" />

    <div v-if="notFound" class="missing">
      <p>Esta oración no está en este móvil. Puede que la hayas borrado o que esté guardada en otro dispositivo.</p>
      <NuxtLink to="/mis-oraciones" class="btn">Ver mis oraciones</NuxtLink>
    </div>

    <form v-else-if="loaded" class="editor" novalidate @submit.prevent="onSave">
      <label class="field">
        <span class="field__label">Título</span>
        <input v-model="form.title" class="field__title" type="text" placeholder="Oración por mi familia" maxlength="120" autocomplete="off" />
      </label>

      <div class="field">
        <div class="field__row">
          <span class="field__label" id="text-label">Texto</span>
          <div class="tabs" role="tablist" aria-label="Modo del editor">
            <button type="button" role="tab" :aria-selected="tab === 'write'" @click="showWrite">Escribir</button>
            <button type="button" role="tab" :aria-selected="tab === 'preview'" @click="tab = 'preview'">Vista previa</button>
          </div>
        </div>

        <template v-if="tab === 'write'">
          <textarea
            ref="textarea"
            v-model="form.text"
            class="field__text"
            aria-labelledby="text-label"
            rows="8"
            placeholder="Señor, te doy gracias por…"
            @input="autosize"
          />
          <button type="button" class="insert" @click="insertBasics">
            <AppIcon name="plus" :size="18" />
            Padre Nuestro, Avemaría y Gloria
          </button>
          <p class="help">
            Deja una línea en blanco entre párrafos. Si escribes en una línea aparte «Padre Nuestro, Avemaría y Gloria»,
            «Credo» o «3 Avemarías», se verán como enlaces que se despliegan con su texto.
          </p>
        </template>

        <div v-else class="preview">
          <PrayerBlocks v-if="preview.length" :blocks="preview" drop-cap />
          <p v-else class="help">Aún no has escrito nada.</p>
        </div>
      </div>

      <fieldset class="field folders">
        <legend class="field__label">Carpeta</legend>
        <div class="chips">
          <button type="button" class="chip" :aria-pressed="!form.folder" @click="chooseFolder('')">Sin carpeta</button>
          <button
            v-for="f in folderOptions"
            :key="f"
            type="button"
            class="chip"
            :aria-pressed="form.folder.toLowerCase() === f.toLowerCase()"
            @click="chooseFolder(f)"
          >
            <AppIcon name="folder" :size="16" />
            {{ f }}
          </button>
          <button v-if="!creatingFolder" type="button" class="chip chip--new" @click="startNewFolder">
            <AppIcon name="plus" :size="16" />
            Nueva carpeta
          </button>
        </div>
        <div v-if="creatingFolder" class="new-folder">
          <label for="folder-input" class="visually-hidden">Nombre de la carpeta nueva</label>
          <input
            id="folder-input"
            v-model="folderDraft"
            type="text"
            placeholder="Familia, Novenas, Por los difuntos…"
            maxlength="40"
            autocomplete="off"
            @keydown.enter.prevent="confirmNewFolder"
          />
          <button type="button" class="btn btn--quiet" @click="confirmNewFolder">Crear</button>
        </div>
      </fieldset>

      <button type="button" class="more" :aria-expanded="showMore" @click="showMore = !showMore">
        <AppIcon name="chevron-right" :size="16" class="more__chev" />
        Autor y nota (opcional)
      </button>
      <div v-show="showMore" class="more__fields">
        <label class="field">
          <span class="field__label">Autor o de dónde la sacaste</span>
          <input v-model="form.author" type="text" placeholder="Santa Teresa, una estampa de la parroquia…" maxlength="120" />
        </label>
        <label class="field">
          <span class="field__label">Nota</span>
          <textarea v-model="form.note" rows="2" placeholder="Cuándo rezarla, por quién…" maxlength="400" />
        </label>
      </div>

      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <div class="actions">
        <button type="submit" class="btn">Guardar</button>
        <NuxtLink :to="cancelTo" class="btn btn--quiet">Cancelar</NuxtLink>
      </div>

      <button v-if="editing" type="button" class="delete" :class="{ 'is-confirm': confirmDelete }" @click="onDelete">
        {{ confirmDelete ? 'Toca otra vez para borrarla' : 'Borrar esta oración' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.editor {
  margin-top: 1rem;
  max-width: 36rem;
}

.field {
  display: block;
  margin-bottom: 1.25rem;
}

.field__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.4rem;
}

.field__label {
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink-soft);
  margin-bottom: 0.4rem;
}

.field__row .field__label {
  margin-bottom: 0;
}

input,
textarea {
  width: 100%;
  font: inherit;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.7rem 0.85rem;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: var(--gold);
}

.field__title {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.3rem;
}

.field__text {
  font-family: var(--font-text);
  font-size: var(--text-size);
  line-height: 1.6;
  min-height: 12rem;
  resize: none;
  overflow: hidden;
}

.tabs {
  display: inline-flex;
  background: var(--vellum-deep);
  border-radius: 999px;
  padding: 3px;
}

.tabs button {
  font-size: 0.88rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  color: var(--ink-soft);
}

.tabs button[aria-selected='true'] {
  background: var(--surface);
  color: var(--ink);
}

.insert {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.6rem;
  padding: 0.45rem 0.8rem;
  border: 1px dashed var(--gold-soft);
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--ink);
}

.help {
  margin: 0.6rem 0 0;
  font-size: 0.9rem;
  color: var(--ink-faint);
}

.preview {
  min-height: 12rem;
  padding: 1rem 0.9rem 0.25rem;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}

.folders {
  border: 0;
  padding: 0;
  margin: 0 0 1.25rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  min-height: 2.4rem;
  padding: 0 0.85rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  font-size: 0.95rem;
  font-weight: 500;
}

.chip[aria-pressed='true'] {
  background: var(--lapis);
  border-color: var(--lapis);
  color: var(--vellum);
}

.chip--new {
  border-style: dashed;
  border-color: var(--gold-soft);
  color: var(--ink-soft);
}

.new-folder {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
}

.new-folder input {
  flex: 1;
  min-width: 0;
}

.more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0;
  margin-bottom: 0.75rem;
  color: var(--lapis);
  font-weight: 500;
}

.more__chev {
  transition: transform 0.2s ease;
}

.more[aria-expanded='true'] .more__chev {
  transform: rotate(90deg);
}

.error {
  color: var(--rubric);
  margin: 0 0 1rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.delete {
  display: block;
  margin-top: 2.5rem;
  color: var(--rubric);
  font-weight: 500;
  padding: 0.5rem 0;
}

.delete.is-confirm {
  font-weight: 700;
}

.missing {
  padding-top: 2rem;
  color: var(--ink-soft);
}

.missing p {
  max-width: 28rem;
}
</style>
