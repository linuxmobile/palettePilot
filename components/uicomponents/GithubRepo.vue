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
  <article class="border border-gray-600 rounded-xl px-8 py-5 flex flex-col gap-y-2" :style="{backgroundColor: bg, color: fg}">
    <section class="flex flex-col">
      <div class="flex justify-between w-full items-center">
        <h2 class="font-bold">{{repoData.title}}</h2>
        <div class="rounded-lg px-3 py-1 border" :style="{borderColor:fg}">★ Star</div>
      </div>
      <p class="opacity-70">{{repoData.description}}</p>
    </section>
    <footer class="flex gap-x-5 opacity-80">
      <p><span class="text-[#41B883]">●</span> {{repoData.language}}</p>
      <p>★ {{repoData.stars}}</p>
      <p>{{repoData.updated}}</p>
    </footer>
  </article>
</template>
