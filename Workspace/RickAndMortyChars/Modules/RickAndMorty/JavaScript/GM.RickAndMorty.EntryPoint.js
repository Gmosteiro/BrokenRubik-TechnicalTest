//@ts-check

// @ts-ignore
define('GM.RickAndMorty.EntryPoint', [
	'GM.RickAndMorty.Detail.View',
	'GM.RickAndMorty.View',
	'Utils'
], function (
	GMRickAndMortyDetailView,
	GMRickAndMortyView,
	Utils
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

			PageType.registerPageType({
				name: 'RickAndMortyDetailView',
				routes: ['RickAndMortyDetail/add', 'RickAndMortyDetail/:id'],
				view: GMRickAndMortyDetailView,
				defaultTemplate: {
					name: 'gm_rickandmorty_detail_view.tpl',
					displayName: 'Edit/Create Character'
				}
			});

			var MyAccountMenu = container.getComponent('MyAccountMenu');

			var RickAndMortyEntry = {
				groupid: 'orders',
				id: 'rickandmorty',
				name: Utils.translate('Rick And Morty Characters'),
				url: 'RickAndMortyView',
				index: 99
			}

			MyAccountMenu.addGroupEntry(RickAndMortyEntry);
		}
	};
});
