'use strict';

var mailTransport = require('../config/mail');
var contactSubmitRecipients = 'snkain2003@gmail.com';

function prepareAttachments(key, files){
	var file, attachments = [];
	if(files && files[key]) {
	  file =  files[key][0];
	  attachments.push({
	      filename: file.originalname,
	      path: file.path
	  });
	}
	return attachments;
}

module.exports = {
	doContactSubmit: function(req, res){
		var self = this;
		var contact = req.body,
				files = req.files,
	      statement,
				attachments = prepareAttachments('statement', files);

	  if(files && files.statement) {
	    statement =  files.statement[0];
	    attachments.push({
	        filename: statement.originalname,
	        path: statement.path
	    });
	  }

		mailTransport.sendMail({
		    from: 'info@natpaysys.com',
		    to: contactSubmitRecipients,
		    subject: 'Contact Submit',
		    template: 'contact',
		    context: contact,
		    attachments: attachments
		}, function(err, info){
				if(err) {
					console.log(err);
					return;
				}

				console.log('mail sent ', info);
        if(contact.email) {
          self.sendConfirmationEmail(contact);
        }
        
        res.status(200);
        res.send(info);
		});
	},
	doDocumentSubmit: function(req, res){
			var self = this;
			var contact = req.body,
					files = req.files,
		      statement,
					attachments = prepareAttachments('document', files);

			mailTransport.sendMail({
			    from: 'info@natpaysys.com',
			    to: contactSubmitRecipients,
			    subject: 'New Document',
			    template: 'document-upload',
			    context: contact,
			    attachments: attachments
			}, function(err, info){
					if(err) {
						console.log(err);
						return;
					}

					console.log('mail sent ', info);
	        if(contact.email) {
	          self.sendConfirmationEmail(contact);
	        }
	        
	        res.status(200);
	        res.send(info);
			});
	},
	doPortalRegistrationSubmit: function(req, res){
			var self = this;
			var contact = req.body;

			mailTransport.sendMail({
			    from: 'info@natpaysys.com',
			    to: contactSubmitRecipients,
			    subject: 'New Portal Registration',
			    template: 'portal-registration',
			    context: contact
			}, function(err, info){
					if(err) {
						console.log(err);
						return;
					}

					console.log('mail sent ', info);
	        if(contact.email) {
	          self.sendConfirmationEmail(contact);
	        }
	        
	        res.status(200);
	        res.send(info);
			});
	},
	sendConfirmationEmail: function(contact){
		if(!contact.email) {
			return;
		}

		mailTransport.sendMail({
		    from: 'info@natpaysys.com',
		    to: contact.email,
		    subject: 'Contact Received',
		    template: 'email-sent',
		}, function(err, info){
		    if(err) {
		      console.log(err);
		      return;
		    }

		    console.log('confirmation mail sent ', info);
		});
	}
}