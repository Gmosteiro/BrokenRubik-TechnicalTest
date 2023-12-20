
function service(request, response) {
	'use strict';
	try {
		require('GM.RickAndMorty.ServiceController').handle(request, response);
	}
	catch (ex) {
		console.log('GM.RickAndMorty.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}