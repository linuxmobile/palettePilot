export default defineNuxtConfig({
	site: {
		url: "https://palette-pilot.vercel.app/",
		name: "Palette Pilot - Generate Awesome Color Palette for you UI",
		description:
			"Explore Palette Pilot magic: transforming your images into color palettes and giving UI ideas. Perfect for creatives",
		defaultLocale: "en",
	},
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
	modules: [
		"@unocss/nuxt",
		"nuxt-primevue",
		"@nuxtjs/color-mode",
		"@nuxtjs/seo",
	],
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
	primevue: {
		directives: {
			include: ["Tooltip"],
		},
	},
});
