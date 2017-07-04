const topmost = require("ui/frame").topmost;
const alert = require("ui/dialogs").alert;

const CarDetailEditViewModel = require("./car-detail-edit-view-model");

let viewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    const page = args.object;

    /*
    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    if (!page.bindingContext) {
        viewModel = new CarDetailEditViewModel(page.navigationContext);
        page.bindingContext = viewModel;
    }
}

function onCancelButtonTap() {
    topmost().goBack();
}

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

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onCancelButtonTap = onCancelButtonTap;
exports.onDoneButtonTap = onDoneButtonTap;
exports.onSelectorTap = onSelectorTap;
