<script setup lang="ts">
import { extractColorsFromImage } from '~/utils/colors'
import { stripError } from '~/utils/errors'
import imageCompression from 'browser-image-compression'
const router = useRouter()
const route = useRoute()

const isHome = computed(() => route.path === '/')
const shouldShowFileChooserText = computed(() => {
  const currentPath = route.path

  return (
    (!generatingPalette.value && currentPath === '/') ||
    currentPath.startsWith('/palette')
  )
})

const { imageSrc, setImageSrc } = useImage()
const { imageColors, setImageColors, selectPrimaryColor, selectAccentColor } =
  useColors()
const { generatingPalette, setGeneratingPalette } = useGeneratingPalette()
const errorMsg = ref('')

const fileChooserText = computed(() => {
  return generatingPalette.value ? 'Generating palette...' : 'Choose an image'
})

const preventDefaults = e => {
  e.preventDefault()
  e.stopPropagation()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
  events.forEach(eventName => {
    document.body.addEventListener(eventName, preventDefaults)
  })
  document.addEventListener('paste', handlePaste)
})

onUnmounted(() => {
  events.forEach(eventName => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
  document.removeEventListener('paste', handlePaste)
})

async function handlePaste(event) {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items

  for (const item of items) {
    if (item.type.indexOf('image') === 0) {
      event.preventDefault()
      const file = item.getAsFile()

      const simulatedEvent = {
        target: {
          files: [file]
        }
      }

      await onUpload(simulatedEvent)
      break
    }
  }
}

const onUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files !== null ? target.files[0] : null
  if (file == null) return

  setGeneratingPalette(true)
  errorMsg.value = ''

  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    const compressedFile = await imageCompression(file, options)
    /**
     * Reads the contents of a file and returns it as a base64 encoded string.
     * @param {File} file - The file to be read.
     * @returns {Promise<string>} - A promise that resolves with the base64 encoded string of the file contents.
     */
    const base64String = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = function () {
        const result = reader.result as string
        resolve(result)
      }
      reader.onerror = function (error) {
        reject(error)
      }
      reader.readAsDataURL(compressedFile)
    })

    setImageSrc(base64String)
    localStorage.setItem('imageSrc', base64String)

    const extractedColors = await extractColorsFromImage(base64String)
    setImageColors(extractedColors)
    selectPrimaryColor(imageColors.value?.[0])
    selectAccentColor(imageColors.value?.[1])

    localStorage.setItem('imageColors', JSON.stringify(extractedColors))

    if (route.path.includes('/palette')) {
      await router.push(`/palette`)
    }
    if (route.path === '/') {
      await router.push(`/palette`)
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = stripError(error)
    }
  } finally {
    setGeneratingPalette(false)
  }
}

const onDrop = async event => {
  event.preventDefault()
  const files = event.dataTransfer.files
  if (files.length === 0) return

  const file = files[0]
  const simulatedEvent = {
    target: {
      files: [file]
    }
  }

  await onUpload(simulatedEvent)
}
</script>
<template>
  <div class="flex-center w-full">
    <label
      v-if="imageSrc"
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-100"
    >
      <div
        v-if="shouldShowFileChooserText"
        class="flex flex-col items-center justify-center py-3"
      >
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
      @drop.prevent="onDrop"
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
          SVG, PNG, JPG or GIF
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
    v-if="generatingPalette && isHome"
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
