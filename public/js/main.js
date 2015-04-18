(function(){
	$(document).ready(function(){
		// var base = 'http://snaimark.com:9000';
		var base = '';
		var $contactForm = $('#contact-form');
		var $documentSubmitForm = $('#doc-submit-form');
		var $contactSubmitButton = $('#contact-form-submit');

		$contactForm.on('submit', sendContact);
		$documentSubmitForm.on('submit', sendDocumentUpload);

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