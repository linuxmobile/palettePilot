import ColorThief from 'colorthief'

type Color = {
  hex: string
  rgb: number[]
}

export const useImage = () => {
  const imageUrl = useState<string | null>('imageUrl', () => null)
  const colors = useState<Color[]>('colors', () => [])

  const rgbToHex = (rgbArr: number[]): string => {
    const hexParts = rgbArr.map((colorValue: number) => {
      const hexChunk = colorValue.toString(16)
      return hexChunk.length === 1 ? `0${hexChunk}` : hexChunk
    })

    return `#${hexParts.join('')}`
  }

  const setImageUrl = (newImageUrl: string): void => {
    imageUrl.value = newImageUrl
  }

  const extractColors = (imageSrc: string): void => {
    const img = new Image()
    img.onload = () => {
      const colorThief = new ColorThief()
      const extractedColors = colorThief.getPalette(img, 5)
      colors.value = extractedColors.map((rgb: number[]) => {
        return {
          hex: rgbToHex(rgb),
          rgb
        }
      })
    }
    img.src = imageSrc
    img.crossOrigin = 'Anonymous'
  }

  return { imageUrl, colors, setImageUrl, extractColors }
}
