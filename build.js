const esbuild = require('esbuild');
const { copy } = require('esbuild-plugin-copy');
const { sassPlugin } = require('esbuild-sass-plugin');

esbuild
  .build({
    bundle: true,
    minify: true,
    entryPoints: [`src/index.js`],
    outdir: `dist`,
    tsconfig: `tsconfig.build.json`,
    format: 'esm',
    plugins: [
      sassPlugin({
        filter: /.scss$/,
        type: 'lit-css',
      }),
      copy({
        // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
        // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
        resolveFrom: 'cwd',
        assets: [
          {
            from: ['node_modules/pdfjs-dist/build/pdf.worker.min.js'],
            to: ['dist/pdfjs-dist/build/pdf.worker.min.js'],
          },
          {
            from: ['node_modules/pdfjs-dist/cmaps/*'],
            to: ['dist/pdfjs-dist/cmaps/*'],
          },
          {
            from: ['assets/fonts/*'],
            to: ['dist/fonts/*'],
          },
          {
            from: ['assets/style/font.css'],
            to: ['dist/style/font.css'],
          },
          {
            from: ['src/**/*'],
            to: ['dist/src/'],
            keepStructure: true,
          },
        ],
      }),
    ],
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
