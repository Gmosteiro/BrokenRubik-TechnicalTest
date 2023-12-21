//@ts-check

// @ts-ignore
define('GM.RickAndMorty.View', [
	'GM.RickAndMorty.Detail.View',
	'gm_rickandmorty_view.tpl',
	'GM.RickAndMorty.Model',
	'Backbone'
], function (
	GMRickAndMortyDetailView,
	gm_rickandmorty_view_tpl,
	RickAndMortyModel,
	Backbone
) {
	'use strict';

	// @class GM.RickAndMorty.View @extends Backbone.View
	return Backbone.View.extend({

		template: gm_rickandmorty_view_tpl,

		initialize: function (options) {
			var self = this;

			Backbone.getAllCharacters = function () {
				this.model = new RickAndMortyModel();

				this.model.fetch({
					data: {
						operation: 'getCharacters'
					}
				}).done(function (result) {
					self.characters = result.characters;
					self.render();
				}).catch(function (error) {
					console.error(error);
				});
			}

			Backbone.on('getFormData', function (data) {
				self.characterData = data;
				self.render()
			});


			Backbone.getAllCharacters();


		},


		events: {},

		bindings: {},

		childViews: {
			'GMRickAndMortyDetailView': function () {
				return new GMRickAndMortyDetailView({
					model: this.model
				});
			}
		},

		createOrUpdateCharacter: function createOrUpdateCharacter(data, self) {
			if (!data) return;
			self.characterData = false;

			data.operation = data.delete ? 'deleteCharacter' : (data.characterId ? 'editCharacter' : 'createCharacter');

			this.model = new RickAndMortyModel();


			this.model.save({
				async: true,
				characterData: JSON.stringify(data)
			}).done(function (result) {
				Backbone.getAllCharacters();

			});
		},

		getContext: function getContext() {

			if (this.characterData) {

				this.createOrUpdateCharacter(this.characterData, this);
			}

			return {
				characters: this.characters
			};
		}
	});
});
