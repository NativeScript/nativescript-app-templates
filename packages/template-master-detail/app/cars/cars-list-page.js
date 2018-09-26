const topmost = require("tns-core-modules/ui/frame").topmost;

const CarsListViewModel = require("./cars-list-view-model");

function onNavigatingTo(args) {
    const page = args.object;

    let viewModel = page.bindingContext;
    if (!args.isBackNavigation) {
        viewModel = new CarsListViewModel();
        page.bindingContext = viewModel;
    }

    viewModel.load();
}

function onNavigatingFrom(args) {
    const page = args.object;
    const oldViewModel = page.bindingContext;
    if (oldViewModel) {
        oldViewModel.unload();
    }
}

function onCarItemTap(args) {
    const tappedCarItem = args.view.bindingContext;

    topmost().navigate({
        moduleName: "cars/car-detail-page/car-detail-page",
        context: tappedCarItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onCarItemTap = onCarItemTap;
