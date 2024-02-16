import ColorThief from "colorthief";
import { rgbToHexConverter } from "~/utils/colors";
import { type ColorWithRgbAndHex } from "~/types/colors";

export const useImage = () => {
	const imageSrc = useState<string | null>("imageSrc", () => null);

	const setImageSrc = (newImageSrc: string): void => {
		imageSrc.value = newImageSrc;
	};

	const extractColors = (imageSrc: string): Promise<ColorWithRgbAndHex[]> => {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				const colorThief = new ColorThief();
				const getPaletteColors = colorThief.getPalette(img, 5);
				const imageColors = getPaletteColors.map((rgb: number[]) => ({
					hex: rgbToHexConverter(rgb),
					rgb,
				}));
				resolve(imageColors);
			};
			img.src = imageSrc;
			img.crossOrigin = "Anonymous";
		});
	};
	return { imageSrc, setImageSrc, extractColors };
};
