import ColorThief from 'colorthief'
import chroma from 'chroma-js'
import { type ColorWithRgbAndHex } from '~/types/colors'

export function getLuminance(rgb: number[]) {
  // Reference on how these values are being
  // computed: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
  const RED = 0.2126
  const GREEN = 0.7152
  const BLUE = 0.0722
  const GAMMA = 2.4

  const [r, g, b] = rgb.map(colorValue => {
    colorValue /= 255
    return colorValue <= 0.03928
      ? colorValue / 12.92
      : Math.pow((colorValue + 0.055) / 1.055, GAMMA)
  })

  return RED * r + GREEN * g + BLUE * b
}

export function getContrastRatio(firstRgb: number[], secondRgb: number[]) {
  const firstLuminance = getLuminance(firstRgb)
  const secondLuminance = getLuminance(secondRgb)
  const brightest = Math.max(firstLuminance, secondLuminance)
  const darkest = Math.min(firstLuminance, secondLuminance)
  return (brightest + 0.05) / (darkest + 0.05)
}

export function rgbToHexConverter(rgbArr: number[]): string {
  const hexParts = rgbArr.map((colorValue: number) => {
    const hexChunk = colorValue.toString(16)
    return hexChunk.length === 1 ? `0${hexChunk}` : hexChunk
  })

  return `#${hexParts.join('')}`
}

export function extractColorsFromImage(
  imageSrc: string
): Promise<ColorWithRgbAndHex[]> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const colorThief = new ColorThief()
      const getPaletteColors = colorThief.getPalette(img, 5)
      const imageColors = getPaletteColors.map((rgb: number[]) => ({
        hex: rgbToHexConverter(rgb),
        rgb
      }))
      resolve(imageColors)
    }
    img.src = imageSrc
    img.crossOrigin = 'Anonymous'
  })
}

export function constructColorObject(scale: string[]) {
  const BASE_LEVELS = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
  ] as const

  return scale.reduce((acc: ColorPalette, color: string, index: number) => {
    acc[BASE_LEVELS[index]] = color
    return acc
  }, {})
}

export type ColorPalette = Record<string, string>
export type Palette = Record<string, ColorPalette>

export function generateColorScale(
  baseColorHex: string,
  prefix: string
): Palette {
  const scale = chroma
    .scale([
      chroma(baseColorHex).brighten(2.0),
      baseColorHex,
      chroma(baseColorHex).darken(3.5)
    ])
    .mode('lab')
    .colors(11)

  const colorObject = constructColorObject(scale)
  return { [prefix]: colorObject }
}

export function generateIntegratedColorScale(
  primaryColorHex: string,
  accentColorHex: string
): Palette {
  const primary = chroma(primaryColorHex)
  const accent = chroma(accentColorHex)
  const startColor = primary.luminance() > accent.luminance() ? primary : accent
  const endColor = primary.luminance() <= accent.luminance() ? primary : accent
  const scale = chroma.scale([startColor, endColor]).mode('lab').colors(11)
  const colorObject = constructColorObject(scale)

  return { integrated: colorObject }
}

export function paletteToString(palette: Palette): string {
  const [paletteName, colors] = Object.entries(palette)[0]

  let paletteStr = `"${paletteName}": {\n`
  Object.entries(colors).forEach(([level, color]) => {
    paletteStr += `    "${level}": "${color}",\n`
  })
  paletteStr = paletteStr.slice(0, -2) + '\n  }'

  return paletteStr
}
