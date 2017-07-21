const webpack = require('webpack');
const debugWebpackConfig = require('./conf/webpack.config.debug.js');
const express = require('express');
const path = require('path');
const spawn = require('child_process').spawn;
const app = express();

webpack(debugWebpackConfig, (err, stats) => {
    console.log('webpack build: ', stats.toString({
        colors: true
    }));
});

const getArchetype = (method) => {
    switch (method) {
        case 'entercash': return 'deposit';
        case 'trustly-deposit': return 'deposit';
        case 'siirto-deposit': return 'deposit';
        case 'envoy-deposit': return 'deposit';
        case 'entercash-withdrawal': return 'withdrawal';
        case 'trustly-withdrawal': return 'withdrawal';
        default:
            throw new Error('unknown method specified');
    }
};

const devServerPublic = 'build/dev-server/public/';
console.log('devServerPublic: ', devServerPublic);
app.get('/', (req, res) => {
    console.log('HIT!!!');
    res.sendFile('debug.html', { root: path.resolve(__dirname, 'debug/public/') });
});
app.get('*/debug.js', (req, res) => {
    console.log('debug!!!');
    res.sendFile('debug.js', { root: path.resolve(__dirname, 'debug/dist/') });
});

app.get('/initial', (req, res) => {
    console.log('Loading initial...');
    res.sendFile('initial.html', { root: path.resolve(__dirname, 'debug/public/')});
});

app.get('/startserver', (req, res) => {
    console.log('Loading entercash_unibet on port: ', req.query.port);
    const method = req.query.method;
    const theme = req.query.theme;
    const port = req.query.port;
    const archetype = getArchetype(method);
    const entercashUnibet = spawn('node', ['build/devServer.js', archetype, method, theme, port]);
    entercashUnibet.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
        if (data.includes('webpack: Compiled successfully.')) {
            res.json({
                entercash_unibet: true,
                port: req.query.port
            });
        }
    });
    entercashUnibet.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });
    entercashUnibet.on('close', function(code) {
        console.log('closing code: ' + code);
    });

    //res.sendFile('index_unibet.html', { root: path.resolve(__dirname, 'dev-server/public/dist/entercash/')});
});

app.listen(80, () => {
    console.log('Listening to port 80!');
});

