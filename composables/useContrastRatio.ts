import { computed } from 'vue'
import { getContrastRatio } from '~/utils/colors'

const MAX_NUMBER_COLORS_TO_COMPARE = 2

type ColorObject = {
  hex: string
  rgb: number[]
}

export const useContrastRatio = () => {
  const selectedColors = useState<ColorObject[]>('selectedColors', () => [])
  const contrastRatio = computed(() => {
    if (selectedColors.value.length < MAX_NUMBER_COLORS_TO_COMPARE) return
    return getContrastRatio(
      selectedColors.value[0].rgb,
      selectedColors.value[1].rgb
    ).toFixed(2)
  })

  const checkIfColorSelected = (color: ColorObject) => {
    return Boolean(selectedColors.value.find(c => c.hex === color.hex))
  }

  const markSelectedColor = (color: ColorObject) => {
    const colorExists = checkIfColorSelected(color)

    if (colorExists) {
      selectedColors.value = selectedColors.value.filter(
        c => c.hex !== color.hex
      )
      return
    }

    if (selectedColors.value.length >= MAX_NUMBER_COLORS_TO_COMPARE) {
      selectedColors.value.pop()
    }

    selectedColors.value.push(color)
  }

  return {
    selectedColors,
    markSelectedColor,
    contrastRatio,
    checkIfColorSelected
  }
}
