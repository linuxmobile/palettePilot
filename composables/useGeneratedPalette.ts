import {
	generateColorScale,
	generateIntegratedColorScale,
	paletteToString,
	type Palette,
} from "~/utils/colors";

/**
 * Generates and returns a palette based on the provided primary and accent color hex values.
 *
 * @param primaryColorHex - The hex value of the primary color.
 * @param accentColorHex - The hex value of the accent color.
 * @returns An object containing various computed palettes and their string representations.
 */
export function useGeneratedPalette(
	primaryColorHex: Ref<string>,
	accentColorHex: Ref<string>,
) {
	const integratedPalette: ComputedRef<Palette> = computed(() =>
		generateIntegratedColorScale(primaryColorHex.value, accentColorHex.value),
	);
	const primaryPalette: ComputedRef<Palette> = computed(() =>
		generateColorScale(primaryColorHex.value, "primary"),
	);
	const accentPalette: ComputedRef<Palette> = computed(() =>
		generateColorScale(accentColorHex.value, "accent"),
	);

	const primaryPaletteString: ComputedRef<string> = computed(() =>
		paletteToString(primaryPalette.value),
	);
	const accentPaletteString: ComputedRef<string> = computed(() =>
		paletteToString(accentPalette.value),
	);
	const integratedPaletteString: ComputedRef<string> = computed(() =>
		paletteToString(integratedPalette.value),
	);

	return {
		primaryPalette,
		accentPalette,
		integratedPalette,
		primaryPaletteString,
		accentPaletteString,
		integratedPaletteString,
	};
}
