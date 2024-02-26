import { v2 as cloudinary } from 'cloudinary'

if (import.meta.browser) {
  throw new Error('Cloudinary functions can only be used server-side')
}

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

if (
  CLOUD_NAME === undefined ||
  API_KEY === undefined ||
  API_SECRET === undefined
) {
  throw new Error('Missing Cloudinary env variables')
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
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
