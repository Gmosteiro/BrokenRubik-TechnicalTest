// Model.js
// @module Case

//@ts-check
// @ts-ignore
define("GM.RickAndMorty.Model", ["Backbone", "Utils"], function (
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({


        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            // @ts-ignore
            getExtensionAssetsPath(
                "services/GM.RickAndMorty.Service.ss"
            )
        )

    });
});
