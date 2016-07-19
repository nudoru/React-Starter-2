const {resolve} = require('path');
const webpack = require('webpack');
const buildPath = resolve(__dirname, 'front', 'www', 'js');
const mainPath  = resolve(__dirname, 'front', 'app', 'index.js');
const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

module.exports = env => {
  return {
    entry  : {
      app   : mainPath,
      vendor: ['lodash']
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
    },
    plugins: [
      isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
    ].filter(p => !!p)
  }
};
