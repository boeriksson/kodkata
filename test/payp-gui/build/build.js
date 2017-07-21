'use strict';

/* eslint-disable */

var webpack = require('webpack');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var path = require('path');
const env = require('./conf/env');


const buildArchetype = process.argv[2];
const buildModule = process.argv[3];
const buildTheme = process.argv[4];

const webpackConfig = require('./conf/webpack.config')(buildModule, buildTheme);

webpackConfig.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/(.*)DEBUG(\.*)/, function(resource) {
        resource.request = path.join(__dirname, '../../app/components/common/dummy.jsx');
                // DEBUG imports should not exist in production
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

// webpackConfig.plugins.push(new BundleAnalyzerPlugin());

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
);

webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

webpack(webpackConfig, function(err, stats) {
    console.log('webpack build: ', stats.toString({
        colors: true
    }));
});
