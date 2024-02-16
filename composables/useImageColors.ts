import { useGlobalGenericState } from "~/utils/useGlobalGenericState";
import { type ColorWithRgbAndHex } from "~/types/colors";

export const useImageColors = () => {
	const [imageColors, setImageColors] = useGlobalGenericState<ColorWithRgbAndHex[]>("imageColors", [])
	return { imageColors, setImageColors }
}