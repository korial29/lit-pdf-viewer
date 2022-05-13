const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

esbuild
  .serve(
    {
      servedir: 'www',
    },
    {
      bundle: true,
      format: 'esm',
      entryPoints: [`src/index.js`],
      outdir: 'www/src',
      sourcemap: true,
      tsconfig: `tsconfig.build.json`,
      plugins: [
        sassPlugin({
          filter: /.scss$/,
          type: 'lit-css',
        }),
      ],
    },
  )
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
