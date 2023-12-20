//@ts-check

// @ts-ignore
define('GM.RickAndMorty.View', [
	'gm_rickandmorty_view.tpl',
	'GM.RickAndMorty.Model',
	'Backbone'
], function (
	gm_rickandmorty_view_tpl,
	RickAndMortyModel,
	Backbone
) {
	'use strict';

	// @class GM.RickAndMorty.View @extends Backbone.View
	return Backbone.View.extend({

		template: gm_rickandmorty_view_tpl,

		initialize: function (options) {

			this.model = new RickAndMortyModel();

			var self = this;

			this.model.fetch().done(function (result) {
				debugger;
				self.characters = result.characters;
				self.render();
			});
		},

		events: {},

		bindings: {},

		childViews: {},

		getContext: function getContext() {

			return {
				characters: this.characters
			};
		}
	});
});
