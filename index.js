const path = require('path');

const crds = require('crds');
const vrid = require('vrid');

const zeoBlockchain = ({
  dataDirectory = path.join(__dirname, 'data'),
} = {}) => Promise.all([
  crds({dataDirectory}).listen(),
  vrid({dataDirectory}).listen(),
])
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

module.exports = zeoBlockchain;

if (!module.parent) {
  zeoBlockchain();
}
