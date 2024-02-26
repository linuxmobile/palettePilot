if (import.meta.browser) {
  throw new Error('KV functions can only be used server-side')
}

const KV_URL = process.env.KV_URL
const KV_REST_API_URL = process.env.KV_REST_API_URL
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN
const KV_REST_API_READ_ONLY_TOKEN = process.env.KV_REST_API_READ_ONLY_TOKEN

if (
  KV_URL === undefined ||
  KV_REST_API_URL === undefined ||
  KV_REST_API_TOKEN === undefined ||
  KV_REST_API_READ_ONLY_TOKEN === undefined
) {
  throw new Error('Missing KV env variables')
}

export const kv = useStorage('data')
