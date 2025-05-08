// This script runs after the build process to ensure proper SPA routing
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distPath = path.join(process.cwd(), 'dist');
const indexPath = path.join(distPath, 'index.html');

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  console.log('Creating dist directory...');
  fs.mkdirSync(distPath, { recursive: true });
}

// Create _redirects file for SPA routing
const redirectsPath = path.join(distPath, '_redirects');
fs.writeFileSync(redirectsPath, '/* /index.html 200');
console.log('Created _redirects file');

// Create a 200.html file (used by some static hosts)
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, path.join(distPath, '200.html'));
  console.log('Created 200.html file');
}

// Create a fallback 404.html that redirects to index
const notFoundContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Redirect to the homepage with the current path
    sessionStorage.setItem('redirectPath', window.location.pathname);
    window.location.href = '/';
  </script>
</head>
<body>
  <p>Redirecting to homepage...</p>
</body>
</html>
`;

fs.writeFileSync(path.join(distPath, '404.html'), notFoundContent);
console.log('Created 404.html file');

console.log('Post-build processing completed successfully!');
