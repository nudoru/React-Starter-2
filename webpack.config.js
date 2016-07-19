const {resolve} = require('path');

let buildPath = resolve(__dirname, 'front', 'www', 'js'),
    mainPath  = resolve(__dirname, 'front', 'app', 'index.js');

module.exports = env => {
  return {
    entry  : mainPath,
    output : {
      path    : buildPath,
      filename: "bundle.js",
      pathinfo: !env.prod,
    },
    devtool: env.prod ? 'source-map' : 'eval',
    bail   : env.prod,
    module : {
      loaders: [
        {test: /\.css$/, loader: "style!css"}
      ]
    }
  }
}
