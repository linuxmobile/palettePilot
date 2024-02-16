import ColorThief from "colorthief";
import { rgbToHexConverter } from "~/utils/colors";
import { type ColorWithRgbAndHex } from "~/types/colors";

export const useImage = () => {
	const imageSrc = useState<string | null>("imageSrc", () => null);
	const colors = useState<ColorWithRgbAndHex[]>("colors", () => []);

	const setImageSrc = (newImageSrc: string): void => {
		imageSrc.value = newImageSrc;
	};

	const extractColors = (imageSrc: string) => {
		return new Promise<void>((resolve) => {
			const img = new Image();
			img.onload = () => {
				const colorThief = new ColorThief();
				const getPaletteColors = colorThief.getPalette(img, 5);
				colors.value = getPaletteColors.map((rgb: number[]) => ({
					hex: rgbToHexConverter(rgb),
					rgb,
				}));
				resolve(); // Resuelve la promesa una vez que los colores se hayan extraído
			};
			img.src = imageSrc;
			img.crossOrigin = "Anonymous";
		});
	};
	return { imageSrc, colors, setImageSrc, extractColors };
};
