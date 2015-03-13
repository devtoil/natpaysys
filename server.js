var express = require("express");
var harp = require("harp");
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var multer = require('multer');

var transporter = nodemailer.createTransport({
    service: 'Godaddy',
    auth: {
        user: 'Info@natpaysys.com',
        pass: 'Natpaysys14$'
    }
});

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(multer({ dest: './uploads/'}));

app.post('/contact', function (req, res) {
	console.log(req.body);
	console.log(req.files);
	var body = req.body;
	var html = [];
	for(var item in body) {
		html.push('<p>');
		html.push(item);
		html.push(': ');
		html.push(body[item]);
		html.push('<p>');
	}

	transporter.sendMail({
	    from: 'info@natpaysys.com',
	    to: 'snkain2003@gmail.com',
	    subject: 'Contact Submit',
	    html: html
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