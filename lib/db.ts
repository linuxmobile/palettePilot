if (import.meta.browser) {
  throw new Error('KV functions can only be used server-side')
}

const config = useRuntimeConfig()

const KV_URL = config.kvUrl
const KV_REST_API_URL = config.kvRestApiUrl
const KV_REST_API_TOKEN = config.kvRestApiToken
const KV_REST_API_READ_ONLY_TOKEN = config.kvRestApiReadOnlyToken

if (
  KV_URL === '' ||
  KV_REST_API_URL === '' ||
  KV_REST_API_TOKEN === '' ||
  KV_REST_API_READ_ONLY_TOKEN === ''
) {
  throw new Error('Missing KV env variables')
}

export const kv = useStorage('data')
