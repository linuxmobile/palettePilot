import { kv } from "~/lib/db";
import { log } from "~/lib/logs";

interface Params {
	hash?: string;
}

interface Color {
	hex: string;
	rgb: number[];
}

interface ApiResponse {
	imageUrl: string | null;
	colors: Color[] | null;
}

export default eventHandler(async (event): Promise<ApiResponse> => {
	const params: Params | undefined = event.context.params;
	log("info", `⏱ Retrieving image with hash: ${params?.hash}...`);

	const storedImageUrl: string | null = (await kv
		.getItem(params?.hash ?? "")
		.catch(() => {
			log(
				"error",
				"❌ Something went wrong retrieving the image from KV store...",
			);
			throw createError({
				statusCode: 500,
				statusMessage: "Something went wrong... Try again!",
			});
		}))?.toString() ?? null;

	if (storedImageUrl === null) {
		log("error", "❌ Image not found in KV store...");
		throw createError({
			statusCode: 404,
			statusMessage: "Image for this palette does not exist. Try creating one!",
		});
	}

	const colorsKey: string = `${params?.hash}_colors`;
	const storedColorsString: string | null = (await kv
		.getItem(colorsKey)
		.catch(() => {
			log(
				"error",
				`❌ Something went wrong retrieving the colors from KV store for hash: ${colorsKey}...`,
			);
		}))?.toString() ?? null;

	let colors: Color[] | null = null;
	if (storedColorsString != null) {
		colors = storedColorsString.split(";").map((colorStr): Color => {
			const [hex, rgbStr] = colorStr.split("_");
			const rgb: number[] = rgbStr
				.split("-")
				.map((num): number => parseInt(num, 10));
			return { hex, rgb };
		});
	}

	log("info", "✅ Image and colors found. Retrieving from KV store...");

	return {
		imageUrl: storedImageUrl,
		colors,
	};
});
