import { type ColorWithRgbAndHex } from "~/types/colors";

export const useImageColors = () => {
	const imageColors = useState<ColorWithRgbAndHex[]>("colors", () => []);

	const setImageColors = (colors: ColorWithRgbAndHex[]) => {
		imageColors.value = colors
	}

	return { imageColors, setImageColors }
}