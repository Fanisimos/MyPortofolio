#!/usr/bin/env node

/**
 * Simple Favicon Creator for John Litsai Portfolio
 * Creates favicons using Canvas API in Node.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  outputDir: path.join(__dirname, '../public'),
  sizes: [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ]
};

/**
 * Create SVG favicon content
 */
function createSVGFavicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" fill="#0066cc" rx="4"/>

  <!-- Code block lines representing developer theme -->
  <rect x="4" y="4" width="8" height="2" rx="1" fill="#16F1BE"/>
  <rect x="14" y="4" width="14" height="2" rx="1" fill="#FF6B6B"/>

  <rect x="2" y="8" width="12" height="2" rx="1" fill="#4ECDC4"/>
  <rect x="16" y="8" width="8" height="2" rx="1" fill="#FFE66D"/>

  <rect x="6" y="12" width="6" height="2" rx="1" fill="#FF9F43"/>
  <rect x="14" y="12" width="16" height="2" rx="1" fill="#A8E6CF"/>

  <rect x="3" y="16" width="4" height="2" rx="1" fill="#06B6D4"/>
  <rect x="9" y="16" width="10" height="2" rx="1" fill="#EC4899"/>
  <rect x="21" y="16" width="8" height="2" rx="1" fill="#84CC16"/>

  <rect x="2" y="20" width="16" height="2" rx="1" fill="#22C55E"/>
  <rect x="20" y="20" width="10" height="2" rx="1" fill="#F43F5E"/>

  <rect x="5" y="24" width="8" height="2" rx="1" fill="#A855F7"/>
  <rect x="15" y="24" width="12" height="2" rx="1" fill="#EAB308"/>

  <rect x="8" y="28" width="16" height="2" rx="1" fill="#3B82F6"/>
</svg>`;
}

/**
 * Create simple SVG for small sizes
 */
function createSimpleSVGFavicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <rect width="16" height="16" fill="#0066cc" rx="2"/>

  <!-- Simplified code blocks for small favicon -->
  <rect x="2" y="2" width="5" height="1.5" rx="0.5" fill="#16F1BE"/>
  <rect x="9" y="2" width="5" height="1.5" rx="0.5" fill="#FF6B6B"/>

  <rect x="1" y="5" width="7" height="1.5" rx="0.5" fill="#4ECDC4"/>
  <rect x="10" y="5" width="4" height="1.5" rx="0.5" fill="#FFE66D"/>

  <rect x="3" y="8" width="4" height="1.5" rx="0.5" fill="#FF9F43"/>
  <rect x="9" y="8" width="6" height="1.5" rx="0.5" fill="#A8E6CF"/>

  <rect x="1" y="11" width="8" height="1.5" rx="0.5" fill="#FF8A80"/>
  <rect x="11" y="11" width="4" height="1.5" rx="0.5" fill="#B39DDB"/>

  <rect x="4" y="14" width="8" height="1.5" rx="0.5" fill="#81C784"/>
</svg>`;
}

/**
 * Create ICO file content (simplified)
 */
function createICOFile() {
  // This creates a minimal ICO header
  // For production, you'd want to use a proper ICO encoder
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);      // Reserved
  header.writeUInt16LE(1, 2);      // Type (ICO)
  header.writeUInt16LE(1, 4);      // Number of images
  header.writeUInt8(32, 6);        // Width
  header.writeUInt8(32, 7);        // Height
  header.writeUInt8(0, 8);         // Color palette
  header.writeUInt8(0, 9);         // Reserved
  header.writeUInt16LE(1, 10);     // Color planes
  header.writeUInt16LE(32, 12);    // Bits per pixel
  header.writeUInt32LE(0, 14);     // Image size (we'll update this)
  header.writeUInt32LE(22, 18);    // Image offset

  return header;
}

/**
 * Generate all favicon files
 */
function generateFavicons() {
  console.log('🎨 Generating favicons for John Litsai Portfolio...\n');

  try {
    // Create SVG favicon
    const svgContent = createSVGFavicon();
    const svgPath = path.join(config.outputDir, 'favicon.svg');
    fs.writeFileSync(svgPath, svgContent);
    console.log('✅ Created favicon.svg');

    // Create simple SVG for fallback
    const simpleSvgContent = createSimpleSVGFavicon();
    const simpleSvgPath = path.join(config.outputDir, 'favicon-simple.svg');
    fs.writeFileSync(simpleSvgPath, simpleSvgContent);
    console.log('✅ Created favicon-simple.svg');

    // Create ICO file (basic)
    const icoContent = createICOFile();
    const icoPath = path.join(config.outputDir, 'favicon.ico');
    fs.writeFileSync(icoPath, icoContent);
    console.log('✅ Created basic favicon.ico');

    console.log('\n🚀 Favicon generation completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Open public/generate-favicons.html in your browser');
    console.log('2. Generate and download the PNG favicons');
    console.log('3. Replace the placeholder PNG files in public/');
    console.log('4. Test your favicon in the browser');
    console.log('\n💡 Your website will now show the custom developer-themed favicon!');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

/**
 * Verify favicon files
 */
function verifyFavicons() {
  console.log('\n🔍 Verifying favicon files...');

  const requiredFiles = [
    'favicon.svg',
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png'
  ];

  const missingFiles = [];
  const emptyFiles = [];

  requiredFiles.forEach(file => {
    const filePath = path.join(config.outputDir, file);

    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    } else {
      const stats = fs.statSync(filePath);
      if (stats.size === 0) {
        emptyFiles.push(file);
      }
    }
  });

  if (missingFiles.length > 0) {
    console.log('⚠️  Missing files:', missingFiles.join(', '));
  }

  if (emptyFiles.length > 0) {
    console.log('⚠️  Empty files (need generation):', emptyFiles.join(', '));
  }

  if (missingFiles.length === 0 && emptyFiles.length === 0) {
    console.log('✅ All favicon files are present and have content');
  }

  console.log('\n📱 Test your favicons:');
  console.log('- Browser tab: Should show your custom icon');
  console.log('- Bookmark: Icon should appear in bookmarks');
  console.log('- Mobile: Add to home screen test');
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
🎨 Favicon Generator for John Litsai Portfolio

Usage: node scripts/create-favicons.js [command]

Commands:
  generate    Generate SVG and basic ICO favicons
  verify      Check favicon files status
  help        Show this help message

Examples:
  node scripts/create-favicons.js generate
  node scripts/create-favicons.js verify

After running this script:
1. Open public/generate-favicons.html in browser
2. Download the generated PNG favicons
3. Replace files in public/ directory
4. Refresh your website to see the new favicon

Your new favicon features a colorful code-block design representing your developer identity!
`);
}

// Main execution
const command = process.argv[2] || 'generate';

switch (command) {
  case 'generate':
    generateFavicons();
    verifyFavicons();
    break;
  case 'verify':
    verifyFavicons();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log('Unknown command. Use --help for usage information.');
    process.exit(1);
}
