// This script generates a high-quality favicon.ico file from the SVG favicon
// Run with: node generate-favicon.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Installing required packages...');
try {
  // Install required packages if they don't exist
  execSync('npm install --no-save sharp');

  // Dynamic import of sharp after installation
  const sharp = (await import('sharp')).default;

  console.log('Generating enhanced favicon.ico...');

  // Read the SVG file
  const svgBuffer = fs.readFileSync(path.join(__dirname, 'public', 'favicon.svg'));

  // Create different sizes for the favicon with better quality settings
  const sizes = [16, 32, 48, 64, 128, 256];
  const promises = sizes.map(size =>
    sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer()
  );

  // Process all sizes
  Promise.all(promises)
    .then(async (buffers) => {
      // Save individual PNGs for reference
      for (let i = 0; i < sizes.length; i++) {
        fs.writeFileSync(path.join(__dirname, `favicon-${sizes[i]}.png`), buffers[i]);
      }

      // Use the 32x32 buffer for the favicon.ico (better quality than 16x16)
      fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), buffers[1]);
      fs.writeFileSync(path.join(__dirname, 'dist', 'favicon.ico'), buffers[1]);

      // Also save the 32x32 PNG as favicon.png for modern browsers
      fs.writeFileSync(path.join(__dirname, 'public', 'favicon.png'), buffers[1]);
      fs.writeFileSync(path.join(__dirname, 'dist', 'favicon.png'), buffers[1]);

      // Save the 192x192 version for Android (using the largest available)
      fs.writeFileSync(path.join(__dirname, 'public', 'favicon-192.png'), buffers[buffers.length - 1]);
      fs.writeFileSync(path.join(__dirname, 'dist', 'favicon-192.png'), buffers[buffers.length - 1]);

      console.log('Enhanced favicon files generated successfully!');
      console.log('Generated:');
      console.log('- favicon.ico (32x32)');
      console.log('- favicon.png (32x32)');
      console.log('- favicon-192.png (for Android)');
      console.log('- Individual PNG files for reference');
    })
    .catch(err => {
      console.error('Error generating favicon:', err);
    });
} catch (error) {
  console.error('Error:', error.message);
  console.log('Please manually convert the SVG to ICO using an online converter.');
}
