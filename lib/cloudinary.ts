import { v2 as cloudinary } from 'cloudinary'

if (import.meta.browser) {
  throw new Error('Cloudinary functions can only be used server-side')
}

const config = useRuntimeConfig()

const CLOUD_NAME = config.cloudinaryCloudName
const API_KEY = config.cloudinaryApiKey
const API_SECRET = config.cloudinaryApiSecret

if (CLOUD_NAME === '' || API_KEY === '' || API_SECRET === '') {
  throw new Error('Missing Cloudinary env variables')
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

export async function uploadImageFromBase64(imageBase64: string) {
  const { secure_url: imageUrl } = await cloudinary.uploader
    .upload(imageBase64)
    .catch(() => {
      throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong uploading the image. Try again!'
      })
    })

  return imageUrl
}
