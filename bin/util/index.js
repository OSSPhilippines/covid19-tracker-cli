const { Readable } = require('stream');

const isCommandline = (userAgent) => {
  const check = (userAgent.search(/curl|wget/i) !== -1);
  return check;
};

const getStream = (req, res) => {
  const stream = new Readable();
  stream.pipe(res);
  stream._read = () => {};
  req.on('close', () => {
    stream.destroy();
  });
  return stream;
};

module.exports = {
  isCommandline,
  getStream,
};
