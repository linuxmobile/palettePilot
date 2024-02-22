<script setup>
import Logo from '~/icons/Logo.vue'
import Twitter from '~/icons/Twitter.vue'
import Github from '~/icons/Github.vue'
import Moon from '~/icons/Moon.vue'
import Sun from '~/icons/Sun.vue'

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}

const colorMode = useColorMode()

const toggleTheme = () => {
  const actualTheme = colorMode.value
  colorMode.value = actualTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
}
</script>

<template>
  <header
    class="w-full absolute z-10 top-0 flex items-center justify-between px-5 py-6 [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:gap-x-3 bg-gradient-to-b from-white via-white dark:from-black dark:via-black to-transparent"
  >
    <a href="/" class="flex flex-col sm:flex-row" aria-label="Home Page Link">
      <Logo class="size-5" />
      <p>Palette <span class="text-purple-600 font-semibold"> Pilot</span></p>
    </a>
    <div class="[&>a>svg]:size-6">
      <ClientOnly>
        <div
          class="inline-flex items-center p-[1px] rounded-3xl bg-orange-200 dark:bg-neutral-600/50 border dark:border-gray-600/60 border-orange-300"
        >
          <button
            v-for="t in Object.values(THEMES)"
            :key="t"
            class="cursor-pointer rounded-3xl p-2"
            :class="{ 'bg-white text-black': t === colorMode.value }"
            @click="toggleTheme"
            aria-label="Toggle theme"
          >
            <Moon v-if="t === THEMES.DARK" />
            <Sun v-else />
          </button>
        </div>
      </ClientOnly>
      <NuxtLink
        to="https://twitter.com/LinuDev"
        class="border border-gray-600/60 bg-gray-300/50 dark:border-neutral-600/70 rounded-md px-2 py-1 dark:bg-neutral-600/50"
        aria-label="Twitter Link"
        ><Twitter
      /></NuxtLink>
      <NuxtLink
        to="https://github.com/linuxmobile/palettePilot"
        class="border border-gray-600/60 bg-gray-300/50 dark:border-neutral-600/70 rounded-md px-2 py-1 dark:bg-neutral-600/50"
        aria-label="Github Repository Link"
        ><Github
      /></NuxtLink>
      <NuxtLink
        to="https://github.com/linuxmobile/palettePilot"
        class="border border-gray-600/60 bg-gray-300/50 dark:border-neutral-600/70 rounded-md px-2 py-1 dark:bg-neutral-600/50"
        aria-label="Github Repository Link"
        >0.1.0</NuxtLink
      >
    </div>
  </header>
</template>
