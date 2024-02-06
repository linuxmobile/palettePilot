export default defineNuxtConfig({
	modules: ["@unocss/nuxt", "nuxt-primevue"],
	unocss: {
		attributify: true,
		presetWind: true,
	},
	devtools: { enabled: true },
});
