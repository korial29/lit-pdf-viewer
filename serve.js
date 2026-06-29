const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

esbuild
  .context({
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
  })
  .then(async ctx => {
    const { hosts, port } = await ctx.serve({
      servedir: 'www',
    });
    console.log(`Serving on http://${hosts[0] || 'localhost'}:${port}`);
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
