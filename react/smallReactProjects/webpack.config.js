const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', path.join(__dirname, './src/index.js')],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js'
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
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        showErrors: true,
        template: 'src/template.html',
        inject: 'body'
    })],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
