Package.describe({
  name: 'maxkferg:thumbnails',
  version: '0.1.0',
  summary: 'Create and cache thumbnails on the client',
  git: 'https://github.com/NitroLabs/meteor-thumbnails',
  documentation: 'README.md'
});

/*
function isPDFJS(){
  // Return True is PDFJS is used somewhere in this project
  // This avoids requiring any specific pdf.js package
  var fs = Npm.require('fs');
  var path = Npm.require('path');
  var packagedir = path.resolve('.meteor/packages');
  if (fs.existsSync(packagedir)){
    var meteorPackages = fs.readFileSync(packagedir, 'utf8');
    return !!meteorPackages.match(/pdfjs\n/);
  } else {
    return false;
  }
}
*/

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('thumbnails-client.js','client');
  api.addFiles('thumbnails-server.js','server');
  api.export('Thumbnails','client');
  api.use('amplify@1.0.0','client');
  api.use('sha','client');
  //api.use('pascoual:pdfjs@1.1.114','client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('maxkferg:thumbnails');
  api.addFiles('thumbnails-tests.js');
});
