<script setup lang="ts">
import { useImage } from '~/composables/useImage'
import { useColors } from '~/composables/useColors'
import FileUpload from '~/components/FileUpload.vue'
import { extractColorsFromImage } from '~/utils/colors'
import { stripError } from '~/utils/errors'

const route = useRoute()
const { setImageSrc } = useImage()
const { setImageColors } = useColors()
const isLoading = ref(true)
const errorMsg = ref('')

onMounted(async () => {
  if (route.query.palette === undefined) {
    isLoading.value = false
    return
  }
  try {
    const res = await $fetch<{ imageUrl: string }>(
      `/api/palettes/${route.query.palette as string}`
    )
    const extractedColors = await extractColorsFromImage(res.imageUrl)
    setImageColors(extractedColors)
    setImageSrc(res.imageUrl)
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = stripError(error)
    }
  } finally {
    isLoading.value = false
  }
})

const clearError = () => {
  errorMsg.value = ''
  window.history.replaceState(null, '', '/')
}

const refresh = () => {
  window.location.reload()
}
</script>
<template>
  <main class="w-full min-h-screen grid place-content-center">
    <div
      role="alert"
      aria-live="polite"
      v-if="isLoading"
      class="grid place-content-center px-4"
    >
      <p class="font-bold text-4xl animate-bounce text-center">
        Loading Palette <span class="text-purple-600">Pilot</span>...
      </p>
    </div>
    <FileUpload v-if="!isLoading && errorMsg === ''" />
    <div
      class="grid place-content-center gap-5 px-4"
      role="alert"
      aria-live="assertive"
      v-if="!isLoading && errorMsg !== ''"
    >
      <p class="font-bold text-4xl text-center max-w-lg text-red-500">
        {{ errorMsg }}
      </p>
      <button
        class="bg-gray-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-100 rounded-lg text-gray-500 dark:text-gray-400 p-4"
        @click="clearError"
      >
        Create a new palette
      </button>
      <button
        class="bg-gray-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-100 rounded-lg text-gray-500 dark:text-gray-400 p-4"
        @click="refresh"
      >
        Try to retrieve palette again
      </button>
    </div>
  </main>
</template>
