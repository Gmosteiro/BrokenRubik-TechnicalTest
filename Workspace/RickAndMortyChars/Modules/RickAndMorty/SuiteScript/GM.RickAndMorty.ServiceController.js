define("GM.RickAndMorty.ServiceController", ["ServiceController"], function (
	ServiceController
) {
	"use strict";

	return ServiceController.extend({
		name: "GM.RickAndMorty.ServiceController",

		options: {
			common: {}
		},

		get: function get() {
			try {

				var suiteletUrl = nlapiResolveURL("SUITELET", 'customscript_gm_rick_and_morty', 'customdeploy_gm_rick_and_morty', true);

				var operation = this.request.getParameter('operation')
				var characterId = this.request.getParameter('characterId')

				nlapiLogExecution("ERROR", "operation", operation);
				nlapiLogExecution("ERROR", "characterID", characterId);

				suiteletUrl += '&operation=' + operation
				suiteletUrl += characterId ? '&characterId=' + characterId : ''

				nlapiLogExecution("ERROR", "suiteletURl", suiteletUrl);
				var response = nlapiRequestURL(suiteletUrl);

				if (response.getBody()) {
					return response.getBody();
				} else {
					return JSON.stringify({ status: 400, error: 'Empty Response' });
				}

			} catch (error) {
				nlapiLogExecution("ERROR", "Catch GET Method", error);
				return JSON.stringify({ error: error });

			}
		},

		post: function post() {
			try {

				var suiteletUrl = nlapiResolveURL("SUITELET", 'customscript_gm_rick_and_morty', 'customdeploy_gm_rick_and_morty', true);

				nlapiLogExecution("ERROR", "this.data", this.data.characterData);

				var response = nlapiRequestURL(suiteletUrl, this.data.characterData);

				if (response.getBody()) {
					return response.getBody();
				} else {
					return JSON.stringify({ status: 400, error: 'Empty Response' });
				}

			} catch (error) {
				nlapiLogExecution("ERROR", "Catch POST Method", error);
				return JSON.stringify({ error: error });
			}
		},

		put: function put() {
			// not implemented
		},

		delete: function () {
			// not implemented
		}
	});
});
