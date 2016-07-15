var path = require('path'),
    nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'front', 'www', 'js'),
    mainPath = path.resolve(__dirname, 'front', 'app', 'index.js');


module.exports = {
    entry: mainPath,
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    }
};