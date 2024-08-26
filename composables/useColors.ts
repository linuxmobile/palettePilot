import { useGlobalGenericState } from "~/utils/useGlobalGenericState";
import { getContrastRatio } from "~/utils/colors";
import { type ColorWithRgbAndHex } from "~/types/colors";

/**
 * Custom hook for managing colors in the application.
 * It provides functionality to select primary and accent colors,
 * calculate contrast ratio, and swap colors.
 *
 * @returns An object containing the following properties:
 *   - imageColors: An array of ColorWithRgbAndHex objects representing the image colors.
 *   - primaryColor: The selected primary color.
 *   - accentColor: The selected accent color.
 *   - contrastRatio: The contrast ratio between the primary and accent colors.
 *   - bg: The background color in hexadecimal format.
 *   - fg: The foreground color in hexadecimal format.
 *   - selectPrimaryColor: A function to select the primary color.
 *   - selectAccentColor: A function to select the accent color.
 *   - setImageColors: A function to set the image colors.
 *   - swapColors: A function to swap the primary and accent colors.
 */
export const useColors = () => {
	const [imageColors, setImageColors] = useGlobalGenericState<
		ColorWithRgbAndHex[]
	>("imageColors", []);

	const [primaryColor, selectPrimaryColor] = useGlobalGenericState(
		"primaryColor",
		imageColors.value.at(0),
	);
	const [accentColor, selectAccentColor] = useGlobalGenericState(
		"accentColor",
		imageColors.value.at(1),
	);

	const contrastRatio = computed(() => {
		if (!primaryColor.value || !accentColor.value) return;
		return getContrastRatio(
			primaryColor.value.rgb,
			accentColor.value.rgb,
		).toFixed(2);
	});

	const bg = computed(() => primaryColor?.value?.hex ?? "#000000");
	const fg = computed(() => accentColor?.value?.hex ?? "#ffffff");

	const swapColors = (): void => {
		[primaryColor.value, accentColor.value] = [
			accentColor.value,
			primaryColor.value,
		];
	};

	return {
		imageColors,
		primaryColor,
		accentColor,
		contrastRatio,
		bg,
		fg,
		selectPrimaryColor,
		selectAccentColor,
		setImageColors,
		swapColors,
	};
};
