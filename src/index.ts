export class ImageProcessor {
  resize(img: string, w: number, h: number) { return { url: `${img}?w=${w}&h=${h}`, width: w, height: h }; }
  crop(img: string, x: number, y: number, w: number, h: number) { return { url: `${img}?crop=${w}x${h}` }; }
  filter(img: string, type: 'blur' | 'grayscale' | 'sharpen') { return { url: `${img}?filter=${type}` }; }
  compress(img: string, quality: number) { return { url: `${img}?quality=${quality}` }; }
}
export default ImageProcessor;
