import { type ColorWithRgbAndHex } from "~/types/colors";

export const useColorSelection = (initialColors: ColorWithRgbAndHex[]) => {
	const primaryColor = useState<ColorWithRgbAndHex | undefined>("primaryColor", () => initialColors?.[0]);
	const accentColor = useState<ColorWithRgbAndHex | undefined>("accentColor", () => initialColors?.[1]);

	const selectPrimaryColor = (color: ColorWithRgbAndHex): void => {
		primaryColor.value = color;
	};

	const selectAccentColor = (color: ColorWithRgbAndHex): void => {
		accentColor.value = color;
	};

	const swapColors = (): void => {
		[primaryColor.value, accentColor.value] = [
			accentColor.value,
			primaryColor.value,
		];
	};

	return {
		swapColors,
		selectPrimaryColor,
		selectAccentColor,
		primaryColor,
		accentColor,
	};
};
