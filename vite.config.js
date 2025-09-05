import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
    }),
  ],

  // Build optimizations
  build: {
    // Enable minification for smaller bundle sizes
    minify: "terser",

    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          vendor: ["react", "react-dom"],
          mui: ["@mui/material", "@emotion/react", "@emotion/styled"],
          utils: ["prop-types"],
        },
        // Optimize chunk file naming for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },

    // Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ["console.log", "console.warn"], // Remove specific console methods
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
      },
    },

    // Source map for production debugging (optional)
    sourcemap: false,

    // Target modern browsers for smaller bundle
    target: "esnext",

    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },

  // Development server optimizations
  server: {
    // Enable HMR for faster development
    hmr: true,
    host: true,
    port: 5173,
    // Optimize dev server performance
    fs: {
      strict: false,
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },

  // Dependency optimization
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: [
      "react",
      "react-dom",
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
      "prop-types",
    ],
    // Exclude dependencies from pre-bundling if needed
    exclude: [],
  },

  // Asset handling
  assetsInclude: [
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.webp",
  ],

  // Define environment variables
  define: {
    // Reduce React bundle size in production
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  },

  // CSS optimization
  css: {
    // Enable CSS code splitting
    codeSplit: true,
    // CSS preprocessing options
    preprocessorOptions: {
      css: {
        charset: false, // Remove charset to reduce CSS size
      },
    },
  },

  // Resolve configuration
  resolve: {
    alias: {
      // Add path aliases for cleaner imports
      "@": "/src",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@showcaseComponents": "/src/showcaseComponents",
    },
  },

  // Base URL configuration
  base: "/",

  // Public directory
  publicDir: "public",
});
