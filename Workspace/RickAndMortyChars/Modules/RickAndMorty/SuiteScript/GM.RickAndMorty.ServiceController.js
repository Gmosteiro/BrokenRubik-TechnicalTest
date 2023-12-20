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
				var SL_SCRIPT_ID = "customscript_gm_sl_rick_morty_operations";
				var SL_DEPLOY_ID = "customdeploy_gm_sl_rick_morty_operations";

				var suiteletUrl = nlapiResolveURL("SUITELET", SL_SCRIPT_ID, SL_DEPLOY_ID, true);

				var operation = this.request.getParameter('operation')
				var characterId = this.request.getParameter('characterId')

				suiteletUrl += '&operation=' + operation
				suiteletUrl += characterId ? '&characterId=' + characterId : ''

				var response = nlapiRequestURL(suiteletUrl, null, null, 'GET');

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

				var SL_SCRIPT_ID = "customscript_gm_sl_rick_morty_operations";
				var SL_DEPLOY_ID = "customdeploy_gm_sl_rick_morty_operations";

				var suiteletUrl = nlapiResolveURL("SUITELET", SL_SCRIPT_ID, SL_DEPLOY_ID, true);

				nlapiLogExecution("DEBUG", "this.data", this.data);

				var response = nlapiRequestURL(suiteletUrl, this.data, null, 'POST');

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
