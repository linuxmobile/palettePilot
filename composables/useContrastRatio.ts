import { computed, type Ref } from 'vue'
import { getContrastRatio } from '~/utils/colors'
import { type RgbColor } from '~/types/colors'

type ColorToCompare = Ref<RgbColor | undefined>

export const useContrastRatio = (
  primaryColor: ColorToCompare,
  accentColor: ColorToCompare
) => {
  const contrastRatio = computed(() => {
    if (primaryColor.value === undefined || accentColor.value === undefined)
      return
    return getContrastRatio(
      primaryColor.value.rgb,
      accentColor.value.rgb
    ).toFixed(2)
  })

  return {
    contrastRatio
  }
}
