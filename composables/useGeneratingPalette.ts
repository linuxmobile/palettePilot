import { useGlobalGenericState } from '~/utils/useGlobalGenericState'

/**
 * Custom hook for generating palette.
 *
 * @returns {Object} - An object containing the generatingPalette state and the setGeneratingPalette function.
 */
export const useGeneratingPalette = () => {
  const [generatingPalette, setGeneratingPalette] = useGlobalGenericState(
    'generatingPalette',
    false
  )

  return { generatingPalette, setGeneratingPalette }
}
