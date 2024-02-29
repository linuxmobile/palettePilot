import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

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
  /**
   * Represents the result of an upload operation to Cloudinary.
   * @typeParam T - The type of the upload response.
   */
  const uploadResult: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error !== undefined) reject(new Error(error.message))
          resolve(result)
        })
        .end(imageBase64)
    }
  )

  if (uploadResult === undefined) {
    throw new Error('Something went wrong uploading image to Cloudinary')
  }

  return uploadResult.secure_url
}
