//@ts-check

// @ts-ignore
define('GM.RickAndMorty.Detail.View', [
	'gm_rickandmort_detail_view.tpl',
	'GM.RickAndMorty.Model',
	'Backbone',
	'jQuery',
], function (
	gm_rickandmorty_detail_view_tpl,
	RickAndMortyModel,
	Backbone,
	$
) {
	'use strict';

	// @class GM.RickAndMorty.View @extends Backbone.View
	return Backbone.View.extend({

		template: gm_rickandmorty_detail_view_tpl,

		initialize: function (options) {
			this.model = new RickAndMortyModel();

			var self = this;

			Backbone.loader = true;
			var characterid = options.routerArguments[0];

			if (!isNaN(characterid)) {

				this.model.fetch({
					data: {
						operation: 'getCharacterById',
						characterId: characterid
					}
				}).done(function (result) {
					Backbone.loader = false;

					self.character = result.character[0];
					self.render();

				}).catch(function (error) {
					Backbone.loader = false;
				});
			}
		},

		events: {
			'submit form': 'saveForm',
			'click [data-action="deleteCharacter"]': 'deleteCharacter'
		},

		bindings: {},

		childViews: {},

		deleteCharacter: function deleteCharacter(e) {

			var characterId = e.target.value
			var formData = {};


			formData.delete = true;
			formData.characterId = characterId;

			Backbone.trigger('getFormData', formData);
		},

		saveForm: function saveForm(e) {


			var $form = this.$(e.target)
			var formData = $form.serializeObject();

			Backbone.trigger('getFormData', formData);

		},


		getContext: function getContext() {

			return {
				character: this.character,
				isCreate: this.character ? false : true,
			};
		}
	});
});
