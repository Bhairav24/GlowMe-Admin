// import { defineConfig } from 'vite'
// import postcss from './postcss.config.js'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   define: {
//     'process.env': process.env
//   },
//   css: {
//     postcss,
//   },
//   plugins: [react()],
//   resolve: {
//     alias: [
//       {
//         find: /^~.+/,
//         replacement: (val) => {
//           return val.replace(/^~/, "");
//         },
//       },
//     ],
//   },
//   build: {
//     chunkSizeWarningLimit: 1000,
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     }
//   } 
// })
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '');
        },
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
