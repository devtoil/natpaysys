var express = require("express");
var harp = require("harp");
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var multer = require('multer');
var nodeExpressHandlebars = require('nodemailer-express-handlebars');
var handlebars = require('express-handlebars');
var path = require('path');
var fs = require('fs');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'snkain2003@gmail.com',
        pass: 'clarinet_2013'
    }
});

var viewEngine = handlebars.create({});

var sut = nodeExpressHandlebars({
    viewEngine: viewEngine,
    viewPath: path.resolve(__dirname, './emails'),
    extName: '.hb'
});

transporter.use('compile', sut);

app.use(bodyParser.json());
app.use(express.urlencoded());

// uploads files to a directory and populates req.files with file objects
app.use(multer({ 
	putSingleFilesInArray: true,
	dest: './uploads/',
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

app.post('/contact', function (req, res) {
	var contact = req.body,
			files = req.files,
      statement,
			attachments = [];

  if(files.statement) {
    statement =  files.statement[0];
    attachments.push({
        filename: statement.originalname,
        path: statement.path
    });
  }

	transporter.sendMail({
	    from: 'info@natpaysys.com',
	    to: 'snkain2003@gmail.com',
	    subject: 'Contact Submit',
	    template: 'contact',
	    context: contact,
	    attachments: attachments
	}, function(err, info){
			if(err) {
				console.log(err);
			}
			if(info) {
				console.log('mail sent ', info);
        res.status(200);
        res.send(info);
			}
	});
});

app.configure(function(){
   app.use(express.static(__dirname + "/public"));
   app.use(harp.mount(__dirname + "/public"));
});

app.listen(9000, function(){
	console.log('app listening');
});