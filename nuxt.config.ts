export default defineNuxtConfig({
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
	modules: ["@unocss/nuxt", "nuxt-primevue", "@nuxtjs/color-mode"],
	unocss: {
		attributify: true,
	},
	css: ["@unocss/reset/tailwind.css"],
	colorMode: {
		preference: "system",
		fallback: "dark",
		classSuffix: "",
	},
	devtools: { enabled: true },
});
