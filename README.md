# [Palette Pilot](https://palette-pilot.vercel.app/)

<img src="https://i.imgur.com/Fa2MDsZ.png" alt="Screenshot Capture of Palette Pilot App" width="900px" />

Palette Pilot is an open source project built with Nuxt.js that helps you extract the most relevant colors from an image. With Palette Pilot, you can easily drop or upload an image and instantly discover the five most prominent colors within it.

## Features

- Extract the 5 most relevant colors from an image
- Compare colors to check their contrast ratios
- Visualize color combinations with UI elements examples
- Export the generated palette to [TailwindCSS](https://tailwindcss.com/)

## Why Palette Pilot?

- Simplicity: Palette Pilot offers a user-friendly interface that makes it easy to extract colors and compare them.
- Efficiency: Save time by quickly identifying the most relevant colors within an image.
- Design-friendly: Whether you're a designer, developer, or enthusiast, Palette Pilot helps you pick colors that work harmoniously together.

## Run locally

- Clone the repository: `git clone https://github.com/linuxmobile/palettePilot.git`
- Navigate to the project directory: `cd palettePilot`
- Install dependencies: `bun install`
- Start the development server: `bun run dev` or `bun run dev -o` to directly visualize the project

## Environment variables

This project uses [Cloudinary SDK](https://cloudinary.com/documentation/cloudinary_sdks) to upload images and [Vercel KV](https://vercel.com/docs/storage/vercel-kv) to store the uploaded images' URLs as values and their respective generated hashes as keys.

If you want to generate palettes you would need to setup the following environment variables in a `.env` file located in the root of the project:

```
KV_URL = url
KV_REST_API_URL= url
KV_REST_API_TOKEN = apitoken
KV_REST_API_READ_ONLY_TOKEN = readonlytoken
CLOUDINARY_CLOUD_NAME = cloudname
CLOUDINARY_API_KEY = apikey
CLOUDINARY_API_SECRET = apisecret
CLOUDINARY_URL = url
NUXT_PUBLIC_APP_URL = http://localhost:3000
```

You need to create a [Cloudinary](https://cloudinary.com/) account and a [Vercel](https://vercel.com/) account in order to setup a Vercel KV store.

## License

Palette Pilot is released under the MIT License.
