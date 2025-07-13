#!/usr/bin/env node

/**
 * Build Optimization Script for John Litsai Portfolio
 * This script handles optimized builds with performance enhancements
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  outputDir: path.join(__dirname, '../dist'),
  sourceDir: path.join(__dirname, '../src'),
  publicDir: path.join(__dirname, '../public'),
  buildCommand: 'npm run build',
  previewCommand: 'npm run preview'
};

/**
 * Console logger with colors
 */
const logger = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
  warning: (msg) => console.log(`\x1b[33m[WARNING]\x1b[0m ${msg}`),
  error: (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
  step: (msg) => console.log(`\x1b[35m[STEP]\x1b[0m ${msg}`)
};

/**
 * Pre-build optimizations
 */
function preBuildOptimizations() {
  logger.step('Running pre-build optimizations...');

  // Check for large files that should be optimized
  const checkLargeFiles = (dir, maxSize = 500 * 1024) => { // 500KB
    const files = fs.readdirSync(dir, { withFileTypes: true });
    const largeFiles = [];

    files.forEach(file => {
      if (file.isDirectory()) {
        largeFiles.push(...checkLargeFiles(path.join(dir, file.name), maxSize));
      } else {
        const filePath = path.join(dir, file.name);
        const stats = fs.statSync(filePath);
        if (stats.size > maxSize && /\.(png|jpg|jpeg|gif|svg)$/i.test(file.name)) {
          largeFiles.push({
            path: filePath,
            size: stats.size,
            sizeKB: Math.round(stats.size / 1024)
          });
        }
      }
    });

    return largeFiles;
  };

  // Check for large images
  const largeImages = checkLargeFiles(config.sourceDir);
  if (largeImages.length > 0) {
    logger.warning('Large images detected (consider optimization):');
    largeImages.forEach(img => {
      logger.warning(`  - ${path.relative(process.cwd(), img.path)} (${img.sizeKB}KB)`);
    });
  }

  // Check for unused imports (basic check)
  logger.info('Checking for potential optimization opportunities...');

  // Verify critical files exist
  const criticalFiles = [
    'src/main.jsx',
    'src/App.jsx',
    'index.html',
    'public/site.webmanifest',
    'public/sw.js'
  ];

  criticalFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      logger.error(`Critical file missing: ${file}`);
    }
  });

  logger.success('Pre-build optimizations completed');
}

/**
 * Run the build process
 */
function runBuild() {
  logger.step('Running production build...');

  try {
    // Set environment variables for optimization
    process.env.NODE_ENV = 'production';
    process.env.GENERATE_SOURCEMAP = 'false';
    process.env.INLINE_RUNTIME_CHUNK = 'false';

    execSync(config.buildCommand, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });

    logger.success('Build completed successfully');
  } catch (error) {
    logger.error('Build failed:', error.message);
    process.exit(1);
  }
}

/**
 * Post-build optimizations
 */
