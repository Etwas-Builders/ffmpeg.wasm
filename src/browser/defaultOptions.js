const defaultOptions = require('../constants/defaultOptions');

/*
 * Default options for browser worker
 */
module.exports = {
  ...defaultOptions,
  corePath:
    process.env.PUBLIC_URL
      ? `${process.env.PUBLIC_}/ffmpeg-core.js`
      : 'https://cdn.modfy.video/ffmpeg-core.js',
};
