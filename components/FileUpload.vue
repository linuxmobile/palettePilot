<script setup lang="ts">
import { useImage } from '~/composables/useImage'
import { useColorSelection } from '~/composables/useColorSelection'
import { useImageColors } from '~/composables/useImageColors'
import FileUpload, { type FileUploadUploadEvent } from 'primevue/fileupload'
import { extractColorsFromImage } from '~/utils/colors'

const { imageSrc, setImageSrc } = useImage()
const { imageColors, setImageColors } = useImageColors()
const { selectPrimaryColor, selectAccentColor } = useColorSelection(imageColors.value)

const onUpload = (event: FileUploadUploadEvent) => {
  const file = (event.files as File[]).at(0)
  if (file === undefined) return

  const reader = new FileReader()
  reader.onload = async e => {
    // Reading as Data URL, result will always be a string
    // on successful read 
    const result = e.target?.result as string
    setImageSrc(result)
    const extractedColors = await extractColorsFromImage(result)
    setImageColors(extractedColors)
    selectPrimaryColor(extractedColors?.[0])
    selectAccentColor(extractedColors?.[1])
  }
  reader.readAsDataURL(file)
}
</script>
<template>
  <FileUpload
    :mode="imageSrc ? 'basic' : 'advanced'"
    name="demo[]"
    url="#"
    @upload="onUpload"
    accept="image/*"
    :maxFileSize="10000000"
    :auto="true"
    :showCancelButton="false"
    :showUploadButton="false"
    :pt="{
      root: { class: 'bg-transparent' },
      input: { class: 'opacity-0' },
      chooseButton: { class: 'w-full' },
      file: { class: 'hidden' }
    }"
    class="relative"
  >
    <template #empty>
      <h1 class="font-medium text-lg text-center">Drop Your Image</h1>
      <p class="text-sm text-gray-500 text-center">
        or click to select from computer
      </p>
      <p class="text-sm text-center pt-2 text-gray-300">
        (png, jpeg, webp & svg)
      </p>
    </template>
  </FileUpload>
</template>
