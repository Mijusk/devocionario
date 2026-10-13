<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
</script>

<template>
  <NuxtLayout>
    <div class="page err">
      <p class="err__cross" aria-hidden="true">✠</p>
      <h1>{{ notFound ? 'No encontramos esta página' : 'Algo ha fallado' }}</h1>
      <p>{{ notFound ? 'Puede que el enlace esté mal escrito o que la oración haya cambiado de nombre.' : 'Vuelve a intentarlo en un momento.' }}</p>
      <div class="err__actions">
        <button class="btn btn--quiet" @click="clearError({ redirect: '/explorar' })">Buscar una oración</button>
        <button class="btn" @click="clearError({ redirect: '/' })">Ir a Hoy</button>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.err {
  text-align: center;
  padding-top: 4rem;
}

.err__cross {
  color: var(--rubric);
  font-size: 2rem;
  margin: 0;
}

.err h1 {
  font-size: 2rem;
  margin: 0.5rem 0 0.75rem;
}

.err p {
  color: var(--ink-soft);
  max-width: 26rem;
  margin: 0 auto 1.5rem;
}

.err__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
