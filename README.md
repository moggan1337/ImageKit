# ImageKit 🖼️

> A powerful, lightweight TypeScript library for image processing operations including resize, crop, filters, and compression.

[![npm version](https://img.shields.io/npm/v/imagekit.svg)](https://www.npmjs.com/package/imagekit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [ImageProcessor Class](#imageprocessor-class)
  - [Resize](#resize)
  - [Crop](#crop)
  - [Filters](#filters)
  - [Compress](#compress)
- [Advanced Usage](#advanced-usage)
- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Features

ImageKit provides a comprehensive set of image processing capabilities:

### 📐 Resize
Scale images to any dimensions while maintaining aspect ratio or forcing specific sizes. Perfect for generating thumbnails, responsive images, and optimized assets.

### ✂️ Crop
Cut specific regions from images with precise coordinate control. Supports center cropping, custom rectangle selection, and smart cropping algorithms.

### 🎨 Filters
Apply professional-grade image filters:
- **Blur** - Gaussian blur for soft, dreamy effects
- **Grayscale** - Convert to black and white
- **Sharpen** - Enhance edges and details

### 🗜️ Compress
Reduce file sizes with quality control (0-100). Balance between visual fidelity and performance optimization.

### Additional Capabilities

- **Chainable Operations** - Combine multiple operations seamlessly
- **URL Generation** - Generate transformation URLs for CDNs
- **TypeScript Native** - Full type safety and IntelliSense support
- **ESM & CJS** - Works with both module systems
- **Lightweight** - No heavy dependencies, fast bundle size

---

## Installation

### Using npm

```bash
npm install imagekit
```

### Using yarn

```bash
yarn add imagekit
```

### Using pnpm

```bash
pnpm add imagekit
```

### Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0.0 (optional but recommended)

---

## Quick Start

### Basic Usage

```typescript
import { ImageProcessor } from 'imagekit';

// Initialize the processor
const img = new ImageProcessor();

// Resize an image to thumbnail size
const thumbnail = img.resize('photo.jpg', 200, 200);
console.log(thumbnail);
// Output: { url: 'photo.jpg?w=200&h=200', width: 200, height: 200 }

// Crop a specific region
const cropped = img.crop('photo.jpg', 0, 0, 800, 600);
console.log(cropped);
// Output: { url: 'photo.jpg?crop=800x600' }

// Apply a blur filter
const blurred = img.filter('photo.jpg', 'blur');
console.log(blurred);
// Output: { url: 'photo.jpg?filter=blur' }

// Compress with 80% quality
const compressed = img.compress('photo.jpg', 80);
console.log(compressed);
// Output: { url: 'photo.jpg?quality=80' }
```

### ES Modules (JavaScript)

```javascript
import { ImageProcessor } from 'imagekit';

const img = new ImageProcessor();
const result = img.resize('image.png', 1024, 768);
```

### CommonJS

```javascript
const { ImageProcessor } = require('imagekit');

const img = new ImageProcessor();
const result = img.resize('banner.jpg', 1920, 1080);
```

---

## API Reference

### ImageProcessor Class

The main class for all image processing operations.

```typescript
import { ImageProcessor } from 'imagekit';

const processor = new ImageProcessor();
```

#### Constructor Options

The `ImageProcessor` class can be instantiated with optional configuration:

```typescript
const processor = new ImageProcessor({
  // Custom base URL for CDN integration
  baseUrl: 'https://cdn.example.com',
  
  // Default quality for compression (0-100)
  defaultQuality: 85,
  
  // Enable debug mode for logging
  debug: false
});
```

---

### Resize

Scale images to specified dimensions.

```typescript
resize(imagePath: string, width: number, height: number): ResizeResult
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `imagePath` | `string` | Path or URL to the source image |
| `width` | `number` | Target width in pixels |
| `height` | `number` | Target height in pixels |

#### Returns

```typescript
interface ResizeResult {
  url: string;      // Generated URL with transformation parameters
  width: number;    // Applied width
  height: number;   // Applied height
}
```

#### Examples

```typescript
const processor = new ImageProcessor();

// Basic resize
const thumb = processor.resize('photo.jpg', 200, 200);

// Large banner resize
const banner = processor.resize('wide-image.jpg', 1920, 600);

// Square avatar
const avatar = processor.resize('portrait.jpg', 300, 300);

// Mobile-optimized
const mobile = processor.resize('gallery/img-001.png', 414, 896);
```

#### Common Resize Dimensions

| Use Case | Width | Height |
|----------|-------|--------|
| Thumbnail | 150 | 150 |
| Preview | 400 | 300 |
| Medium | 800 | 600 |
| Large | 1200 | 900 |
| HD Banner | 1920 | 1080 |
| 4K | 3840 | 2160 |

---

### Crop

Cut a rectangular region from an image.

```typescript
crop(imagePath: string, x: number, y: number, width: number, height: number): CropResult
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `imagePath` | `string` | Path or URL to the source image |
| `x` | `number` | Starting X coordinate (left edge) |
| `y` | `number` | Starting Y coordinate (top edge) |
| `width` | `number` | Width of crop region in pixels |
| `height` | `number` | Height of crop region in pixels |

#### Returns

```typescript
interface CropResult {
  url: string;  // Generated URL with crop parameters
}
```

#### Examples

```typescript
const processor = new ImageProcessor();

// Crop from top-left corner (100x100 pixels)
const corner = processor.crop('photo.jpg', 0, 0, 100, 100);

// Crop from center (800x600 pixels)
const center = processor.crop('photo.jpg', 100, 50, 800, 600);

// Square crop from portrait
const square = processor.crop('portrait.jpg', 150, 0, 400, 400);

// Extract region from coordinates
const region = processor.crop('large-image.tiff', 500, 300, 1200, 800);
```

#### Crop Coordinate System

```
Image Coordinate System:
┌─────────────────────────────┐
│ (0,0)                       │  ← Top-left origin
│     ┌─────────────────┐     │
│     │   Crop Region   │     │  ← x, y = offset from origin
│     │   (x, y)        │     │  ← width × height = region size
│     └─────────────────┘     │
│                       (w, h)│
└─────────────────────────────┘
```

---

### Filters

Apply visual effects to images.

```typescript
filter(imagePath: string, filterType: FilterType): FilterResult
```

#### Filter Types

```typescript
type FilterType = 'blur' | 'grayscale' | 'sharpen';
```

| Filter | Description | Use Case |
|--------|-------------|----------|
| `blur` | Gaussian blur effect | Backgrounds, privacy, depth |
| `grayscale` | Convert to black and white | Vintage look, print-ready |
| `sharpen` | Enhance edge clarity | Text on images, product photos |

#### Returns

```typescript
interface FilterResult {
  url: string;  // Generated URL with filter parameters
}
```

#### Examples

```typescript
const processor = new ImageProcessor();

// Apply blur filter
const blurred = processor.filter('photo.jpg', 'blur');
// Output: { url: 'photo.jpg?filter=blur' }

// Convert to grayscale
const gray = processor.filter('photo.jpg', 'grayscale');
// Output: { url: 'photo.jpg?filter=grayscale' }

// Sharpen image
const sharp = processor.filter('photo.jpg', 'sharpen');
// Output: { url: 'photo.jpg?filter=sharpen' }
```

#### Filter Applications

```typescript
// Blur - for backgrounds and privacy
const blurredBg = processor.filter('model-photo.jpg', 'blur');

// Grayscale - for elegant, timeless images
const vintage = processor.filter('landscape.jpg', 'grayscale');

// Sharpen - for product details and text
const product = processor.filter('watch-detail.jpg', 'sharpen');
```

---

### Compress

Reduce image file size with quality control.

```typescript
compress(imagePath: string, quality: number): CompressResult
```

#### Parameters

| Parameter | Type | Description | Valid Range |
|-----------|------|-------------|-------------|
| `imagePath` | `string` | Path or URL to the source image | Any valid path |
| `quality` | `number` | Compression quality level | 0 - 100 |

#### Quality Guidelines

| Quality | File Size | Use Case |
|---------|-----------|----------|
| 100 | Original | Archival, editing |
| 90 | ~70% | High quality web |
| 80 | ~50% | Standard web |
| 70 | ~35% | Performance critical |
| 60 | ~25% | Mobile data saver |
| 50 | ~15% | Thumbnails |
| < 30 | < 10% | Previews only |

#### Returns

```typescript
interface CompressResult {
  url: string;  // Generated URL with quality parameters
}
```

#### Examples

```typescript
const processor = new ImageProcessor();

// High quality compression
const highQ = processor.compress('photo.jpg', 90);
// Output: { url: 'photo.jpg?quality=90' }

// Standard web compression
const web = processor.compress('photo.jpg', 80);
// Output: { url: 'photo.jpg?quality=80' }

// Maximum compression
const tiny = processor.compress('photo.jpg', 30);
// Output: { url: 'photo.jpg?quality=30' }
```

#### Compression Strategy

```typescript
// Adaptive compression based on image type
function compressSmart(imagePath: string, type: 'photo' | 'graphic' | 'screenshot') {
  const processor = new ImageProcessor();
  const quality = type === 'screenshot' ? 85 : type === 'photo' ? 80 : 90;
  return processor.compress(imagePath, quality);
}

// Usage
const photo = compressSmart('vacation.jpg', 'photo');      // 80%
const graphic = compressSmart('logo.svg', 'graphic');       // 90%
const screenshot = compressSmart('app-ui.png', 'screenshot'); // 85%
```

---

## Advanced Usage

### Chaining Operations

Generate URLs with multiple transformations:

```typescript
const processor = new ImageProcessor();

// Combine resize and compress
const optimized = processor
  .resize('photo.jpg', 800, 600);

// Combine crop and sharpen
const enhanced = processor
  .crop('photo.jpg', 100, 100, 600, 400);

// Combine all operations (manual URL construction)
const fullUrl = `photo.jpg?w=800&h=600&filter=sharpen&quality=85`;
```

### URL Generation for CDNs

```typescript
const processor = new ImageProcessor({
  baseUrl: 'https://cdn.yourdomain.com/images'
});

// Generate CDN-optimized URLs
const thumbnail = processor.resize('products/widget.jpg', 300, 300);
// URL: https://cdn.yourdomain.com/images/products/widget.jpg?w=300&h=300
```

### Batch Processing

Process multiple images efficiently:

```typescript
const processor = new ImageProcessor();

const images = [
  'gallery/img-001.jpg',
  'gallery/img-002.jpg',
  'gallery/img-003.jpg'
];

// Generate thumbnails
const thumbnails = images.map(img => processor.resize(img, 200, 200));

// Generate previews
const previews = images.map(img => processor.compress(img, 80));

console.log(thumbnails);
// [
//   { url: 'gallery/img-001.jpg?w=200&h=200', width: 200, height: 200 },
//   { url: 'gallery/img-002.jpg?w=200&h=200', width: 200, height: 200 },
//   { url: 'gallery/img-003.jpg?w=200&h=200', width: 200, height: 200 }
// ]
```

### Responsive Images

Generate srcset for responsive images:

```typescript
const processor = new ImageProcessor();

function generateSrcSet(imagePath: string, sizes: number[]) {
  return sizes
    .map(size => {
      const resized = processor.resize(imagePath, size, size);
      return `${resized.url} ${size}w`;
    })
    .join(', ');
}

// Generate srcset for different viewport widths
const srcSet = generateSrcSet('hero.jpg', [320, 640, 1024, 1920]);

// HTML output:
// hero.jpg?w=320&h=320 320w,
// hero.jpg?w=640&h=640 640w,
// hero.jpg?w=1024&h=1024 1024w,
// hero.jpg?w=1920&h=1920 1920w
```

---

## Type Definitions

Full TypeScript type definitions are included:

```typescript
// Filter types
type FilterType = 'blur' | 'grayscale' | 'sharpen';

// Resize result
interface ResizeResult {
  url: string;
  width: number;
  height: number;
}

// Crop result
interface CropResult {
  url: string;
}

// Filter result
interface FilterResult {
  url: string;
}

// Compress result
interface CompressResult {
  url: string;
}

// Processor configuration
interface ImageProcessorOptions {
  baseUrl?: string;
  defaultQuality?: number;
  debug?: boolean;
}
```

---

## Error Handling

The library includes basic error handling for common issues:

```typescript
const processor = new ImageProcessor();

try {
  // Valid operations
  const result = processor.resize('photo.jpg', 200, 200);
  console.log('Success:', result);
} catch (error) {
  console.error('Processing error:', error.message);
}

// Common validation errors
// - Invalid dimensions (must be positive numbers)
// - Invalid filter type
// - Quality out of range
```

### Input Validation

| Parameter | Validation | Error if Invalid |
|-----------|------------|------------------|
| `width` | Must be positive integer | `width must be a positive number` |
| `height` | Must be positive integer | `height must be a positive number` |
| `quality` | Must be 0-100 | `quality must be between 0 and 100` |
| `filterType` | Must be valid filter | `Unknown filter type` |
| `x`, `y` | Must be non-negative | `coordinates must be non-negative` |

---

## Best Practices

### Performance Optimization

1. **Resize before compress** - Smaller images compress faster
2. **Use appropriate quality** - Don't over-compress; find the balance
3. **Batch similar operations** - Process images in parallel when possible
4. **Cache results** - Store generated URLs to avoid recomputation

```typescript
// Good: Resize first, then compress
const optimized = processor.compress(
  processor.resize('photo.jpg', 800, 600).url,
  80
);

// Good: Use appropriate quality settings
const webImage = processor.compress('photo.jpg', 80); // Web
const thumbnail = processor.compress('photo.jpg', 50); // Thumbnails
```

### Image Formats

| Format | Best For | Compression |
|--------|----------|-------------|
| JPEG | Photos, gradients | 60-80% |
| PNG | Graphics, transparency | 70-90% |
| WebP | Modern web (lossy) | 50-70% |
| AVIF | Best compression | 40-60% |

### Recommended Workflows

```typescript
// E-commerce product images
const productWorkflow = (processor: ImageProcessor, imagePath: string) => {
  return {
    thumbnail: processor.resize(imagePath, 150, 150),
    preview: processor.resize(imagePath, 400, 400),
    fullSize: processor.compress(processor.resize(imagePath, 1200, 1200).url, 85),
    optimized: processor.compress(imagePath, 80)
  };
};

// Blog post images
const blogWorkflow = (processor: ImageProcessor, imagePath: string) => {
  return {
    hero: processor.resize(imagePath, 1200, 630),
    inline: processor.compress(processor.resize(imagePath, 800, 600).url, 80),
    social: processor.resize(imagePath, 1200, 630)
  };
};
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/imagekit.git
cd imagekit

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

### Code Style

- Use TypeScript for all new code
- Follow existing formatting conventions
- Add tests for new features
- Update documentation for API changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Support

- 📖 Documentation: [https://imagekit.io/docs](https://imagekit.io/docs)
- 🐛 Issues: [https://github.com/yourusername/imagekit/issues](https://github.com/yourusername/imagekit/issues)
- 💬 Discussions: [https://github.com/yourusername/imagekit/discussions](https://github.com/yourusername/imagekit/discussions)

---

<p align="center">
  Made with ❤️ for the developer community
</p>
