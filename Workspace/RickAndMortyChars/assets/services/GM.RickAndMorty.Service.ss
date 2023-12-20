
function service(request, response)
{
	'use strict';
	try 
	{
		require('GastonM.RickAndMortyChars.GM.RickAndMorty.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('GastonM.RickAndMortyChars.GM.RickAndMorty.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}