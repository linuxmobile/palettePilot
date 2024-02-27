<script setup>
const { bg, fg } = useColors()

</script>
<template>
  <div class="relative">
    <img src="/working.webp" alt="working card example" class="w-full h-auto aspect-video object-cover rounded-xl min-h-xs" :style="{ backgroundColor: bg, color: fg }"/>
    <div class="w-full h-full rounded-xl top-0 inset-x-0 absolute" :style="{background: `linear-gradient(-90deg, rgba(0,0,0,0) 0%, ${bg})`}"></div>
    <div class="w-full h-full rounded-xl top-0 inset-x-o absolute z-10 px-8 py-5 flex flex-col gap-y-1" :style="{ color: fg }">
      <h4 class="text-4xl font-semibold">Work With Us</h4>
      <div>
        <p class="font-semibold">Sofia Devic CEO</p>
        <span>190.000 Clients</span>
      </div>
      <div class="w-full py-8 flex justify-between items-center absolute inset-x-0 -bottom-1 rounded-xl px-10" :style="{ backgroundColor: fg, color: bg }">
        <p><span class="font-bold">1st Awwwards</span> Company</p>
        <p><span class="font-bold">24,920</span> projects</p>
        <p>First <span class="font-bold">Remote Work</span></p>
      </div>
    </div>
  </div>
</template>
