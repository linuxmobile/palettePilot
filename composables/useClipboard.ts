import { useToast } from "primevue/usetoast";

export function useClipboard() {
	const toast = useToast();

	/**
	 * Copies the specified text to the clipboard.
	 * @param text The text to be copied.
	 * @returns A promise that resolves when the text is successfully copied to the clipboard.
	 */
	const copyToClipboard = async (text: string): Promise<void> => {
		try {
			await navigator.clipboard.writeText(text);
			toast.add({
				severity: "success",
				summary: "Copied to Clipboard",
				group: "bl",
				life: 2000,
			});
		} catch (err) {
			toast.add({
				severity: "error",
				summary: "Failed to Copy",
				detail: "Error copying text to clipboard",
				group: "bl",
				life: 2000,
			});
			console.error("Error copying text:", err);
		}
	};

	return { copyToClipboard };
}
