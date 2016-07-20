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
          test  : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file?name=[name].[ext]'
        },
        {
          test  : /\.html$/,
          loader: "file?name=[name].[ext]"
        },
        {
          test   : /\.sass$/,
          loaders: ["style", "css", "sass"]
        },
        {
          test   : /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
        {
          test  : /\.css$/,
          loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "ie 11"]}'
        },
        {
          test   : /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        },
        {
          test   : /\.js$/,
          loader : 'babel!eslint',
          exclude: ['/node_modules/', '/app/vendor/']
        },
        {test: /\.css$/, loader: "style!css"}
      ]
    },
    sassLoader: {
      indentedSyntax: true
    },
    eslint    : {
      configFile   : './.eslintrc',
      quiet        : false,
      failOnWarning: false,
      failOnError  : false
    },
    plugins: removeEmpty([
      new webpack.optimize.OccurrenceOrderPlugin(),
      isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      isProd ? undefined : new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
      })
    ])
  }
};
