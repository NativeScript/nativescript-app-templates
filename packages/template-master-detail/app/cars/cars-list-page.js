const topmost = require("tns-core-modules/ui/frame").topmost;

const CarsListViewModel = require("./cars-list-view-model");

function onNavigatingTo(args) {
    if (args.isBackNavigation) {
        return;
    }

    const viewModel = new CarsListViewModel();
    viewModel.load();

    const page = args.object;
    page.bindingContext = viewModel;
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
exports.onCarItemTap = onCarItemTap;
