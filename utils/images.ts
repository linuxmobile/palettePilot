import { createHash } from 'node:crypto'

export function hashImageBase64(imageBase64: string) {
  const hash = createHash('sha256')
  hash.update(imageBase64)
  const imageHash = hash.digest('hex')
  return imageHash
}
