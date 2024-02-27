<script setup lang="ts">
import { extractColorsFromImage } from '~/utils/colors'
import { stripError } from '~/utils/errors'
import { MAX_BYTES_SIZE } from '~/consts/files'

const router = useRouter()
const route = useRoute()

const { imageSrc, setImageSrc } = useImage()
const { imageColors, setImageColors, selectPrimaryColor, selectAccentColor } =
  useColors()
const { generatingPalette, setGeneratingPalette } = useGeneratingPalette()
const errorMsg = ref('')

const fileChooserText = computed(() => {
  return generatingPalette.value ? 'Generating palette...' : 'Choose an image'
})

const onUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files !== null ? target.files[0] : null
  if (file == null) return

  if (file.size > MAX_BYTES_SIZE) {
    errorMsg.value = 'Image is too big! Max size: 4.5MB'
    return
  }

  setGeneratingPalette(true)
  errorMsg.value = ''

  const formData = new FormData()
  formData.append('image', file)

  try {
    const formData = new FormData()
    formData.append('image', file)

    const res = await $fetch('/api/palettes/save', {
      method: 'POST',
      body: formData
    })
    const extractedColors = await extractColorsFromImage(res.imageUrl as string)
    setImageColors(extractedColors)
    selectPrimaryColor(imageColors.value?.[0])
    selectAccentColor(imageColors.value?.[1])

    if (route.path === '/') {
      await router.push({ path: '/palette', query: { palette: res.imageHash } })
    } else {
      const searchParams = new URLSearchParams()
      searchParams.append('palette', res.imageHash)
      window.history.replaceState(null, '', `?${searchParams.toString()}`)
      setImageSrc(res.imageUrl as string)
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = stripError(error)
    }
  } finally {
    setGeneratingPalette(false)
  }
}
</script>
<template>
  <div class="flex-center w-full">
    <label
      v-if="imageSrc"
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-100"
    >
      <div class="flex flex-col items-center justify-center py-3">
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          {{ fileChooserText }}
        </p>
      </div>
      <input
        :disabled="generatingPalette"
        id="dropzone-file"
        type="file"
        class="hidden"
        @change="onUpload"
      />
    </label>
    <label
      v-if="imageSrc === '' && !generatingPalette"
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-300 min-w-xs md:min-w-xl"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6 gap-3">
        <svg
          class="w-8 h-8 mb-4 text-gray-600 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold">
          Max size: 4.5MB
        </p>
      </div>
      <input
        :disabled="generatingPalette"
        id="dropzone-file"
        type="file"
        class="hidden"
        @change="onUpload"
      />
    </label>
  </div>
  <div
    v-if="generatingPalette && imageSrc === ''"
    class="grid place-content-center px-4"
    role="alert"
    aria-live="assertive"
  >
    <p class="font-bold text-4xl text-center">Generating Palette...</p>
  </div>
  <p class="text-red-500 text-center text-sm font-bold" v-if="errorMsg !== ''">
    {{ errorMsg }}
  </p>
</template>
