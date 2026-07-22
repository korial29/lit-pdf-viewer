import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { compileString } from 'sass';
import { readFileSync, existsSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const VIRTUAL_PREFIX = '\0lit-scss:';

function litScssPlugin() {
  return {
    name: 'lit-scss',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!id.endsWith('.scss') || !importer) {
        return null;
      }
      let cleanImporter = importer.startsWith(VIRTUAL_PREFIX)
        ? `${importer.slice(VIRTUAL_PREFIX.length)}.scss`
        : importer;
      // Vite's dependency scanner sometimes calls resolveId with a
      // root-relative URL path (e.g. "/src/foo/foo.ts") instead of a real
      // filesystem path when the dev server root is `www` (`vite www`).
      // Fall back to resolving it against the `www` directory in that case.
      if (!existsSync(cleanImporter)) {
        cleanImporter = resolve(__dirname, 'www', cleanImporter.replace(/^\//, ''));
      }
      const abs = resolve(dirname(cleanImporter), id);
      // Strip .scss so vite:css doesn't re-process this virtual module
      return VIRTUAL_PREFIX + abs.slice(0, -5);
    },
    load(id) {
      if (!id.startsWith(VIRTUAL_PREFIX)) {
        return null;
      }
      const filePath = `${id.slice(VIRTUAL_PREFIX.length)}.scss`;
      const source = readFileSync(filePath, 'utf-8');
      const result = compileString(source, {
        url: new URL(`file://${filePath}`),
        loadPaths: [resolve(__dirname, 'assets/style')],
        silenceDeprecations: ['import', 'global-builtin'],
      });
      const escaped = result.css
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$\{/g, '\\${');
      return `import { css } from 'lit';\nexport default css\`${escaped}\`;`;
    },
  };
}

const isBuildingDemo = process.env.BUILD_DEMO === 'true';

export default defineConfig(({ command }) => ({
  base: isBuildingDemo ? '/lit-pdf-viewer/' : undefined,
  build: isBuildingDemo
    ? {
        outDir: 'dist-demo',
        rollupOptions: {
          input: resolve(__dirname, 'www/index.html'),
        },
      }
    : {
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          formats: ['es'],
          fileName: 'index',
        },
        minify: true,
        rollupOptions: {
          external: ['lit', /^lit\//],
        },
      },
  plugins: [
    litScssPlugin(),
    // Only relevant for `vite build`: it assembles dist/dist-demo from the
    // repo root. In dev (`vite www`), the server root is `www` so these
    // `src` paths (repo-root-relative) don't resolve, and the copy is
    // redundant anyway since start-dev.sh/`npm start` already copy
    // everything the dev server needs straight into `www`.
    command === 'build' &&
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
            dest: 'pdfjs-dist/build',
            rename: { stripBase: true },
          },
          {
            src: 'node_modules/pdfjs-dist/cmaps/*',
            dest: 'pdfjs-dist/cmaps',
            rename: { stripBase: true },
          },
          {
            src: 'assets/fonts/*',
            dest: 'fonts',
            rename: { stripBase: true },
          },
          {
            src: 'assets/style/font.css',
            dest: 'style',
            rename: { stripBase: true },
          },
          {
            src: 'src/**/*',
            dest: 'src',
            rename: { stripBase: 1 },
          },
          {
            src: 'www/*.pdf',
            dest: '.',
            rename: { stripBase: true },
          },
        ],
      }),
  ],
  server: {
    fs: {
      allow: ['..'],
    },
  },
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
    },
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@helpers': resolve(__dirname, 'helpers'),
      '@assets': resolve(__dirname, 'assets'),
    },
  },
}));
