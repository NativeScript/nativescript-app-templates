const SearchViewModel = require("./search-view-model");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new SearchViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
