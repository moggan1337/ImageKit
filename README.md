# ImageKit 🖼️

**Image Processing** - Resize, crop, filters, compression.

## Features

- **📐 Resize** - Scale images
- **✂️ Crop** - Cut to size
- **🎨 Filters** - Blur, grayscale, sharpen
- **🗜️ Compress** - Reduce file size

## Installation

```bash
npm install imagekit
```

## Usage

```typescript
import { ImageProcessor } from 'imagekit';

const img = new ImageProcessor();

// Resize
const thumb = img.resize('photo.jpg', 200, 200);

// Crop
const cropped = img.crop('photo.jpg', 0, 0, 800, 600);

// Filters
const blurred = img.filter('photo.jpg', 'blur');
const gray = img.filter('photo.jpg', 'grayscale');

// Compress
const small = img.compress('photo.jpg', 80);
```

## API

| Method | Description |
|--------|-------------|
| `resize(img, w, h)` | Resize to dimensions |
| `crop(img, x, y, w, h)` | Crop rectangle |
| `filter(img, type)` | Apply filter |
| `compress(img, quality)` | Compress (0-100) |

## Filters

- `blur` - Gaussian blur
- `grayscale` - Black and white
- `sharpen` - Sharpen edges

## License

MIT
