const { Readable } = require('stream');

const isCommandline = (userAgent) => {
  return (userAgent.search(/curl|wget|httpie/i) !== -1);
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
