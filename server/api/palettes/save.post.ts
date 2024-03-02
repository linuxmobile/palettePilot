import { uploadImageFromBase64 } from "~/lib/cloudinary";
import { kv } from "~/lib/db";
import { hashImageBase64 } from "~/utils/images";
import { log } from "~/lib/logs";
import { MAX_BYTES_SIZE } from "~/consts/files";

export default eventHandler(async (event) => {
	const formData = await readMultipartFormData(event);
	const file = formData?.at(0);
	const colorsData = formData?.at(1)?.data;
	const colors =
		colorsData != null ? JSON.parse(colorsData.toString()) : undefined;

	if (file === undefined) {
		log("error", "❌ No image provided...");
		throw createError({
			statusCode: 400,
			statusMessage: "No image provided!",
		});
	}

	if (colors === undefined || !Array.isArray(colors)) {
		log("error", "❌ No colors provided...");
		throw createError({
			statusCode: 400,
			statusMessage: "No colors provided!",
		});
	}

	const fileBytes = file.data.buffer.byteLength;

	if (fileBytes > MAX_BYTES_SIZE) {
		log("error", `❌ Image size too big... [${fileBytes} bytes]`);
		throw createError({
			statusCode: 400,
			statusMessage: `Image size too big! Max size: ${
				MAX_BYTES_SIZE / 1024 / 1024
			} MB`,
		});
	}

	const base64Image = file.data.toString();
	const imageHash = hashImageBase64(base64Image);

	const storedImageUrl = await kv.getItem(imageHash);
	if (storedImageUrl !== null) {
		log("info", "✅ Image already exists. Returning it as is from KV store...");

		const storedColorsString = await kv.getItem(`${imageHash}_colors`);
		if (typeof storedColorsString === "string") {
			const colorsArray = storedColorsString.split(";").map((colorStr) => {
				const [hex, rgbStr] = colorStr.split("_");
				const rgb = rgbStr.split("-").map((num) => parseInt(num, 10));
				return { hex, rgb };
			});

			log(
				"info",
				"✅ Colors already exist. Returning them as is from KV store...",
			);
			return {
				imageHash,
				imageUrl: storedImageUrl,
				colors: colorsArray,
			};
		}

		log("info", "🎨 Colors do not exist. Storing them now...");
		const colorsString = colors
			.map((color) => `${color.hex}_${color.rgb.join("-")}`)
			.join(";");
		await kv.setItem(`${imageHash}_colors`, colorsString);
		log("info", "✅ Colors stored successfully.");
		return {
			imageHash,
			imageUrl: storedImageUrl,
			colors,
		};
	}

	try {
		log(
			"info",
			"💾 Image does not exist. Uploading it and saving it in KV store...",
		);
		const imageUrl = await uploadImageFromBase64(base64Image);
		await kv.setItem(imageHash, imageUrl);

		log("info", `🎨 Storing colors for imageHash: ${imageHash}...`);
		const colorsString = colors
			.map((color) => `${color.hex}_${color.rgb.join("-")}`)
			.join(";");
		await kv.setItem(`${imageHash}_colors`, colorsString);

		log("info", "✅ Image and colors uploaded and saved in KV store...");
		return {
			imageHash,
			imageUrl,
			colors,
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			log(
				"error",
				`❌ Error while uploading image and saving colors: ${error.message}`,
			);
		}
		throw createError({
			statusCode: 500,
			statusMessage: "Could not process the request. Try again!",
		});
	}
});
