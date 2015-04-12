(function(){
	$(document).ready(function(){
		var base = 'http://snaimark.com:9000';
		var $contactForm = $('#contact-form');
		var $contactSubmitButton = $('#contact-form-submit');

		$contactForm.on('submit', sendContact);

		function sendContact(event){
			event.preventDefault();

			startContactSending();
			
			var data = new FormData($contactForm[0]);

			$.ajax({
			  method: "POST",
			  url: base + "/contact",
			  contentType: false,
			  processData: false,
			  data: data
			})
			.success(function(){
			  endContactSending();
			})
		  .error(function( msg ) {	
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