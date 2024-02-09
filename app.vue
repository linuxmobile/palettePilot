<script setup>
import Header from '~/components/Header.vue'
import File from '~/components/File.vue'

useHead({
  bodyAttrs: {
    class: 'bg-black text-white'
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
</script>
<template>
  <Header />
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-bold text-9xl">Hello World</h1>
    <File />
  </div>
</template>
<style>
@import url('primevue/resources/themes/aura-dark-noir/theme.css');
</style>
