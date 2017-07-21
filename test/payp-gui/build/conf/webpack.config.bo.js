const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
//const env = require('./env');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//console.log('Output: ', env.BUILD_OUTPUT_PATH);

var outputPath = path.join(__dirname, `../../dist/bo-ui/`);
const devOutputBasePath = path.resolve('C:/unibet/generated');

process.noDeprecation = true;

module.exports = function (options, isDev, doForceDefaultOutput) {
    var providerPathPrefix = ''; // We only have separate provider paths prefixes when we run locally.

    var plugins = [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } }),
        new webpack.DefinePlugin({
            config: JSON.stringify({
                archetype: options.archetype,
                module: options.module
            })
        })
        // new BundleAnalyzerPlugin()
    ];

    if (isDev) {
        if (!doForceDefaultOutput) {
            providerPathPrefix = '/' + options.module;
            outputPath = devOutputBasePath + providerPathPrefix + env.BUILD_PUBLIC_PATH;
        }
    } else {
        plugins.push(
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            })
        );

        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );
    }

    console.log('Using this outputPath for BO: ' + outputPath);

    return {
        entry: ['babel-polyfill', './bo-app/' + options.module + '.js'],
        devtool: 'source-map',
        output: {
            path: outputPath,
            publicPath: '/bo-ui/',
            filename: options.module + '-bo.js',
            libraryTarget: 'umd',
            library: options.module + '-' + 'BoNpm'
        },
        module: {
            rules: [
                {
                    test: /.*.scss$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { 'modules': false }],
                            'stage-0',
                            'react'
                        ]
                    }
                },
                {
                    test: /\.js[x]?$/,
                    loader: 'string-replace-loader',
                    exclude: /node_modules/,
                    query: {
                        search: /MODULE/g,
                        replace: options.module
                    }
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
        plugins: plugins,
        externals: {
            context: 'context'
        }
    };
};
