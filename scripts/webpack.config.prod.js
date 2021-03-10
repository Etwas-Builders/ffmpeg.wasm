const path = require('path');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');
const common = require('./webpack.config.common');
const pkg = require('../package.json');

const genConfig = ({
  entry, filename, library, libraryTarget,
}) => ({
  ...common,
  mode: 'production',
  devtool: 'source-map',
  entry,
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename,
    library,
    libraryTarget,
  },
  plugins: [
    // It's a good idea to only run this plugin when you're building a bundle
    // that will be released, rather than for every development build
    new BugsnagSourceMapUploaderPlugin({
      apiKey: 'e82675fcdc3048e47b968595a0bc2d7f',
      appVersion: pkg.version,
    }),
  ],

});

module.exports = [
  genConfig({
    entry: path.resolve(__dirname, '..', 'src', 'index.js'),
    filename: 'ffmpeg.min.js',
    library: 'FFmpeg',
    libraryTarget: 'umd',
  }),
];
