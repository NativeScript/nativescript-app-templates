const topmost = require("ui/frame").topmost;

const CarDetailViewModel = require("./car-detail-view-model");

/* ***********************************************************
* This is the item details code behind in the master-detail structure.
* This code behind retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;

    page.bindingContext = new CarDetailViewModel(page.navigationContext);
}

/* ***********************************************************
* The back button is essential for a master-detail feature.
*************************************************************/
function onBackButtonTap() {
    topmost().goBack();
}

/* ***********************************************************
* The master-detail template comes with an example of an item edit page.
* Check out the edit page in the /cars/car-detail-edit-page folder.
*************************************************************/
function onEditButtonTap(args) {
    const tappedCarItem = args.object.bindingContext;

    topmost().navigate({
        moduleName: "cars/car-detail-edit-page/car-detail-edit-page",
        context: tappedCarItem.car
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onEditButtonTap = onEditButtonTap;
