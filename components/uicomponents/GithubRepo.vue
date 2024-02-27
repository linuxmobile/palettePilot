<script setup>
const { bg, fg } = useColors()
const REPO_DATA = {
  title: 'palettePilot',
  description:
    'Explore Palette Pilot magic: transforming your images into color palettes and giving UI ideas. Perfect for creatives',
  language: 'Vue',
  stars: '1.2k',
  updated: 'Updated January 2024'
}
</script>
<template>
  <article
    class="rounded-xl px-8 py-5 flex flex-col gap-y-2 font-semibold"
    :style="{ backgroundColor: bg, color: fg }"
  >
    <section class="flex flex-col gap-y-3">
      <div class="flex justify-between w-full items-center">
        <h2 class="font-bold text-2xl">{{ REPO_DATA.title }}</h2>
        <NuxtLink
          to="https://github.com/linuxmobile/palettePilot"
          target="_blank"
          class="rounded-lg px-3 py-1"
          :style="{ backgroundColor: fg, color: bg }"
          >★ Star</NuxtLink
        >
      </div>
      <p class="opacity-70">{{ REPO_DATA.description }}</p>
    </section>
    <footer class="flex items-center justify-between gap-x-5 opacity-60">
      <p><span class="text-[#41B883]">●</span> {{ REPO_DATA.language }}</p>
      <p>★ {{ REPO_DATA.stars }}</p>
      <p>{{ REPO_DATA.updated }}</p>
    </footer>
  </article>
</template>
