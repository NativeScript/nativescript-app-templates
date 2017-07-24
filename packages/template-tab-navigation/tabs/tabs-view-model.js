const observableModule = require("data/observable");
const platform = require("platform");

function TabsViewModel() {
    const viewModel = observableModule.fromObject({
        iconPath: platform.isAndroid ? "res://" : "res://tabIcons/",
        title: ""
    });

    return viewModel;
}

module.exports = TabsViewModel;
