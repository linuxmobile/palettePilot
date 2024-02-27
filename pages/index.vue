<script setup lang="ts">
import { extractColorsFromImage } from '~/utils/colors'
import { stripError } from '~/utils/errors'

const isLoading = ref(false)
const errorMsg = ref('')

const { setImageSrc } = useImage()
const { setImageColors } = useColors()

const clearError = () => {
  errorMsg.value = ''
}
</script>
<template>
  <main class="w-full min-h-screen grid place-content-center">
    <div v-if="isLoading" class="grid place-content-center px-4">
      <p class="font-bold text-4xl animate-bounce text-center">
        Loading <span class="text-purple-600">...</span>
      </p>
    </div>
    <FileUpload v-if="!isLoading && errorMsg === ''" />
    <div v-if="!isLoading && errorMsg !== ''" class="grid place-content-center gap-5 px-4" role="alert">
      <p class="font-bold text-4xl text-center max-w-lg text-red-500">
        {{ errorMsg }}
      </p>
      <button
        @click="clearError"
        class="bg-gray-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-100 rounded-lg text-gray-500 dark:text-gray-400 p-4"
      >
        Clear Error
      </button>
    </div>
  </main>
</template>
