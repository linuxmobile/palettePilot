<script setup lang="ts">
import { extractColorsFromImage } from '~/utils/colors'
import { stripError } from '~/utils/errors'
import SelectButton from 'primevue/selectbutton'

const route = useRoute()
const router = useRouter()

definePageMeta({
  middleware: 'check-palette-page'
})

const { setImageSrc } = useImage()
const { setImageColors } = useColors()
const isLoading = ref(true)
const errorMsg = ref('')

onMounted(async () => {
  const paletteId = route.query.palette
  if (!paletteId) {
    isLoading.value = false
    errorMsg.value = 'No palette specified.'
    return
  }

  try {
    const res = await $fetch<{ imageUrl: string }>(`/api/palettes/${paletteId}`)
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

const DEMO = {
  LANDING_EXAMPLE: 'Minimalist Example',
  UI_ELEMENTS: 'UI Elements'
}
const OPTIONS = [DEMO.LANDING_EXAMPLE, DEMO.UI_ELEMENTS]
const selectedOption = ref(DEMO.LANDING_EXAMPLE)
</script>

<template>
  <div
    role="alert"
    aria-live="polite"
    v-if="isLoading"
    class="grid min-h-screen place-content-center py-12 md:py-0"
  >
    <p class="font-bold text-4xl animate-bounce text-center text-white">
      Loading Palette <span class="text-purple-600">Pilot</span>...
    </p>
  </div>
  <section v-else class="grid grid-cols-1 lg:grid-cols-12 py-12 md:py-0">
    <SideBar />
    <div
      class="lg:col-span-9 pt-18 grid justify-items-center overflow-y-auto h-100dvh"
    >
      <SelectButton
        v-model="selectedOption"
        :options="OPTIONS"
        aria-labelledby="basic"
        :pt="{
          button:
            'text-gray-700 dark:text-gray-400 focus:text-purple-600 focus:font-bold focus:underline underline-offset-2 hover:bg-gray-100 dark:focus:text-purple-400 dark:hover:bg-neutral-900 bg-gray-50 dark:bg-neutral-800 before:bg-transparent min-w-[172px]'
        }"
      />
      <MinimalistExample v-if="selectedOption === DEMO.LANDING_EXAMPLE" />
      <UIComponents v-else />
    </div>
  </section>
</template>
