import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distWebDir = path.join(rootDir, 'dist', 'web');

// Ensure .nojekyll, CNAME, _headers, and .assetsignore exist in dist/web and root
const cnameContent = 'craft.lmk.one\n';
const headersContent = `/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

fs.writeFileSync(path.join(distWebDir, '.nojekyll'), '');
fs.writeFileSync(path.join(distWebDir, 'CNAME'), cnameContent);
fs.writeFileSync(path.join(distWebDir, '_headers'), headersContent);
fs.writeFileSync(path.join(distWebDir, '.assetsignore'), '*.gz\n');

// Sync dist/web/index.html, favicon.svg, and assets/ to repository root
// so GitHub Pages and Cloudflare Pages (Output: . or dist/web) work out of the box!
const rootAssetsDir = path.join(rootDir, 'assets');
if (fs.existsSync(rootAssetsDir)) {
  fs.rmSync(rootAssetsDir, { recursive: true, force: true });
}
fs.cpSync(path.join(distWebDir, 'assets'), rootAssetsDir, { recursive: true });
fs.copyFileSync(path.join(distWebDir, 'index.html'), path.join(rootDir, 'index.html'));
const staticRootFiles = [
  'favicon.svg',
  'robots.txt',
  'sitemap.xml',
  'postaw-kawe-bialo-zielone.png',
  'postaw-kawe-2.png',
  'QR_buycoffee.png',
  'share-button-primary--pl.png',
];
for (const file of staticRootFiles) {
  if (fs.existsSync(path.join(distWebDir, file))) {
    fs.copyFileSync(path.join(distWebDir, file), path.join(rootDir, file));
  }
}
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
fs.writeFileSync(path.join(rootDir, 'CNAME'), cnameContent);
fs.writeFileSync(path.join(rootDir, '_headers'), headersContent);

console.log('Synced static build to both dist/web/ and repository root (/)');
