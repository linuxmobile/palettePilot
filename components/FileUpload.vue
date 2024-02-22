<script setup lang="ts">
import { useImage } from '~/composables/useImage'
import { useColors } from '~/composables/useColors'
import { extractColorsFromImage } from '~/utils/colors'

const { imageSrc, setImageSrc } = useImage()
const { imageColors, setImageColors, selectPrimaryColor, selectAccentColor } =
  useColors()

const onUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file === undefined) return

  const reader = new FileReader()
  reader.onload = async e => {
    // Reading as Data URL, result will always be a string
    // on successful read
    const result = e.target?.result as string
    setImageSrc(result)
    const extractedColors = await extractColorsFromImage(result)
    setImageColors(extractedColors)
    selectPrimaryColor(imageColors.value?.[0])
    selectAccentColor(imageColors.value?.[1])
  }
  reader.readAsDataURL(file)
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
        <p class="mb-2 text-gray-500 dark:text-gray-400">File Chooser</p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" @change="onUpload" />
    </label>
    <label
      v-else
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-300 min-w-xs md:min-w-xl"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
      </div>
      <input id="dropzone-file" type="file" class="hidden" @change="onUpload" />
    </label>
  </div>
</template>
