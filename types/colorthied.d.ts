declare module 'colorthief' {
  export default class ColorThief {
    getColor(sourceImage: CanvasImageSource, quality?: number): [number, number, number];
    getPalette(sourceImage: CanvasImageSource, colorCount?: number, quality?: number): Array<[number, number, number]>;
  }
}