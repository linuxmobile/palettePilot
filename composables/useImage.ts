import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

export const useImage = () => {
	const [imageSrc, setImageSrc] = useGlobalGenericState("imageSrc", "")
	return { imageSrc, setImageSrc }
};
