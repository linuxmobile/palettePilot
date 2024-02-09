import ColorThief from 'colorthief'

export const useImage = () => {
  const imageUrl = useState('imageUrl', () => null)
  const colors = useState('colors', () => [])

  const rgbToHex = colors =>
    colors.map(
      ([r, g, b]) =>
        `#${[r, g, b]
          .map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? `0${hex}` : hex
          })
          .join('')}`
    )

  const setImageUrl = newImageUrl => {
    imageUrl.value = newImageUrl
  }

  const extractColors = imageSrc => {
    const img = new Image()
    img.onload = () => {
      const colorThief = new ColorThief()
      const extractedColors = colorThief.getPalette(img, 5)
      const getDominant = colorThief.getColor(img)
      colors.value = rgbToHex(extractedColors)
    }
    img.src = imageSrc
    img.crossOrigin = 'Anonymous'
  }

  return { imageUrl, colors, setImageUrl, extractColors }
}
