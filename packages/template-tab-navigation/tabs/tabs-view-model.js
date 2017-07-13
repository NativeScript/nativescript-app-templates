const Observable = require("data/observable").Observable;
const platform = require("platform");

function TabsViewModel() {
    const viewModel = new Observable();

    viewModel.title = "";
    viewModel.iconPath = platform.isAndroid ? "res://" : "res://tabIcons/";

    return viewModel;
}

module.exports = TabsViewModel;
