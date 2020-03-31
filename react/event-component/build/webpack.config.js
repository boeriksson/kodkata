const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../../../dist'),
        filename: 'event-component.js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-proposal-pipeline-operator', {'proposal': 'minimal'}],
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    'collect-css-loader', 'css-loader', 'less-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    mode: 'development'
}
