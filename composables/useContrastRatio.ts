import { computed, type Ref } from "vue";
import { getContrastRatio } from "~/utils/colors";
import { type RgbColor } from "~/types/colors";

type ColorToCompare = Ref<RgbColor | null>

export const useContrastRatio = (
	primaryColor: ColorToCompare,
	accentColor: ColorToCompare
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
