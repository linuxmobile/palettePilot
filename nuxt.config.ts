export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  modules: ['@unocss/nuxt', 'nuxt-primevue'],
  unocss: {
    attributify: true
  },
  css: ['@unocss/reset/tailwind.css'],
  devtools: { enabled: true }
})
