type Color = {
	hex: string;
	rgb: number[];
};

export const useColorSelection = (initialColors = []) => {
	const primaryColor = useState<Color | null>("primaryColor", () =>
		initialColors.length > 0 ? initialColors[0] : null,
	);
	const accentColor = useState<Color | null>("accentColor", () =>
		initialColors.length > 1 ? initialColors[1] : null,
	);

	const selectPrimaryColor = (color: Color): void => {
		primaryColor.value = color;
	};

	const selectAccentColor = (color: Color): void => {
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
