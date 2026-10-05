const fs = require('fs');
const path = require('path');

try {
  const srcProductImages = path.resolve(__dirname, 'src/assets/product-images/images');
  const srcImages = path.resolve(__dirname, 'src/assets/images');
  const publicImages = path.resolve(__dirname, 'public/assets/images');

  fs.mkdirSync(srcImages, { recursive: true });
  fs.mkdirSync(path.dirname(publicImages), { recursive: true });

  if (fs.existsSync(srcProductImages)) {
    const cats = fs.readdirSync(srcProductImages);
    for (const c of cats) {
      const srcCat = path.join(srcProductImages, c);
      const destCat = path.join(srcImages, c);
      if (fs.statSync(srcCat).isDirectory() && !fs.existsSync(destCat)) {
        try {
          fs.symlinkSync(srcCat, destCat, process.platform === 'win32' ? 'junction' : 'dir');
        } catch {
          fs.cpSync(srcCat, destCat, { recursive: true });
        }
      }
    }
  }

  if (!fs.existsSync(publicImages)) {
    try {
      fs.symlinkSync(srcImages, publicImages, process.platform === 'win32' ? 'junction' : 'dir');
    } catch {
      fs.cpSync(srcImages, publicImages, { recursive: true });
    }
  }
  console.log('Vercel/Dev asset setup completed.');
} catch (e) {
  console.warn('Asset setup notice:', e.message);
}
