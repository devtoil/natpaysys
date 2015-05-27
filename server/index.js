var express = require("express");
var harp = require("harp");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var ContactController = require('./controllers/contact');
var path = require('path');
var publicPath = path.resolve(__dirname, '../public');

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(function(req, res, next){
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  next();
});

// app.get('/', function(req, res){
//   res.end('Hi from NatPaySys');
// });

// uploads files to a directory and populates req.files with file objects
app.use(multer({ 
	putSingleFilesInArray: true,
	dest: './uploads',
	rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + '-' + Date.now();
  },
  onFileUploadStart: function (file, req, res) {
    console.log(file.fieldname + ' has begun uploading');
  },
  onFileUploadComplete: function (file, req, res) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  },
  onError: function (error, next) {
    console.log(error);
    next(error);
  }
}));

app.get('/solutionsMeta', function(req, res){
  var solutionsPath = path.resolve(__dirname, '../public/_shared/partials/solutions');
  fs.readdir(solutionsPath, function(err, files){
    if(err) {
      console.log(err);
      return;
    }

    var names = [].map.call(files, function(file){
      return file.split('.')[0];
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(names));
  });
});

app.post('/contact', function (req, res) {
  ContactController.doContactSubmit(req, res);
});
app.post('/document-upload', function (req, res) {
  ContactController.doDocumentSubmit(req, res);
});
app.post('/portal-registration', function (req, res) {
  ContactController.doPortalRegistrationSubmit(req, res);
});

app.use(express.static(publicPath));
app.use(harp.mount(publicPath));

app.listen(9000, function(){
	console.log('app listening on port: ' + 9000);
});