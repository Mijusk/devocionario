<script setup lang="ts">
/** Copia de seguridad: guardar en un archivo y restaurar desde él. */
const { save, restore, hasData, lastBackupAt } = useBackup()

const busy = ref(false)
const message = ref<{ kind: 'ok' | 'error'; text: string } | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const lastLabel = computed(() => {
  if (!lastBackupAt.value) return 'Aún no has hecho ninguna copia.'
  const d = new Date(lastBackupAt.value)
  return `Última copia: ${new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)}.`
})

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

const onSave = async () => {
  busy.value = true
  message.value = null
  try {
    if (await save()) message.value = { kind: 'ok', text: 'Copia guardada. Consérvala en un sitio seguro: WhatsApp, Drive o tu correo.' }
  } catch {
    message.value = { kind: 'error', text: 'No se ha podido crear la copia. Vuelve a intentarlo.' }
  } finally {
    busy.value = false
  }
}

const onPick = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  busy.value = true
  message.value = null
  try {
    const added = await restore(file)
    const parts = [
      added.favorites && plural(added.favorites, 'oración', 'oraciones'),
      added.days && plural(added.days, 'día rezado', 'días rezados'),
      added.palabras && plural(added.palabras, 'palabra de vida', 'palabras de vida'),
    ].filter(Boolean)
    message.value = {
      kind: 'ok',
      text: parts.length ? `Copia restaurada. Se han añadido ${new Intl.ListFormat('es', { type: 'conjunction' }).format(parts as string[])}.` : 'Copia restaurada. Ya tenías todo lo que contenía.',
    }
  } catch (err) {
    message.value = { kind: 'error', text: (err as Error).message || 'No se ha podido restaurar la copia.' }
  } finally {
    busy.value = false
  }
}

defineExpose({ save: onSave })
</script>

<template>
  <section id="copia" class="backup" aria-labelledby="backup-title">
    <h2 id="backup-title" class="section-title">Copia de seguridad</h2>
    <p class="backup__text">
      Lo que guardas vive en este móvil. Haz una copia para no perderlo si cambias de móvil o borras los datos del navegador.
      Al restaurarla se suma a lo que ya tengas, no se borra nada.
    </p>
    <p class="backup__last">{{ lastLabel }}</p>

    <div class="backup__actions">
      <button class="btn" :disabled="busy || !hasData" @click="onSave">Guardar copia</button>
      <button class="btn btn--quiet" :disabled="busy" @click="fileInput?.click()">Restaurar copia</button>
      <input ref="fileInput" type="file" accept=".json,application/json" class="visually-hidden" tabindex="-1" @change="onPick" />
    </div>

    <p v-if="!hasData" class="backup__hint">Cuando guardes oraciones o anotes días rezados, podrás hacer una copia.</p>
    <p v-if="message" class="backup__msg" :class="`is-${message.kind}`" role="status">{{ message.text }}</p>
  </section>
</template>

<style scoped>
.backup {
  margin-top: 1rem;
}

.backup__text {
  margin: 0 0 0.5rem;
  color: var(--ink-soft);
  max-width: 34rem;
}

.backup__last {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: var(--ink-faint);
}

.backup__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.btn:disabled {
  opacity: 0.45;
}

.backup__hint {
  margin: 0.75rem 0 0;
  font-size: 0.92rem;
  color: var(--ink-faint);
}

.backup__msg {
  margin: 0.9rem 0 0;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  font-size: 0.95rem;
  border-left: 2px solid var(--gold);
  background: var(--vellum-deep);
}

.backup__msg.is-error {
  border-left-color: var(--rubric);
  color: var(--rubric);
}
</style>
