import { uploadImageFromBase64 } from '~/lib/cloudinary'
import { kv } from '~/lib/db'
import { hashImageBase64 } from '~/utils/images'
import { log } from '~/lib/logs'
import { MAX_BYTES_SIZE } from '~/consts/files'
import { type ColorWithRgbAndHex } from '~/types/colors'
import { type KvGetItemResponse } from '~/types/api'

export default eventHandler(async event => {
  const formData = await readMultipartFormData(event)
  const file = formData?.at(0)
  const colorsData = formData?.at(1)?.data

  if (file === undefined) {
    log('error', '❌ No image provided...')
    throw createError({
      statusCode: 400,
      statusMessage: 'No image provided!'
    })
  }

  if (colorsData === undefined) {
    log('error', '❌ No colors provided...')
    throw createError({
      statusCode: 400,
      statusMessage: 'No colors provided!'
    })
  }

  const colorsFromReq: ColorWithRgbAndHex[] = JSON.parse(colorsData.toString())

  if (!Array.isArray(colorsFromReq)) {
    log('error', '❌ Expected an array of rgb and hex color objects...')
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid colors format!'
    })
  }

  const fileBytes = file.data.buffer.byteLength

  if (fileBytes > MAX_BYTES_SIZE) {
    log('error', `❌ Image size too big... [${fileBytes} bytes]`)
    throw createError({
      statusCode: 400,
      statusMessage: `Image size too big! Max size: ${
        MAX_BYTES_SIZE / 1024 / 1024
      } MB`
    })
  }

  const base64Image = file.data.toString()
  const imageHash = hashImageBase64(base64Image)

  const imageData = (await kv.getItem(imageHash).catch(error => {
    if (error instanceof Error) {
      log(
        'error',
        `❌ Error while getting image data from KV store: [${error.message.toUpperCase()}]`
      )
      throw createError({
        statusCode: 500,
        statusMessage: 'Could not process the request. Try again!'
      })
    }
  })) as KvGetItemResponse | null

  if (imageData !== null) {
    log(
      'info',
      '✅ Image data already exists. Returning it as is from KV store...'
    )
    const { url, colors } = imageData

    return {
      imageHash,
      imageUrl: url,
      colors
    }
  }

  try {
    log(
      'info',
      '💾 Image data does not exist. Uploading image and saving its data in KV store...'
    )
    const imageUrl = await uploadImageFromBase64(base64Image)
    await kv.setItem(imageHash, { url: imageUrl, colors: colorsFromReq })

    log('info', '✅ Image data saved in KV store...')

    return {
      imageHash,
      imageUrl,
      colors: colorsFromReq
    }
  } catch (error) {
    if (error instanceof Error) {
      log(
        'error',
        `❌ Error while saving image data: [${error.message.toUpperCase()}]`
      )
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not process the request. Try again!'
    })
  }
})
