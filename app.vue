<script setup>
import { useImage } from '~/composables/useImage.ts'
import Header from '~/components/Header.vue'
import Home from '~/components/Home.vue'
import PalettePage from '~/components/PalettePage.vue'

useHead({
  bodyAttrs: {
    class: 'text-black bg-white dark:bg-black dark:text-white transition-colors ease-in-out duration-200'
  }
})

useSeoMeta({
  title: 'Palette Pilot - Generate Awesome Color Palette for you UI',
  description:
    'Explore Palette Pilot magic: transforming your images into color palettes and giving UI ideas. Perfect for creatives',
  ogTitle: 'Palette Pilot - Generate Awesome Color Palette for you UI',
  ogDescription:
    'Explore Palette Pilot magic: transforming your images into color palettes and giving UI ideas. Perfect for creatives',
  twitterCard: 'summary_large_image'
})

const { imageSrc } = useImage()
</script>
<template>
  <Header />
  <div class="flex flex-col items-center justify-center">
    <Home v-if="imageSrc === ''" />
    <PalettePage v-else />
  </div>
</template>
<style>
@import url('primevue/resources/themes/aura-dark-noir/theme.css');
</style>
