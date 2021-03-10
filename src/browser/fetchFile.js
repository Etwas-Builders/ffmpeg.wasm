const { default: Bugsnag } = require('@bugsnag/js');

/**
 * readFromBlobOrFile
 *
 * @name readFromBlobOrFile
 * @function
 * @access private
 */
const readFromBlobOrFile = (blob) => (
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = ({ target: { error: { code } } }) => {
      reject(Error(`File could not be read! Code=${code}`));
    };
    fileReader.readAsArrayBuffer(blob);
  })
);

module.exports = async (_data) => {
  let data = _data;
  if (typeof _data === 'undefined') {
    return 'undefined';
  }

  const url = new URL(_data).toString();

  try {
    if (typeof _data === 'string') {
      // Base64 _data
      if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(_data)) {
        data = atob(_data.split(',')[1])
          .split('')
          .map((c) => c.charCodeAt(0));
      } else {
        const res = await fetch(url);
        data = await res.arrayBuffer();
      }
    } else if (_data instanceof File || _data instanceof Blob) {
      data = await readFromBlobOrFile(_data);
    }

    return new Uint8Array(data);
  } catch (err) {
    Bugsnag.notify(err, (event) => {
      event.addMetadata('fetchFile', {
        data,
        originalData: _data,
        url,
      });
    });
    throw new Error(err);
  }
};
