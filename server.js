var express = require("express");
var harp = require("harp");
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var multer = require('multer');
var nodeExpressHandlebars = require('nodemailer-express-handlebars');
var handlebars = require('express-handlebars');
var path = require('path');


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

app.use(multer({ 
	dest: './uploads/',
	rename: function (fieldname, filename) {
		console.log(filename, filename);
    return filename
  }
}));

app.post('/contact', function (req, res) {
	var contact = req.body;

	transporter.sendMail({
	    from: 'info@natpaysys.com',
	    to: 'snkain2003@gmail.com',
	    subject: 'Contact Submit',
	    template: 'contact',
	    context: contact
	}, function(err, info){
			if(err) {
				console.log(err);
			}
			if(info) {
				console.log(info);
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