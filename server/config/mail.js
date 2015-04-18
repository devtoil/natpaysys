var nodemailer = require('nodemailer');
var handlebars = require('express-handlebars');
var nodeExpressHandlebars = require('nodemailer-express-handlebars');
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
    viewPath: path.resolve(__dirname, '../emails'),
    extName: '.hb'
});

transporter.use('compile', sut);

module.exports = transporter;