//"start": "webpack-dev-server --progress --watch-poll --inline --hot --env.dev --content-base front/www/",

const WebpackDevServer = require('webpack-dev-server');
const Webpack          = require('webpack');
const config           = require('../webpack.config.js');

new WebpackDevServer(Webpack(config('development')), {
  contentBase       : 'front/www/',
  hot               : true,
  historyApiFallback: true,
  publicPath        : 'http://localhost:8080/js/app/',
  stats             : {colors: true}
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:8080/')
});