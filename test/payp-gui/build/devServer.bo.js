'use strict';

/* eslint-disable */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

const buildArchetype = process.argv[2];
const buildModule = process.argv[3];

const options = {
    archetype: buildArchetype,
    module: buildModule
};

var devConfig = require('./conf/devServer.' + buildModule);

const webpackConfig = require('./conf/webpack.config.bo.js')(options, true, true);

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.entry.push('webpack/hot/dev-server');
webpackConfig.entry.push('webpack-dev-server/client?http://localhost:8080');

//This has to be an absolute path when running dev server this way, but that does not work in real Go-build?!
webpackConfig.output.path = path.resolve(__dirname,  webpackConfig.output.path, '');

var app  = new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    contentBase: './build/dev-server/public',
    inline: true,
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: { colors: true },
    setup: function (app) {
        devConfig.setup(app);
    }
});

app.listen(8080, 'localhost', function (error, result) {
    if (error) {
        console.log(error);
    }
    console.log('Listening at localhost:8080');
});

devConfig.setupExternalMocks();
