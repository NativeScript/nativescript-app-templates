const topmost = require("ui/frame").topmost;
const alert = require("ui/dialogs").alert;

const CarDetailEditViewModel = require("./car-detail-edit-view-model");

/* ***********************************************************
 * This is the item detail edit code behind.
 * This code behind gets the selected data item, provides options to edit the item and saves the changes.
 *************************************************************/

/* ***********************************************************
 * Use the "onNavigatingTo" handler to get the data item id parameter passed through navigation.
 * Use it to initialize the view model and assign it to the view.
 *************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
     * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
     * Skipping the re-initialization on back navigation means the user will see the
     * page in the same data state that he left it in before navigating.
     *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;

    page.bindingContext = new CarDetailEditViewModel(page.navigationContext);
}

/* ***********************************************************
 * The edit cancel button navigates back to the item details page.
 *************************************************************/
function onCancelButtonTap(args) {
    topmost().goBack();
}

/* ***********************************************************
 * The edit done button calls the view model save changes logic.
 *************************************************************/
function onDoneButtonTap(args) {
    /* ***********************************************************
     * By design this app is set up to work with read-only sample data.
     * Follow the steps in the "Firebase database setup" section in app/readme.md file
     * and uncomment the code block below to make it editable.
     *************************************************************/

    /* ***********************************************************
    const actionItem = args.object;
    const bindingContext = actionItem.bindingContext;

    bindingContext.saveChanges()
        .then(() => topmost().navigate({ 
            moduleName: "cars/cars-list-page",
            animated: true,
            clearHistory: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }))
        .catch(() =>
            alert({
                title: "Oops!",
                message: "Something went wrong. Please try again.",
                okButtonText: "Ok"
            }));
    *************************************************************/

    /* ***********************************************************
     * Comment out the code block below if you made the app editable.
     *************************************************************/
    const readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable.";
    const queue = Promise.resolve();
    queue.then(() => alert({
            title: "Read-Only Template!",
            message: readOnlyMessage,
            okButtonText: "Ok"
        }))
        .then(() => topmost().navigate({
            moduleName: "cars/cars-list-page",
            animated: true,
            clearHistory: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }));
}

function onSelectorTap(args) {
    const gridLayout = args.object;
    const tag = gridLayout.tag;
    const bindingContext = gridLayout.bindingContext;
    const selectedValue = bindingContext.car[tag];
    const context = {
        tag,
        selectedValue
    };
    const modalPagePath = "cars/list-selector-modal-page/list-selector-modal-page";
    const page = gridLayout.page;

    page.showModal(modalPagePath, context, (value) => {
        if (value) {
            bindingContext.car.set(tag, value);
        }
    }, false);
}

function onImageAddRemoveTap(args) {
    const gridLayout = args.object;
    const bindingContext = gridLayout.bindingContext;

    bindingContext.onImageAddRemove();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onCancelButtonTap = onCancelButtonTap;
exports.onDoneButtonTap = onDoneButtonTap;
exports.onSelectorTap = onSelectorTap;
exports.onImageAddRemoveTap = onImageAddRemoveTap;
