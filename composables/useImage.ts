import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

export const useImage = () => {
	const [imageSrc, setImageSrc] = useGlobalGenericState<string | null>("imageSrc", null)
	return { imageSrc, setImageSrc }
};
