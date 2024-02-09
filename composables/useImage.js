import ColorThief from "colorthief";

export const useImage = () => {
	const imageUrl = useState("imageUrl", () => null);
	const colors = useState("colors", () => []);

	const rgbToHex = (rgbArr) => {
		const hexParts = rgbArr.map(colorValue => {
		  const hexChunk = colorValue.toString(16);
			return hexChunk.length === 1 ? `0${hexChunk}` : hexChunk;
		})

		return `#${hexParts.join("")}`;
	};

	const setImageUrl = (newImageUrl) => {
		imageUrl.value = newImageUrl;
	};

	const extractColors = (imageSrc) => {
		const img = new Image();
		img.onload = () => {
			const colorThief = new ColorThief();
			const extractedColors = colorThief.getPalette(img, 5);
			colors.value = extractedColors.map(rgb => {
				return {
					hex: rgbToHex(rgb),
					rgb
				}
			})
		};	
		img.src = imageSrc;
		img.crossOrigin = "Anonymous";
	};

	return { imageUrl, colors, setImageUrl, extractColors };
};
