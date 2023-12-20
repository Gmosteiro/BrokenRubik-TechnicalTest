//@ts-check

// @ts-ignore
define('GM.RickAndMortyChars.EntryPoint', [
	'GM.RickAndMorty.View'
], function (
	GMRickAndMortyView
) {
	'use strict';

	return {
		mountToApp: function mountToApp(container) {

			var PageType = container.getComponent('PageType');

			PageType.registerPageType({
				name: 'RickAndMortyView',
				routes: ['RickAndMortyView'],
				view: GMRickAndMortyView,
				defaultTemplate: {
					name: 'gm_rickandmorty_view.tpl',
					displayName: 'Rick And Morty Characters'
				}
			});
		}
	};
});
