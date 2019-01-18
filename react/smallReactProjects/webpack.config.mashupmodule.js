const path = require('path');

module.exports = {
    entry: ['babel-polyfill', path.join(__dirname, './src/mashup-component/module.js')],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'mashupModule.js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [['env', { 'modules': false }], 'react', 'stage-0'],
                    plugins: ['transform-async-to-generator']
                }
            },
            {
                test: /\.(gif)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/gif'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
