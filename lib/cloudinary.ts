import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

if (import.meta.browser) {
	throw new Error("Cloudinary functions can only be used server-side");
}

const config = useRuntimeConfig();

const CLOUD_NAME = config.cloudinaryCloudName;
const API_KEY = config.cloudinaryApiKey;
const API_SECRET = config.cloudinaryApiSecret;

if (CLOUD_NAME === "" || API_KEY === "" || API_SECRET === "") {
	throw new Error("Missing Cloudinary env variables");
}

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,
});

export async function uploadImageFromBase64(imageBase64: string) {
	const base64Formatted = imageBase64.replace(
		/^data:image\/(png|jpg|jpeg);base64,/,
		"",
	);

	const transformationOptions = {
		transformation: [
			{ width: 500, crop: "scale" },
			{ quality: "auto:good" },
			{ fetch_format: "avif" },
		],
	};

	const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
		`data:image/jpeg;base64,${base64Formatted}`,
		{
			...transformationOptions,
		},
	);

	if (uploadResult === undefined) {
		throw new Error("Something went wrong uploading image to Cloudinary");
	}

	return uploadResult.secure_url;
}
