<script setup>
import Logo from '~/icons/Logo.vue'
import Twitter from '~/icons/Twitter.vue'
import Github from '~/icons/Github.vue'
</script>
<template>
  <header class="w-full absolute z-10 top-0 flex items-center justify-between px-5 py-6 [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:gap-x-3">
    <a href="/" class="">
      <Logo class="size-5"/>
      <p>Palette <span class="text-purple-400"> Pilot</span></p>
    </a>
    <div class="[&>a>svg]:size-7 [&>a>svg]:text-gray-500">
      <a href="https://twitter.com/LinuDev"><Twitter/></a>
      <a href="https://github.com/linuxmobile/palettePilot"><Github/></a>
    </div>
  </header>
</template>