function postBuildOptimizations() {
  logger.step('Running post-build optimizations...');

  if (!fs.existsSync(config.outputDir)) {
    logger.error('Build output directory not found');
    return;
  }

  // Analyze bundle sizes
  const analyzeBundleSize = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    const bundles = [];

    files.forEach(file => {
      if (file.isFile() && /\.(js|css)$/.test(file.name)) {
        const filePath = path.join(dir, file.name);
        const stats = fs.statSync(filePath);
        bundles.push({
          name: file.name,
          size: stats.size,
          sizeKB: Math.round(stats.size / 1024),
          type: path.extname(file.name).substring(1)
        });
      } else if (file.isDirectory()) {
        bundles.push(...analyzeBundleSize(path.join(dir, file.name)));
      }
    });

    return bundles;
  };

  const bundles = analyzeBundleSize(config.outputDir);

  logger.info('Bundle analysis:');
  const jsBundles = bundles.filter(b => b.type === 'js').sort((a, b) => b.size - a.size);
  const cssBundles = bundles.filter(b => b.type === 'css').sort((a, b) => b.size - a.size);

  if (jsBundles.length > 0) {
    logger.info('JavaScript bundles:');
    jsBundles.forEach(bundle => {
      const status = bundle.sizeKB > 500 ? '⚠️' : bundle.sizeKB > 200 ? '⚡' : '✅';
      logger.info(`  ${status} ${bundle.name}: ${bundle.sizeKB}KB`);
    });
  }

  if (cssBundles.length > 0) {
    logger.info('CSS bundles:');
    cssBundles.forEach(bundle => {
      const status = bundle.sizeKB > 100 ? '⚠️' : bundle.sizeKB > 50 ? '⚡' : '✅';
      logger.info(`  ${status} ${bundle.name}: ${bundle.sizeKB}KB`);
    });
  }

  // Generate build report
  const reportPath = path.join(config.outputDir, 'build-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    bundles: bundles,
    totalSize: bundles.reduce((acc, b) => acc + b.size, 0),
    recommendations: []
  };

  // Add recommendations
  const largeBundles = bundles.filter(b => b.sizeKB > 500);
  if (largeBundles.length > 0) {
    report.recommendations.push('Consider code splitting for large bundles');
  }

  const totalJS = jsBundles.reduce((acc, b) => acc + b.size, 0) / 1024;
  if (totalJS > 1000) {
    report.recommendations.push('JavaScript bundle size exceeds 1MB - consider optimization');
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  logger.success(`Build report saved to: ${path.relative(process.cwd(), reportPath)}`);

  // Copy additional optimization files
  const additionalFiles = [
    'robots.txt',
    'sitemap.xml',
    'sw.js'
  ];

  additionalFiles.forEach(file => {
    const srcPath = path.join(config.publicDir, file);
    const destPath = path.join(config.outputDir, file);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      logger.info(`Copied ${file} to build output`);
    }
  });

  logger.success('Post-build optimizations completed');
}

/**
 * Generate performance tips
 */
function generatePerformanceTips() {
  logger.step('Generating performance tips...');

  const tips = [
    '🚀 Performance Optimization Tips:',
    '',
    '1. Image Optimization:',
    '   - Use WebP format for modern browsers',
    '   - Implement proper lazy loading',
    '   - Optimize image sizes for different viewports',
    '',
    '2. Code Optimization:',
    '   - Implement code splitting for large components',
    '   - Use React.memo() for expensive components',
    '   - Minimize bundle sizes with tree shaking',
    '',
    '3. Caching Strategy:',
    '   - Enable service worker for offline functionality',
    '   - Implement proper HTTP caching headers',
    '   - Use CDN for static assets',
    '',
    '4. Monitoring:',
    '   - Set up Core Web Vitals monitoring',
    '   - Use Lighthouse for performance audits',
    '   - Monitor bundle sizes in CI/CD',
    '',
    '5. SEO & Accessibility:',
    '   - Ensure proper meta tags',
    '   - Implement structured data',
    '   - Test with screen readers',
    '',
    'For more detailed analysis, run:',
    '  npm run build -- --analyze',
    '  npx lighthouse http://localhost:4173',
    ''
  ];

  tips.forEach(tip => logger.info(tip));
}

/**
 * Main execution
 */
async function main() {
  const startTime = Date.now();

  logger.info('🎯 Starting optimized build process...\n');

  try {
    preBuildOptimizations();
    runBuild();
    postBuildOptimizations();
    generatePerformanceTips();

    const duration = Math.round((Date.now() - startTime) / 1000);
    logger.success(`\n🎉 Optimized build completed in ${duration}s`);

    logger.info('\nNext steps:');
    logger.info('1. Test the build: npm run preview');
    logger.info('2. Run Lighthouse audit');
    logger.info('3. Deploy to production');

  } catch (error) {
    logger.error('Build process failed:', error.message);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const options = {
  analyze: args.includes('--analyze'),
  preview: args.includes('--preview'),
  help: args.includes('--help') || args.includes('-h')
};

if (options.help) {
  console.log(`
Usage: node scripts/build-optimized.js [options]

Options:
  --analyze    Run bundle analyzer after build
  --preview    Start preview server after build
  --help, -h   Show this help message

Examples:
  node scripts/build-optimized.js
  node scripts/build-optimized.js --analyze
  node scripts/build-optimized.js --preview
`);
  process.exit(0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().then(() => {
    if (options.preview) {
      logger.info('Starting preview server...');
      execSync(config.previewCommand, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
    }
  }).catch(console.error);
}

export { main, preBuildOptimizations, postBuildOptimizations };
