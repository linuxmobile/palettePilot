import { useGlobalGenericState } from '~/utils/useGlobalGenericState'

/**
 * Custom hook for managing image source state.
 * @returns An object containing the image source and a function to set the image source.
 */
export const useImage = () => {
  const [imageSrc, setImageSrc] = useGlobalGenericState('imageSrc', '')
  return { imageSrc, setImageSrc }
}
