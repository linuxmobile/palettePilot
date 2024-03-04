import { kv } from '@vercel/kv'
import { v2 as cloudinary } from 'cloudinary'
import { log } from '~/lib/logs'

cloudinary.api
  .delete_all_resources()
  .then(() => {
    log('info', '✅ Cloudinary resources deleted successfully')
  })
  .catch(error => {
    log(
      'error',
      `❌ Error while deleting Cloudinary resources: [${error.message.toUpperCase()}]`
    )
  })

kv.flushdb().then(() => {
  log('info', '✅ KV entries deleted successfully')
})
