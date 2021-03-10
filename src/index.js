require('regenerator-runtime/runtime');
const Bugsnag = require('@bugsnag/js');
const createFFmpeg = require('./createFFmpeg');

Bugsnag.start({ apiKey: 'e82675fcdc3048e47b968595a0bc2d7f' });

module.exports = {
  createFFmpeg,
};
