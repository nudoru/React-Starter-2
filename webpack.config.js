const {resolve} = require('path');
const webpack   = require('webpack');
const buildPath = resolve(__dirname, 'front', 'www', 'js', 'app');
const mainPath  = resolve(__dirname, 'front', 'app', 'index.js');
const isProd    = process.env.NODE_ENV === 'production';
const isTest    = process.env.NODE_ENV === 'test';

module.exports = env => {
  const removeEmpty = array => array.filter(i => !!i);
  return {
    entry  : {
      app   : mainPath,
      vendor: ['lodash']
    },
    output : {
      path      : buildPath,
      filename  : "bundle.[name].js",
      publicPath: 'http://localhost:8080/js/app/'
    },
    devtool: env.prod ? 'source-map' : 'eval',
    bail   : env.prod,
    module : {
      loaders: [
        {
          test   : /\.js$/,
          loader : 'babel!eslint',
          exclude: ['/node_modules/', '/app/vendor/']
        },
        {test: /\.css$/, loader: "style!css"}
      ]
    },
    plugins: removeEmpty([
      isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      isProd ? undefined : new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
      })
    ])
  }
};
