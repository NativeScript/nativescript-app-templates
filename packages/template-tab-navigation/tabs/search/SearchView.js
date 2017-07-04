const SearchViewModel = require("./search-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new SearchViewModel();
}

exports.onLoaded = onLoaded;
