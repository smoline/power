const path = require('path');
const rails = require('esbuild-rails');
const vue = require('esbuild-plugin-vue3');
const esbuild = require('esbuild');

const isWatchMode = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  sourcemap: true,
  outdir: path.join(process.cwd(), 'app/assets/builds'),
  plugins: [rails(), vue()],
  loader: {
    '.js': 'jsx',
  }
};

async function build() {
  if (isWatchMode) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('watching...');
  } else {
    await esbuild.build(buildOptions);
    console.log('build succeeded');
  }
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});