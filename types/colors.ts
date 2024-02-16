export type ColorWithRgbAndHex = {
	hex: string;
	rgb: number[];
};

export type RgbColor = Pick<ColorWithRgbAndHex, 'rgb'>