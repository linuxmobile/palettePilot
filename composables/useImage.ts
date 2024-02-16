export const useImage = () => {
	const imageSrc = useState<string | null>("imageSrc", () => null);

	const setImageSrc = (newImageSrc: string): void => {
		imageSrc.value = newImageSrc;
	};

	return { imageSrc, setImageSrc };
};
