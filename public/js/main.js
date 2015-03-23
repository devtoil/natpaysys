(function(){
	$(document).ready(function(){
		var $contactForm = $('#contact-form');
		var $contactSubmitButton = $('#contact-form-submit');

		$contactForm.on('submit', sendContact);

		function sendContact(event){
			event.preventDefault();

			startContactSending();
			
			var data = new FormData($contactForm[0]);

			$.ajax({
			  method: "POST",
			  url: "/contact",
			  contentType: false,
			  processData: false,
			  data: data
			})
			.success(function(){
				console.log('contact sent successfully');
			  endContactSending();
			})
		  .error(function( msg ) {	
		  	console.log(msg)
		  	endContactSending();
		  });

		   return false;
		}

		function startContactSending(){
			$contactSubmitButton.text('Sending...');
		}

		function endContactSending(){
			$contactSubmitButton.text('Sent');
			$contactForm[0].reset();
			setTimeout(function(){
				$contactSubmitButton.text('Send');
			}, 2000);
		}
	});
	
}());