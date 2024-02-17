<script setup>
import { useColorSelection } from '~/composables/useColorSelection.ts'

const {accentColor, primaryColor} = useColorSelection()

const bg = computed(() => primaryColor.value ? primaryColor.value.hex : '#FFFFFF'); 
const fg = computed(() => accentColor.value ? accentColor.value.hex : '#000000'); 
</script>
<template>
  <article class="rounded-xl px-8 py-5 font-semibold" :style="{backgroundColor: bg, color: fg}">
    <section class="w-full flex justify-between items-start">
      <p class="opacity-70"><span class="text-green-400 text-xs">●</span> Listen Now</p>
      <div class="py-3 px-4 aspect-square rounded-lg" :style="{backgroundColor: fg, color: bg}">▶</div>
    </section>
    <section>
      <p class="text-lg max-w-xs text-balance">Welcome To the Jungle</p>
    </section>
  </article>
</template>
