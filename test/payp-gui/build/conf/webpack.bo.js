const webpack = require('webpack');
const env = require('./env');
const path = require('path');

const outputPath = path.join(__dirname, `../${env.BUILD_OUTPUT_PATH}/bo-ui`);

const provider = process.argv[2];

/* eslint-disable */

function getConfigByModule(module) {
    return {
        entry: './bo-app/bo-index.js',
        devtool: 'source-map',
        output: {
            path: outputPath,
            publicPath: '/bo-ui/',
            filename: `${module}-bo.js`,
            libraryTarget: 'umd',
            library: `${module}-boNpm`
        },
        module: {
            loaders: [
                {
                    test: /.*.scss$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                },

                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [
                'node_modules',
                './bo-app'
            ]
        },
        externals: {
            context: 'context'
        }
    };
}

const webpackConfig = getConfigByModule(provider);
webpack(webpackConfig, function(err, stats) {
    if (err) {
        console.log('Error building BO: ', err);
    }
});