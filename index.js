const path = require('path');

const crds = require('crds');
const vrid = require('vrid');

const zeoBlockchain = (opts = {}) => Promise.all([
  crds(opts).listen(),
  (() => {
    const v = vrid(opts);

    if (opts.app) {
      return v.mountApp();
    } else {
      return v.listen();
    }
  })(),
]);

module.exports = zeoBlockchain;

if (!module.parent) {
  zeoBlockchain({
    dataDirectory: path.join(__dirname, 'data'),
  })
    .then(([
      crdsResult,
      vridResult,
    ]) => {
      console.log(vridResult);
    })
    .catch(err => {
      console.warn(err);
      process.exit(1);
    });
}
