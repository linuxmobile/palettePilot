import { uploadImageFromBase64 } from '~/lib/cloudinary'
import { kv } from '~/lib/db'
import { hashImageBase64 } from '~/utils/images'
import { log } from '~/lib/logs'

export default eventHandler(async event => {
  const { imageBase64 }: { imageBase64: string } = await readBody(event)
  const imageHash = hashImageBase64(imageBase64)

  log('info', `⏱ Saving image with hash: ${imageHash}...`)
  const storedImageUrl = await kv.getItem(imageHash)

  if (storedImageUrl !== null) {
    log('info', '✅ Image already exists. Returning it as is from KV store...')
    return {
      imageHash,
      imageUrl: storedImageUrl
    }
  }

  log(
    'warn',
    '⚠️ Image does not exist. Uploading it and saving it in KV store...'
  )

  let imageUrl = ''

  try {
    imageUrl = await uploadImageFromBase64(imageBase64)
    await kv.setItem(imageHash, imageUrl)
    log('info', '✅ Image uploaded and saved in KV store...')
  } catch {
    log(
      'error',
      '❌ Error while uploading image to Cloudinary and saving it in KV store...'
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not generate palette. Try again!'
    })
  }

  return {
    imageHash,
    imageUrl
  }
})
