<script setup>
import { useColorSelection } from '~/composables/useColorSelection.ts'

const {accentColor, primaryColor} = useColorSelection()

const bg = computed(() => primaryColor.value ? primaryColor.value.hex : '#FFFFFF'); 
const fg = computed(() => accentColor.value ? accentColor.value.hex : '#000000'); 

const social = ['LinkedIn', 'Dribbble', 'Behance', 'Twitter', 'Unsplash', 'Instagram'];
</script>
<template>
  <main class="pt-12 pb-6 min-h-screen max-h-100dvh w-full px-3 pr-4 overflow-scroll font-semibold select-none">
    <header class="w-full h-14 bg-gray-200 dark:bg-neutral-900 rounded-t-2xl border-b border-gray-400 dark:border-neutral-600 flex items-center gap-x-2 pl-5 [&>div]:size-4 [&>div]:rounded-full">
      <div class="bg-red-400"></div>
      <div class="bg-yellow-400"></div>
      <div class="bg-green-400"></div>
    </header>
    <section class="w-full min-h-screen rounded-b-2xl bg-gray-200 dark:bg-neutral-900 px-10 pt-6">
      <main class="grid grid-cols-12 gap-2">
        <header class="col-span-12 w-full flex items-start justify-between py-4 px-10 rounded-full" :style="{backgroundColor: bg, color: fg}">
          <h3>jenny wilson.</h3>
          <div class="flex items-center gap-x-16">
            <p>home.</p>
            <p>works.</p>
            <p>about.</p>
          </div>
        </header>
        <article class="col-span-7 py-4 px-10 rounded-3xl text-5xl leading-normal" :style="{backgroundColor: bg, color: fg}">
          <img src="https://uploads-ssl.webflow.com/63fbd08ddcf51344a63f9add/63fbd08ddcf5133a563f9af5_Avatar.png" class="size-20 rounded-full">
          <p>jenny wilson is a digital product designer <span class="opacity-60">currently designing at acme.</span></p>
        </article>
        <article class="col-span-5 py-4 px-10 rounded-3xl text-5xl grid place-content-center text-center gap-y-8" :style="{backgroundColor: bg, color: fg}">
          <p>Have a project in mind?</p>
          <span class="rounded-full px-6 py-3" :style="{backgroundColor: fg, color: bg}">hey@jenny.com</span>
        </article>
        <p
          v-for="(socialName, index) in social"
          :key="index"
          class="col-span-2 py-4 px-10 rounded-full text-lg text-center lowercase"
          :style="{backgroundColor: bg, color: fg}">
          {{socialName}}.
        </p>
        <article class="col-span-5 py-4 px-10 rounded-3xl text-5xl leading-normal flex items-end justify-start" :style="{backgroundColor: bg, color: fg}">
          <p class="max-w-xs text-balance">Based in Brookly, New York <span>GMT-5</span></p>
        </article>
        <article class="col-span-7 py-16 px-10 rounded-3xl text-5xl" :style="{backgroundColor: bg, color: fg}">
          <p>As a digital designer, I specialize in creating unique visual identities for digital products. <span class="opacity-60">I believe that a catchy design starts with common values, open communication, and respect for your audience.</span></p>
        </article>
        <footer class="col-span-12 py-4 px-10 rounded-full text-lg flex items-center justify-between w-full" :style="{backgroundColor: bg, color: fg}">
          <p>jenny wilson.</p>
          <p class="opacity-70">© 2023 Stealth Ltd. No Rights Reserved.</p>
        </footer>
      </main>
    </section>
  </main>
</template>
