const path = require('path');

const crds = require('crds');
const vrid = require('vrid');

const _requestVrid = opts => {
  const v = vrid(opts);

  if (opts.app) {
    return v.mountApp();
  } else {
    return v.listen();
  }
};
const _requestCrds = opts => {
  const c = crds(opts);

  return c.listen()
    .then(destroy => {
      c.destroy = destroy;
      return c;
    })
    .then(c => {
      if (opts.cli) {
        return c.cli()
          .then(() => c);
      } else {
        return c;
      }
    });
};

const zeoBlockchain = (opts = {}) => _requestVrid(opts)
  .then(v => {
    if (!opts.app) {
      console.log('Admin page: ' + v.url);
    }

    return _requestCrds(opts)
      .then(c => ([
        c,
        v,
      ]));
  });
module.exports = zeoBlockchain;

if (!module.parent) {
  zeoBlockchain({
    dataDirectory: path.join(__dirname, 'data'),
    cli: true,
  })
    .then(([
      crdsResult,
      vridResult,
    ]) => {
      crdsResult.on('exit', () => {
        crdsResult.destroy();
        vridResult.destroy();
      });
    })
    .catch(err => {
      console.warn(err);
      process.exit(1);
    });
}
