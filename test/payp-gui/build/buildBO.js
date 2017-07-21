'use strict';

/* eslint-disable */

var webpack = require('webpack');

const buildArchetype = process.argv[2];
const buildModule = process.argv[3];

const options = {
    archetype: buildArchetype,
    module: buildModule
};

const webpackConfig = require('./conf/webpack.config.bo.js')(options);

webpack(webpackConfig, function(err, stats) {
    console.log('webpack build: ', stats.toString({
        colors: true
    }));
});



