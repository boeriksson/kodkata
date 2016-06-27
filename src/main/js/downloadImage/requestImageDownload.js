const request = require('request');
const fs = require('fs');

const req = request.get('http://www.google.com/images/logos/ps_logo2.png').on('response', (response) => {
  if (response.statusCode == 200) {
    fs.writeFile('logo2.png', response.body, function() {
      console.log('Successfully downloaded file ' + url);
    });
  } else {
    console.log('no Cigar: ', response.statusCode);
  }
});
