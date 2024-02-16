import { useGlobalGenericState } from "~/utils/useGlobalGenericState";
import { type ColorWithRgbAndHex } from "~/types/colors";

export const useColorSelection = (initialColors: ColorWithRgbAndHex[]) => {
	const [primaryColor, selectPrimaryColor] = useGlobalGenericState("primaryColor", initialColors?.at(0));
	const [accentColor, selectAccentColor] = useGlobalGenericState("accentColor", initialColors?.at(1));
	
	const swapColors = (): void => {
		[primaryColor.value, accentColor.value] = [
			accentColor.value,
			primaryColor.value,
		];
	};

	return {
		primaryColor,
		accentColor,
		selectPrimaryColor,
		selectAccentColor,
	  swapColors,
	};
};
