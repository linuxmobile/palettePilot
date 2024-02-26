export default defineNuxtConfig({
  site: {
    url: 'https://palette-pilot.vercel.app/',
    name: 'Palette Pilot - Generate Awesome Color Palette for you UI',
    description:
      'Explore Palette Pilot magic: transforming your images into color palettes and giving UI ideas. Perfect for creatives',
    defaultLocale: 'en'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  nitro: {
    storage: {
      data: { driver: 'vercelKV' }
    }
  },
  runtimeConfig: {
    kvUrl: import.meta.env.KV_URL,
    kvRestApiUrl: import.meta.env.KV_REST_API_URL,
    kvRestApiToken: import.meta.env.KV_REST_API_TOKEN,
    kvRestApiReadOnlyToken: import.meta.env.KV_REST_API_READ_ONLY_TOKEN,
    cloudinaryUrl: import.meta.env.CLOUDINARY_URL,
    cloudinaryCloudName: import.meta.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: import.meta.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: import.meta.env.CLOUDINARY_API_SECRET
  },
  modules: [
    '@unocss/nuxt',
    'nuxt-primevue',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo'
  ],
  unocss: {
    attributify: true
  },
  css: ['@unocss/reset/tailwind.css'],
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: ''
  },
  devtools: { enabled: true },
  primevue: {
    directives: {
      include: ['Tooltip']
    }
  }
})
