Package.describe({
  name: 'maxkferg:thumbnails',
  version: '0.0.1',
  summary: 'Create and cache thumbnails on the client',
  git: '',
  documentation: 'README.md'
});

function isPDFJS(){
  // Return True is PDFJS is used somewhere in this project
  // This avoids requiring any specific pdf.js package
  var fs = Npm.require('fs');
  var path = Npm.require('path');
  var meteorPackages = fs.readFileSync(path.resolve('.meteor/packages'), 'utf8');
  return !!meteorPackages.match(/pdfjs\n/);
}

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('thumbnails-client.js','client');
  api.addFiles('thumbnails-server.js','server');
  api.export('Thumbnails','client');
  api.use('amplify','client');
  api.use('sha','client');

  if (!isPDFJS()){
    console.log('Using pascoual:pdfjs');
    api.use('pascoual:pdfjs','client');
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('maxkferg:thumbnails');
  api.addFiles('thumbnails-tests.js');
});
