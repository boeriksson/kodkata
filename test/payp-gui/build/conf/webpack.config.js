const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const env = require('./env');
const path = require('path');

const outputPath = path.join(__dirname, `../../${env.BUILD_OUTPUT_PATH}${env.BUILD_PUBLIC_PATH}`);

/* eslint-disable */

module.exports = function (module, theme) {

    const themeImportName = getThemeImportName(theme);

    return {
        entry: ['babel-polyfill', './app/' + module + '.js'],
        devtool: 'source-map',
        output: {
            path: outputPath,
            publicPath: env.BUILD_PUBLIC_PATH,
            filename: module + '-' + theme + '.js',
            libraryTarget: 'umd',
            library: module + '-' + theme + 'Npm',
        },
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { "modules": false }],
                            'stage-0',
                            'react'
                        ]
                    }
                },
                {test: /\.eot$/, loader: 'file-loader'},
                {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'},
                {test: /\.jpg$/, loader: "file-loader"},
                {test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png"},
                {test: /\.gif$/, loader: "url-loader?limit=100000&mimetype=image/gif"},
                {
                    test: /\.(ttf|woff|woff2)$/,
                    loader: 'file-loader?name=theme/' + theme + '/fonts/[name].[ext]'
                },
                {
                    test: /\.js[x]?$/,
                    loader: 'string-replace-loader',
                    exclude: /node_modules/,
                    query: {
                        multiple: [
                            {search: /THEMEHOLDER/g, replace: themeImportName},
                        ]
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [
                'node_modules',
                './app'
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({options: {postcss: [autoprefixer]}}),
            new webpack.NormalModuleReplacementPlugin(/(.*)MODULE(\.*)/, function(resource) {
                const filePath = path.join(resource.context, resource.request.replace(/MODULE/, `${module}`));
                const fs = require('fs');
                if(fs.existsSync(filePath)) {
                    resource.request = resource.request.replace(/MODULE/, `${module}`);
                    console.log('resource.request: ', resource.request);
                } else {
                    resource.request = path.join(__dirname, '../../app/components/common/dummy.jsx');
                }
            })
        ],
        externals: {
            context: 'context',
            translations: 'translations'
        }
    };
};

function getThemeImportName(theme) {
    var sTheme = theme ? theme.toLowerCase() : '';

    switch (sTheme) {
        case 'bingo_com':
            sTheme = 'bingo';
            break;
        case 'maria2':
            sTheme = 'maria';
            break;
        default:
    }
    return 'Theme' + capitalize(sTheme);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}