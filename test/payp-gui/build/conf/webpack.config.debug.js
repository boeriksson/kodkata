const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './build/debug/src/debugClient.js'],
    output: {
        path: path.join(__dirname, '../debug/dist/'),
        publicPath: path.join(__dirname, '../../dev-/public/'),
        filename: 'debug.js'
    },
    module: {
        loaders: [
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
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
