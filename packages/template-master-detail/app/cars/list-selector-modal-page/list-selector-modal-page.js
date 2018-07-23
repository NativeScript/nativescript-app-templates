const ListSelectorViewModel = require("./list-selector-view-model");

let viewModel;

function onShownModally(args) {
    const page = args.object;

    viewModel = new ListSelectorViewModel(args.context, args.closeCallback);
    page.bindingContext = viewModel;
}

function onItemSelected(args) {
    viewModel.selectItem(args.index);
}

function onCancelButtonTap() {
    viewModel.cancelSelection();
}

exports.onShownModally = onShownModally;
exports.onItemSelected = onItemSelected;
exports.onCancelButtonTap = onCancelButtonTap;
