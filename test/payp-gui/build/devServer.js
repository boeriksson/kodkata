'use strict';

/* eslint-disable */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
const env = require('./conf/env');

const buildArchetype = process.argv[2];
const buildModule = process.argv[3];
const buildTheme = process.argv[4];

const runLocal = true;

var devConfig = require('./conf/devServer.' + buildModule);
const webpackConfig = require('./conf/webpack.config')(buildModule, buildTheme, runLocal);

webpackConfig.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/(.*)DEBUG(\.*)/, function(resource) {
        resource.request = resource.request.replace(/DEBUG/, 'debug');
        // DEBUG imports should only exist when running locally
    })
);

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        config: JSON.stringify({
            archetype: buildArchetype,
            module: buildModule
        })
    })
);
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.entry.push('webpack/hot/dev-server');
webpackConfig.entry.push('webpack-dev-server/client?http://127.0.0.1:8080');
webpackConfig.output.path = path.resolve(__dirname,  env.BUILD_OUTPUT_PATH, 'ui');
        // This has to be an absolute path when running dev server this way, but that does not work in real Go-build?!

var app  = new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    contentBase: './build/dev-server/public',
    inline: true,
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: { colors: true },
    setup: function (app) {
        devConfig.setup(app);
    }
});

app.listen(8080, '127.0.0.1', function (error, result) {
    if (error) {
        console.log(error);
    }
    console.log('Listening at localhost:8080');
});

devConfig.setupExternalMocks();
