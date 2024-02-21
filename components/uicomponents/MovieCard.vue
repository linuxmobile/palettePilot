<script setup>
import { useColors } from '~/composables/useColors.ts'

const { bg, fg } = useColors()
</script>
<template>
  <div class="rounded-xl flex gap-y-2 relative" :style="{ backgroundColor: bg, color: fg }">
    <img src="/movie.webp" alt="Movie Image example" class="w-full rounded-l-xl aspect-square object-cover">
    <div class="rounded-r-xl px-8 py-5 flex flex-col gap-y-3" :style="{ backgroundColor: bg, color: fg }">
      <p class="text-sm opacity-80">Latest Movie News</p>
      <h4 class="text-xl font-semibold">We are shooting a movie and we want to hire you</h4>
      <div class="flex flex-col pt-6">
        <p class="font-semibold">Alex Watson</p>
        <p class="text-sm">Apr 17, 2023</p>
      </div>
    </div>
  </div>
</template>
