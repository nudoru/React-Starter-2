const {resolve} = require('path');

let buildPath = resolve(__dirname, 'front', 'www', 'js'),
    mainPath  = resolve(__dirname, 'front', 'app', 'index.js');

module.exports = env => {
  return {
    entry  : {
      app: mainPath
    },
    output : {
      path    : buildPath,
      filename: "bundle.[name].js",
      pathinfo: !env.prod,
    },
    devtool: env.prod ? 'source-map' : 'eval',
    bail   : env.prod,
    module : {
      loaders: [
        {test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/},
        {test: /\.css$/, loader: "style!css"}
      ]
    }
  }
}
