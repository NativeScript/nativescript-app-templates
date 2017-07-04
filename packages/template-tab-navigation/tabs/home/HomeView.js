const HomeViewModel = require("./home-view-model");

function onLoaded(args) {
    const component = args.object;
    component.bindingContext = new HomeViewModel();
}

exports.onLoaded = onLoaded;
