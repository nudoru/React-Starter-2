const {resolve} = require('path');
const webpack = require('webpack');

// Source
const sourcePath = resolve(__dirname, 'front', 'app', 'index.js');

// Destination
const destinationPath = resolve(__dirname, 'front', 'www', 'js', 'app');

// Bools to determine build environment
// const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

module.exports = env => {

  // Helper to remove empty elements from an array. Used in plugins below.
  const removeEmpty = array => array.filter(i => !!i);

  const isProd = env.prod ? true : false;

  console.log('Building env: ',env, isProd, isTest);

  return {

    entry: {
      // Main application
      app   : sourcePath,
      // Vendor libs to include in separate file
      vendor: ['lodash']
    },

    output: {
      path      : destinationPath,
      // Name is replaced with keys from entry block
      filename  : "bundle.[name].js",
      publicPath: 'http://localhost:8080/js/app/'
    },

    devtool: env.prod ? 'source-map' : 'eval',
    bail   : env.prod,

    module: {
      preLoaders: [
        {
          test   : /\.js$/,
          loader : "eslint-loader",
          exclude: ['/node_modules/', '/app/vendor/']
        }
      ],
      loaders   : [
        {
          test  : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file?name=[name].[ext]'
        },

        {
          test  : /\.html?$/,
          loader: "file?name=[name].[ext]"
        },

        {
          test  : /\.(sass|scss)$/,
          loader: 'style-loader!css-loader!sass-loader!autoprefixer-loader?{browsers:["last 2 version", "ie 11"]}'
          // loaders: ["style", "css", "sass"]
        },

        {
          test  : /\.css$/,
          loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "ie 11"]}'
        },

        {
          test   : /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-Webapck?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        },

        {
          test   : /\.jsx?$/,
          loader : 'babel',
          exclude: ['/node_modules/', '/app/vendor/'],
          query  : {
            presets: removeEmpty(['stage-0', 'es2015-loose', 'react', isProd ? undefined : 'react-hmre']),
            // presets: removeEmpty(['stage-0', 'es2015-loose', 'react']),
            compact: true
          }
        },

        {test: /\.css$/, loader: "style!css"}
      ]
    },

    sassLoader: {
      // Support indented terse syntax (SASS files)
      indentedSyntax: true
    },

    eslint: {
      configFile   : './.eslintrc',
      quiet        : false,
      failOnWarning: false,
      failOnError  : true
    },

    plugins: removeEmpty([
      // Optimize ID order
      new webpack.optimize.OccurrenceOrderPlugin(),
      // If we're not in testing, create a separate vendor bundle file
      isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      // If we're in prod, optimization
      isProd ? undefined : new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
      }),
      isProd ? undefined : new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
      })
    ])
  }
};
