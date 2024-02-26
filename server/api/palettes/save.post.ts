import { uploadImageFromBase64 } from '~/lib/cloudinary'
import { kv } from '~/lib/db'
import { hashImageBase64 } from '~/utils/images'
import { log } from '~/lib/logs'
import { MAX_BYTES_SIZE } from '~/consts/files'

export default eventHandler(async event => {
  const formData = await readMultipartFormData(event)
  const file = formData?.at(0)

  if (file === undefined) {
    log('error', '❌ No image provided...')
    throw createError({
      statusCode: 400,
      statusMessage: 'No image provided!'
    })
  }

  const fileBytes = file.data.buffer.byteLength

  if (fileBytes > MAX_BYTES_SIZE) {
    log('error', `❌ Image size too big... [${fileBytes} bytes]`)
    throw createError({
      statusCode: 400,
      statusMessage: 'Image size too big! Max size: 4.5 MB'
    })
  }

  const base64Data = Buffer.from(file.data).toString('base64')
  const base64Image = `data:${file.type};base64,${base64Data}`
  const imageHash = hashImageBase64(base64Image)

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
    'info',
    '💾 Image does not exist. Uploading it and saving it in KV store...'
  )

  try {
    const imageUrl = await uploadImageFromBase64(base64Image)
    await kv.setItem(imageHash, imageUrl)
    log('info', '✅ Image uploaded and saved in KV store...')

    return {
      imageHash,
      imageUrl
    }
  } catch (error) {
    if (error instanceof Error) {
      log(
        'error',
        `❌ Error while uploading image to Cloudinary and saving it in KV store... [${error.message.toUpperCase()}]`
      )
      throw createError({
        statusCode: 500,
        statusMessage: 'Could not generate palette. Try again!'
      })
    }
  }
})
