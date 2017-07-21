/**
 * This script replaces a string in the devserver mock tree, and is intended to
 * be used for exchanging the localhost to individual hostnames.
 *
 * Usage: node replaceHostName <string-to-be-replaced> <replacement-string>
 */

var fs = require('fs');
var path = require('path');

var walk =
fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    console.log('length: ', list.length);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        console.log('file: ', file);
    });
});
