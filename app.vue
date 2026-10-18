<script setup lang="ts">
useApplySettings()

// En cuanto el usuario guarda algo, se pide al navegador que no lo borre
// aunque falte espacio. No muestra nada (salvo Firefox de escritorio).
const { hasData } = useBackup()
onMounted(() => {
  watch(hasData, (v) => v && requestPersistentStorage(), { immediate: true })
})
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
