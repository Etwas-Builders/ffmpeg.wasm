const resolveURL = require('resolve-url');
/*
 * Default options for browser environment
 */
module.exports = {

  corePath:
    // eslint-disable-next-line no-nested-ternary
    typeof process !== 'undefined' && process.env.FFMPEG_ENV === 'development'
      ? resolveURL('/node_modules/@ffmpeg/core/ffmpeg-core.js')
      : process.env.PUBLIC_URL
        ? `${process.env.PUBLIC}/ffmpeg-core.js`
        : '/ffmpeg-core.js',
};
