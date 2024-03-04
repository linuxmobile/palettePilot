import { kv } from '~/lib/db'
import { log } from '~/lib/logs'
import { type ColorWithRgbAndHex } from '~/types/colors'
import { type KvGetItemResponse } from '~/types/api'

interface Params {
  hash?: string
}

interface ApiResponse {
  imageUrl: string
  colors: ColorWithRgbAndHex[]
}

export default eventHandler(async (event): Promise<ApiResponse> => {
  const params: Params | undefined = event.context.params
  log('info', `⏱ Retrieving image data associated to hash: ${params?.hash}...`)

  const imageData = (await kv.getItem(params?.hash ?? '').catch(error => {
    if (error instanceof Error) {
      log(
        'error',
        `❌ Something went wrong retrieving the image data from KV store...[${error.message.toUpperCase()}]`
      )
      throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong... Try again!'
      })
    }
  })) as KvGetItemResponse | null

  if (imageData === null) {
    log('error', '❌ Image data not found in KV store...')
    throw createError({
      statusCode: 404,
      statusMessage: 'No data found for this palette. Try creating one!'
    })
  }

  const { url, colors } = imageData

  log('info', '✅ Image data found. Returning it from KV store...')

  return {
    imageUrl: url,
    colors
  }
})
