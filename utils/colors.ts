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
