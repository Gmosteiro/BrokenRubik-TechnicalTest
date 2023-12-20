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

			var layout = container.getComponent('Layout');

			if (layout) {
				layout.addChildView('Header.Logo', function () {
					return new GMRickAndMortyView({ container: container });
				});
			}

		}
	};
});
