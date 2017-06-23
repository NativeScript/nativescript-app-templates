var SearchViewModel = require("./search-view-model");

function onLoaded(args) {
    var component = args.object;
    component.bindingContext = new SearchViewModel();
}

exports.onLoaded = onLoaded;