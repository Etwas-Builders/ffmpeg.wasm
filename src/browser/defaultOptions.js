/* eslint-disable no-nested-ternary */
const resolveURL = require('resolve-url');
const defaultOptions = require('../constants/defaultOptions');

/*
 * Default options for browser worker
 */
module.exports = {
  ...defaultOptions,
  corePath:
    typeof process !== 'undefined' && process.env.FFMPEG_ENV === 'development'
      ? resolveURL('/node_modules/@ffmpeg/core/ffmpeg-core.js')
      : process.env.PUBLIC_URL
        ? `${process.env.PUBLIC_}/ffmpeg-core.js`
        : 'https://cdn.modfy.video/ffmpeg-core.js',
};
