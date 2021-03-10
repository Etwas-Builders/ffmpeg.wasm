module.exports = (options) => {
  const opts = { ...options };
  ['corePath'].forEach((key) => {
    if (typeof options[key] !== 'undefined') {
      opts[key] = new URL(opts[key]);
    }
  });
  return opts;
};
