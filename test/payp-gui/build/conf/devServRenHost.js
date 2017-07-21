/**
 * This script replaces a string in the devserver mock tree, and is intended to
 * be used for exchanging the localhost to individual hostnames.
 *
 * It will look in a devServRenHost.current to find a string to search for, and replace
 * that with either hostname Or localhost.
 *
 * If no devServRenHost.current file exist it will assume localhost and try to set
 * hostname in mockfiles to hostname
 *
 * Usage: node replaceHostName
 */

var fs = require('fs');
var path = require('path');
var os = require('os');
var string1; // string to be replaced
var string2; // replacement string
var hostname = os.hostname().toLowerCase() + '.unibet.com';
var currentFile = './devServRenHost.current';

process.chdir(__dirname);
console.log(__dirname);

if (fs.existsSync(currentFile)) {
    fs.readFile(currentFile, 'utf8', function(err, data) {
       if (err) { return console.log('Error reading currentfile: ', err); }
       if (data === 'localhost') {
           string1 = 'localhost';
           string2 = hostname;
       } else {
           string1 = data;
           string2 = 'localhost';
       }
    });
} else {
    string1 = 'localhost';
    string2 = hostname;
}

var results = [];

var replaceStringInFile = function(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) { return console.log(err); }

        var replaceRegex = new RegExp(string1, 'g');
        var result = data.replace(replaceRegex, string2);

        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
};

var walk = function(dir, done) {
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null);
        list.forEach(function (file) {
            var fileName = path.resolve(dir, file);
            fs.stat(fileName, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(fileName, function(err, res) {
                        if (!--pending) done(null, results);
                    });
                } else {
                    replaceStringInFile(fileName);
                    if (!--pending) done(null);
                }
            });
        });
    });
};

walk('../dev-server/public', function(error) {
    fs.readdir('.', function (err, list) {
        if (err) return console.log('error listing directory: ', err);
        list.forEach(function (file) {
            if (file.match(/^devServer\./)) {
                replaceStringInFile(file);
            }
        });

    });

    replaceStringInFile('../devServer.js');

    if (fs.existsSync(currentFile)) {
        fs.unlinkSync(currentFile);
    }
    fs.appendFile(currentFile, string2, function(err) {
        if (err) {
            console.log('Could not write currentFile: ', string2);
            console.log('err: ', err);
        }
        console.log('Devserver mock hostname changed to: ', string2);
    });
});
