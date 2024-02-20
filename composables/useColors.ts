import { computed } from 'vue'
import { useGlobalGenericState } from '~/utils/useGlobalGenericState'
import { getContrastRatio } from '~/utils/colors'
import { type ColorWithRgbAndHex } from '~/types/colors'

export const useColors = () => {
  const [imageColors, setImageColors] = useGlobalGenericState<
    ColorWithRgbAndHex[]
  >('imageColors', [])

  const [primaryColor, selectPrimaryColor] = useGlobalGenericState(
    'primaryColor',
    imageColors.value.at(0)
  )
  const [accentColor, selectAccentColor] = useGlobalGenericState(
    'accentColor',
    imageColors.value.at(1)
  )

  const contrastRatio = computed(() => {
    if (primaryColor.value === undefined || accentColor.value === undefined)
      return
    return getContrastRatio(
      primaryColor.value.rgb,
      accentColor.value.rgb
    ).toFixed(2)
  })

  const swapColors = (): void => {
    ;[primaryColor.value, accentColor.value] = [
      accentColor.value,
      primaryColor.value
    ]
  }

  return {
    imageColors,
    primaryColor,
    accentColor,
    contrastRatio,
    selectPrimaryColor,
    selectAccentColor,
    setImageColors,
    swapColors
  }
}
