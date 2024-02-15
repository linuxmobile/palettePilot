import { computed, type Ref } from "vue";
import { getContrastRatio } from "~/utils/colors";

type RGBColor = Ref<{ rgb: number[] }>;

export const useContrastRatio = (
	primaryColor: RGBColor,
	accentColor: RGBColor,
) => {
	const contrastRatio = computed(() => {
		if (!primaryColor.value || !accentColor.value) return;
		return getContrastRatio(
			primaryColor.value.rgb,
			accentColor.value.rgb,
		).toFixed(2);
	});

	return {
		contrastRatio,
	};
};
