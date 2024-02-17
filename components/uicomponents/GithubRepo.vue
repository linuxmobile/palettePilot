<script setup>
import { useColorSelection } from '~/composables/useColorSelection.ts'

const {accentColor, primaryColor} = useColorSelection()

const bg = computed(() => primaryColor.value ? primaryColor.value.hex : '#FFFFFF'); 
const fg = computed(() => accentColor.value ? accentColor.value.hex : '#000000'); 

const repoData = useState('repoData', () => ({
  title: 'palettePilot',
  description: 'Explore Palette Pilot magic: transforming your images into color palettes and giving UI ideas. Perfect for creatives',
  language: 'Vue',
  stars: '1.2k',
  updated: 'Updated January 2024'
}))


</script>
<template>
  <article class="rounded-xl px-8 py-5 flex flex-col gap-y-2 font-semibold" :style="{backgroundColor: bg, color: fg}">
    <section class="flex flex-col gap-y-3">
      <div class="flex justify-between w-full items-center">
        <h2 class="font-bold text-2xl">{{repoData.title}}</h2>
        <NuxtLink to="https://github.com/linuxmobile/palettePilot" target="_blank" class="rounded-lg px-3 py-1" :style="{backgroundColor: fg, color: bg}">★ Star</NuxtLink>
      </div>
      <p class="opacity-70">{{repoData.description}}</p>
    </section>
    <footer class="flex items-center justify-between gap-x-5 opacity-60">
      <p><span class="text-[#41B883]">●</span> {{repoData.language}}</p>
      <p>★ {{repoData.stars}}</p>
      <p>{{repoData.updated}}</p>
    </footer>
  </article>
</template>
