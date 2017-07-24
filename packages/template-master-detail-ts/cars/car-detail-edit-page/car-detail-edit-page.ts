import { EventData } from "data/observable";
import { alert } from "ui/dialogs";
import { topmost } from "ui/frame";
import { Page } from "ui/page";

import { CarDetailEditViewModel } from "./car-detail-edit-view-model";

/* ***********************************************************
* This is the item detail edit code behind.
* This code behind gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
let viewModel: CarDetailEditViewModel;

/* ***********************************************************
* Use the "onNavigatingTo" handler to get the data item id parameter passed through navigation.
* Use it to initialize the view model and assign it to the view.
*************************************************************/
export function onNavigatingTo(args: EventData): void {
    const page = <Page>args.object;

    if (!page.bindingContext) {
        viewModel = new CarDetailEditViewModel(page.navigationContext);
        page.bindingContext = viewModel;
    }
}

/* ***********************************************************
* The edit cancel button navigates back to the item details page.
*************************************************************/
export function onCancelButtonTap(): void {
    topmost().goBack();
}

/* ***********************************************************
* The edit done button calls the view model save changes logic.
*************************************************************/
export function onDoneButtonTap(): void {
    /* ***********************************************************
    * By design this app is set up to work with read-only sample data.
    * Follow the steps in the "Firebase database setup" section in app/readme.md file
    * and uncomment the code block below to make it editable.
    *************************************************************/

    /* ***********************************************************
    viewModel.saveChanges()
        .then(() => topmost().navigate({ moduleName: "cars/cars-list-page" }))
        .catch((errorMessage: any) =>
            alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" }));
    *************************************************************/

    /* ***********************************************************
    * Comment out the code block below if you made the app editable.
    *************************************************************/
    const readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
    const queue = Promise.resolve();
    queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
        .then(() => topmost().navigate({ moduleName: "cars/cars-list-page" }));
}

export function onSelectorTap(args): void {
    const tag = args.object.tag;
    const selectedValue = viewModel.car[tag];
    const context = { tag, selectedValue };
    const modalPagePath = "cars/car-detail-edit-page/list-selector/list-selector-modal-page";
    const page = <Page>args.object.page;

    page.showModal(modalPagePath, context, (value: string) => {
        if (value) {
            viewModel.car.set(tag, value);
        }
    }, false);
}
