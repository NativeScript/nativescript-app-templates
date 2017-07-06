const topmost = require("ui/frame").topmost;
const alert = require("ui/dialogs").alert;

const CarDetailEditViewModel = require("./car-detail-edit-view-model");

/* ***********************************************************
* This is the item detail edit code behind.
* This code behind gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
let viewModel;

/* ***********************************************************
* Use the "onNavigatingTo" handler to get the data item id parameter passed through navigation.
* Use it to initialize the view model and assign it to the view.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;

    if (!page.bindingContext) {
        viewModel = new CarDetailEditViewModel(page.navigationContext);
        page.bindingContext = viewModel;
    }
}

/* ***********************************************************
* The edit cancel button navigates back to the item details page.
*************************************************************/
function onCancelButtonTap() {
    topmost().goBack();
}

/* ***********************************************************
* The edit done button calls the view model save changes logic.
*************************************************************/
function onDoneButtonTap() {
    viewModel.saveChanges()
        .then(() => topmost().navigate({ moduleName: "cars/cars-list-page" }))
        .catch(() =>
            alert({
                title: "Oops!",
                message: "Something went wrong. Please try again.",
                okButtonText: "Ok"
            }));
}

function onSelectorTap(args) {
    const tag = args.object.tag;
    const selectedValue = viewModel.car[tag];
    const context = {
        tag,
        selectedValue
    };
    const modalPagePath = "cars/car-detail-edit-page/list-selector/list-selector-modal-page";
    const page = args.object.page;

    page.showModal(modalPagePath, context, (value) => {
        if (value) {
            viewModel.car.set(tag, value);
        }
    }, false);
}

exports.onNavigatingTo = onNavigatingTo;
exports.onCancelButtonTap = onCancelButtonTap;
exports.onDoneButtonTap = onDoneButtonTap;
exports.onSelectorTap = onSelectorTap;
