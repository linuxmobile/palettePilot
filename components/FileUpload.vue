<script setup>
import { useImage } from '~/composables/useImage.ts'
import { useColorSelection } from '~/composables/useColorSelection.ts'
import FileUpload from 'primevue/fileupload'

const { imageSrc, setImageSrc, extractColors, colors } = useImage()
const { selectPrimaryColor, selectAccentColor } = useColorSelection()

const onUpload = event => {
  const file = event.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async e => {
    setImageSrc(e.target.result)
    await extractColors(e.target.result)
    if (colors.value.length > 0) {
      selectPrimaryColor(colors.value[0])
    }
    if (colors.value.length > 1) {
      selectAccentColor(colors.value[1])
    }

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
