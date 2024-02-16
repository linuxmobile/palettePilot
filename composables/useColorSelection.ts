import { type ColorWithRgbAndHex } from "~/types/colors";

export const useColorSelection = (initialColors: ColorWithRgbAndHex[]) => {
	const primaryColor = useState<ColorWithRgbAndHex | null>("primaryColor", () =>
		initialColors.length > 0 ? initialColors[0] : null,
	);
	const accentColor = useState<ColorWithRgbAndHex | null>("accentColor", () =>
		initialColors.length > 1 ? initialColors[1] : null,
	);

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
