<script setup>
import { stripError } from '~/utils/errors'
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const errorMsg = ref('')

const { imageSrc } = useImage()
const { imageColors } = useColors()
const { copyToClipboard } = useClipboard()

const onClick = async () => {
  if (!imageColors.value || imageColors.value.length === 0) {
    errorMsg.value = 'No colors provided!'
    return
  }

  const formData = new FormData()
  formData.append('image', imageSrc.value)
  formData.append('colors', JSON.stringify(imageColors.value))

  try {
    const res = await $fetch('/api/palettes/save', {
      method: 'POST',
      body: formData,
    })
    if (route.path === '/palette') {
      router.push(`/palette/${res.imageHash}`)
    }
    copyToClipboard(paletteUrlToShare)
  } catch (error) {
    if (error instanceof Error) {
      errorMsg.value = stripError(error)
    }
  }
}

const paletteUrlToShare = computed(() => {
  if (imageSrc.value === '') return ''
  return config.public.baseUrl + window.location.search.toString()
})
</script>
<template>
  <button
    class="bg-gray-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 hover:bg-gray-100 rounded-lg text-gray-500 dark:text-gray-400 py-3"
    @click="onClick"
  >
    Share Palette
  </button>
</template>