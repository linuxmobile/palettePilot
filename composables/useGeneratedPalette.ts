import chroma from 'chroma-js'

interface ColorPalette {
  [level: number]: string
}

interface Palette {
  [prefix: string]: ColorPalette
}

function generateColorScale(baseColorHex: string, prefix: string): Palette {
  const scale = chroma
    .scale([
      chroma(baseColorHex).brighten(2.0),
      baseColorHex,
      chroma(baseColorHex).darken(3.5)
    ])
    .mode('lab')
    .colors(11)

  const colorObject = scale.reduce(
    (acc: ColorPalette, color: string, index: number) => {
      const baseLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
      acc[baseLevels[index]] = color
      return acc
    },
    {}
  )

  return { [prefix]: colorObject }
}

function generateIntegratedColorScale(
  primaryColorHex: string,
  accentColorHex: string
): Palette {
  const primary = chroma(primaryColorHex)
  const accent = chroma(accentColorHex)

  const startColor = primary.luminance() > accent.luminance() ? primary : accent
  const endColor = primary.luminance() <= accent.luminance() ? primary : accent

  const scale = chroma.scale([startColor, endColor]).mode('lab').colors(11)

  const colorObject = scale.reduce(
    (acc: ColorPalette, color: string, index: number) => {
      const baseLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
      acc[baseLevels[index]] = color
      return acc
    },
    {}
  )

  return { integrated: colorObject }
}

export function useGeneratedPalette(
  primaryColorHex: Ref<string>,
  accentColorHex: Ref<string>
) {
  const integratedPalette: ComputedRef<Palette> = computed(() =>
    generateIntegratedColorScale(primaryColorHex.value, accentColorHex.value)
  )
  const primaryPalette: ComputedRef<Palette> = computed(() =>
    generateColorScale(primaryColorHex.value, 'primary')
  )
  const accentPalette: ComputedRef<Palette> = computed(() =>
    generateColorScale(accentColorHex.value, 'accent')
  )

  function paletteToString(palette: ComputedRef<Palette>): string {
    const paletteObject = palette.value
    const [paletteName, colors] = Object.entries(paletteObject)[0]

    let paletteStr = `"${paletteName}": {\n`
    Object.entries(colors).forEach(([level, color]) => {
      paletteStr += `    "${level}": "${color}",\n`
    })
    paletteStr = paletteStr.slice(0, -2) + '\n  }'

    return paletteStr
  }

  const primaryPaletteString: ComputedRef<string> = computed(() =>
    paletteToString(primaryPalette)
  )
  const accentPaletteString: ComputedRef<string> = computed(() =>
    paletteToString(accentPalette)
  )
  const integratedPaletteString: ComputedRef<string> = computed(() =>
    paletteToString(integratedPalette)
  )

  return {
    primaryPalette,
    accentPalette,
    integratedPalette,
    primaryPaletteString,
    accentPaletteString,
    integratedPaletteString
  }
}
