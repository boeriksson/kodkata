
const http = require('http');
const fs = require('fs');

const options = {
  host: 'www.google.com'
  , port: 80
  , path: '/images/logos/ps_logo2.png'
}

const req = http.get(options, function(res) {
  var imagedata = '';
  res.setEncoding('binary');

  res.on('data', function(chunk) {
    imagedata += chunk;
  });

  res.on('end', function() {
    fs.writeFile('logo.png', imagedata, 'binary', function(err) {
      if (err) throw err;
      console.log('File saved.');
    });
  });
})