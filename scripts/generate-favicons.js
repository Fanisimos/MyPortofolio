#!/usr/bin/env node

/**
 * Favicon Generator Script
 * Generates various favicon sizes from the source logo
 *
 * Usage: node scripts/generate-favicons.js
 *
 * This script creates optimized favicons for web, mobile, and desktop applications
 * from the source logo.png file.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  sourceImage: path.join(__dirname, "../public/logo.png"),
  outputDir: path.join(__dirname, "../public"),
  sizes: {
    "favicon.ico": [16, 32, 48], // ICO file with multiple sizes
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
    "mstile-70x70.png": 70,
    "mstile-150x150.png": 150,
    "mstile-310x150.png": { width: 310, height: 150 },
    "mstile-310x310.png": 310,
  },
};

/**
 * Check if required dependencies are available
 */
async function checkDependencies() {
  try {
    await import("sharp");
    return true;
  } catch (error) {
    console.log("\n📦 Installing sharp for image processing...");
    console.log("Please run: npm install sharp --save-dev");
    console.log("\nAlternatively, you can use online tools like:");
    console.log("- https://realfavicongenerator.net/");
    console.log("- https://favicon.io/");
    return false;
  }
}

/**
 * Generate favicon files using Sharp
 */
async function generateWithSharp() {
  const { default: sharp } = await import("sharp");

  // Verify source image exists
  if (!fs.existsSync(config.sourceImage)) {
    console.error("❌ Source image not found:", config.sourceImage);
    return;
  }

  console.log("🚀 Generating favicons from:", config.sourceImage);

  try {
    for (const [filename, size] of Object.entries(config.sizes)) {
      const outputPath = path.join(config.outputDir, filename);

      if (filename.endsWith(".ico")) {
        // For ICO files, we'll generate PNG and rename (simplified approach)
        await sharp(config.sourceImage)
          .resize(32, 32)
          .png()
          .toFile(outputPath.replace(".ico", ".png"));

        console.log(`✅ Generated ${filename} (as PNG)`);
      } else if (typeof size === "object" && size.width && size.height) {
        // Custom dimensions
        await sharp(config.sourceImage)
          .resize(size.width, size.height)
          .png()
          .toFile(outputPath);

        console.log(`✅ Generated ${filename} (${size.width}x${size.height})`);
      } else {
        // Square dimensions
        await sharp(config.sourceImage)
          .resize(size, size)
          .png()
          .toFile(outputPath);

        console.log(`✅ Generated ${filename} (${size}x${size})`);
      }
    }

    console.log("\n🎉 All favicons generated successfully!");
    generateManifestFiles();
  } catch (error) {
    console.error("❌ Error generating favicons:", error.message);
  }
}

/**
 * Generate favicon files without dependencies (creates placeholder files)
 */
function generatePlaceholders() {
  console.log("📝 Creating placeholder favicon files...");
  console.log("These will need to be replaced with actual favicon images.\n");

  // Create a simple SVG favicon as base64
  const svgFavicon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0066cc"/>
  <rect x="20" y="20" width="60" height="8" rx="4" fill="#16f1be"/>
  <rect x="20" y="35" width="40" height="8" rx="4" fill="#ff6b6b"/>
  <rect x="20" y="50" width="50" height="8" rx="4" fill="#4ecdc4"/>
  <rect x="20" y="65" width="35" height="8" rx="4" fill="#ffe66d"/>
</svg>`.trim();

  // Convert SVG to base64
  const svgBase64 = Buffer.from(svgFavicon).toString("base64");
  const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

  // Create a simple HTML file that shows how to use the favicons
  const readmeContent = `
# Favicon Setup Instructions

## Current Status
Placeholder favicon files have been created. For best results, replace these with properly generated favicons.

## Recommended Tools
1. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - Upload your logo.png
   - Download the generated favicon package
   - Replace the files in the public/ directory

2. **Favicon.io** (https://favicon.io/)
   - Convert PNG to ICO
   - Generate favicon packages

3. **Sharp (Node.js)**
   - Install: npm install sharp --save-dev
   - Run: node scripts/generate-favicons.js

## Files to Replace
- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- mstile-*.png files

## Current Implementation
Your index.html already includes all the necessary favicon links.
The web manifest (site.webmanifest) is also properly configured.
`;

  fs.writeFileSync(
    path.join(config.outputDir, "FAVICON-README.md"),
    readmeContent.trim(),
  );

  // Create minimal ICO file (this is a simplified approach)
  const icoHeader = Buffer.from([
    0x00,
    0x00, // Reserved
    0x01,
    0x00, // ICO format
    0x01,
    0x00, // Number of images
  ]);

  fs.writeFileSync(path.join(config.outputDir, "favicon.ico"), icoHeader);

  console.log("✅ Created favicon.ico (minimal)");
  console.log("✅ Created FAVICON-README.md with instructions");
  console.log("\n📋 Next steps:");
  console.log("1. Visit https://realfavicongenerator.net/");
  console.log("2. Upload your public/logo.png file");
  console.log("3. Download and extract the favicon package");
  console.log("4. Replace the files in your public/ directory");
}

/**
 * Generate additional manifest and configuration files
 */
function generateManifestFiles() {
  // Browser configuration for older browsers
  const browserConfigXml = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/mstile-70x70.png"/>
            <square150x150logo src="/mstile-150x150.png"/>
            <square310x310logo src="/mstile-310x310.png"/>
            <wide310x150logo src="/mstile-310x150.png"/>
            <TileColor>#0066cc</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;

  fs.writeFileSync(
    path.join(config.outputDir, "browserconfig.xml"),
    browserConfigXml,
  );
  console.log("✅ Updated browserconfig.xml");
}

/**
 * Validate the generated favicons
 */
function validateFavicons() {
  console.log("\n🔍 Validating generated favicons...");

  const requiredFiles = Object.keys(config.sizes);
  const missingFiles = [];

  for (const filename of requiredFiles) {
    const filePath = path.join(config.outputDir, filename);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(filename);
    }
  }

  if (missingFiles.length > 0) {
    console.log("⚠️  Missing files:", missingFiles.join(", "));
  } else {
    console.log("✅ All favicon files are present");
  }

  // Check file sizes
  for (const filename of requiredFiles) {
    const filePath = path.join(config.outputDir, filename);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size === 0) {
        console.log(`⚠️  ${filename} is empty (0 bytes)`);
      }
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🎨 Favicon Generator for John Litsai Portfolio\n");

  // Check if Sharp is available
  if (await checkDependencies()) {
    await generateWithSharp();
  } else {
    generatePlaceholders();
  }

  validateFavicons();

  console.log("\n📚 Additional Resources:");
  console.log(
    "- Favicon best practices: https://github.com/audreyr/favicon-cheat-sheet",
  );
  console.log(
    "- Test your favicons: https://realfavicongenerator.net/favicon_checker",
  );
  console.log(
    "- PWA manifest validator: https://manifest-validator.appspot.com/",
  );
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { generateWithSharp, generatePlaceholders, validateFavicons, config };
