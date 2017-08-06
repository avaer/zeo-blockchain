const crds = require('crds');
const vrid = require('vrid');

const zeoBlockchain = () => Promise.all([
  crds().listen(),
  vrid().listen(),
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
