import { useGlobalGenericState } from '~/utils/useGlobalGenericState'

export const useGeneratingPalette = () => {
  const [generatingPalette, setGeneratingPalette] = useGlobalGenericState(
    'generatingPalette',
    false
  )

  return { generatingPalette, setGeneratingPalette }
}
