;(function(){
	$(document).ready(function(){
		var clock;

		var now = new Date();
		var emvDeadline = new Date('October 1, 2015 00:00:00');
		var diff = emvDeadline.getTime() / 1000 - now.getTime() / 1000;

		clock = $('#emv-countdown').FlipClock(diff, {
			countdown: true,
			showSeconds: true,
			clockFace: 'DailyCounter'
		});
	});
}());

(function(){
	$(document).ready(function(){
		var base = 'http://snaimark.com:9000';
		var $contactForm = $('#contact-form');
		var $documentSubmitForm = $('#doc-submit-form');
		var $portalRegistrationForm = $('#portal-registration-form');

		$contactForm.on('submit', sendContact);
		$documentSubmitForm.on('submit', sendDocumentUpload);
		$portalRegistrationForm.on('submit', sendPortalRegistration);

		function FormHandler(form){
			var $form;

			this.setForm = function(form){
				$form = form;
			};

			this.startContactSending = function(){
				if(!$form) return;
				var $submitButton = $form.find('button[type="submit"]');
				$submitButton.text('Sending...');
			};

			this.endContactSending = function(){
				if(!$form) return;
				var $submitButton = $form.find('button[type="submit"]');
				$submitButton.text('Sent');
				$form[0].reset();
				setTimeout(function(){
					$submitButton.text('Send');
				}, 2000);
			};

			if(form) {
				this.setForm(form);
			}
		}

		function sendContact(event){
			event.preventDefault();

			var formHandler = new FormHandler($contactForm);
			formHandler.startContactSending();
			
			var data = new FormData($contactForm[0]);

			$.ajax({
			  method: "POST",
			  url: base + "/contact",
			  contentType: false,
			  processData: false,
			  data: data
			})
			.complete(function(){
			  formHandler.endContactSending();
			});

	   	return false;
		}

		function sendDocumentUpload(){
			event.preventDefault();

			var formHandler = new FormHandler($documentSubmitForm);
			formHandler.startContactSending();
			
			var data = new FormData($documentSubmitForm[0]);

			$.ajax({
			  method: "POST",
			  url: base + "/document-upload",
			  contentType: false,
			  processData: false,
			  data: data
			})
			.complete(function(){
			  formHandler.endContactSending();
			});

	   	return false;
		}

		function sendPortalRegistration(){
			event.preventDefault();

			var formHandler = new FormHandler($portalRegistrationForm);
			formHandler.startContactSending();
			
			var data = new FormData($portalRegistrationForm[0]);

			$.ajax({
			  method: "POST",
			  url: base + "/portal-registration",
			  contentType: false,
			  processData: false,
			  data: data
			})
			.complete(function(){
			  formHandler.endContactSending();
			});

	   	return false;
		}		

		$.getJSON(base + '/solutionsMeta')
		.then(function(files){
			console.log(files);
		});

		function buildSolutionsSideNav(files){
			var nav = $('#solutions-nav');
			if(!nav.length) {
				return;
			}
		}
	});
}());