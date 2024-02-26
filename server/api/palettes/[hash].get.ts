import { kv } from '~/lib/db'
import { log } from '~/lib/logs'

export default eventHandler(async event => {
  const params: { hash?: string } | undefined = event.context.params
  log('info', `⏱ Retrieving image with hash: ${params?.hash}...`)

  const storedImageUrl = await kv.getItem(params?.hash ?? '').catch(() => {
    log(
      'error',
      '❌ Something went wrong retrieving the image from KV store...'
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong... Try again!'
    })
  })

  if (storedImageUrl === null) {
    log('error', '❌ Image not found in KV store...')
    throw createError({
      statusCode: 404,
      statusMessage: 'Image for this palette does not exist. Try creating one!'
    })
  }
  log('info', '✅ Image found. Retrieving from KV store...')

  return {
    imageUrl: storedImageUrl
  }
})
