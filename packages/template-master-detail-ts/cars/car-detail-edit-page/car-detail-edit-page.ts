import { EventData } from "data/observable";
import { ActionItem } from "ui/action-bar";
import { alert } from "ui/dialogs";
import { topmost } from "ui/frame";
import { GridLayout } from "ui/layouts/grid-layout";
import { NavigatedData, Page } from "ui/page";

import { CarDetailEditViewModel } from "./car-detail-edit-view-model";

/* ***********************************************************
* This is the item detail edit code behind.
* This code behind gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/

/* ***********************************************************
* Use the "onNavigatingTo" handler to get the data item id parameter passed through navigation.
* Use it to initialize the view model and assign it as a view binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData): void {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;

    page.bindingContext = new CarDetailEditViewModel(page.navigationContext);
}

/* ***********************************************************
* The edit cancel button navigates back to the item details page.
*************************************************************/
export function onCancelButtonTap(args: EventData): void {
    topmost().goBack();
}

/* ***********************************************************
* The edit done button calls the view model save changes logic.
*************************************************************/
export function onDoneButtonTap(args: EventData): void {
    /* ***********************************************************
    * By design this app is set up to work with read-only sample data.
    * Follow the steps in the "Firebase database setup" section in app/readme.md file
    * and uncomment the code block below to make it editable.
    *************************************************************/

    /* ***********************************************************
    const actionItem = <ActionItem>args.object;
    const bindingContext = <CarDetailEditViewModel>actionItem.bindingContext;

    bindingContext.saveChanges()
        .then(() => topmost().navigate({
            moduleName: "cars/cars-list-page",
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }))
        .catch((errorMessage: any) =>
            alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" }));
    *************************************************************/

    /* ***********************************************************
    * Comment out the code block below if you made the app editable.
    *************************************************************/
    const readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
    const queue = Promise.resolve();
    queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
        .then(() => topmost().navigate({
            moduleName: "cars/cars-list-page",
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }));
}

export function onSelectorTap(args: EventData): void {
    const gridLayout = <GridLayout>args.object;
    const tag = gridLayout.get("tag");
    const bindingContext = <CarDetailEditViewModel>gridLayout.bindingContext;
    const selectedValue = bindingContext.car[tag];
    const context = { tag, selectedValue };
    const modalPagePath = "cars/list-selector-modal-page/list-selector-modal-page";
    const page = <Page>gridLayout.page;

    page.showModal(modalPagePath, context, (value: string) => {
        if (value) {
            bindingContext.car[tag] = value;
        }
    }, false);
}

export function onImageAddRemoveTap(args: EventData): void {
    const gridLayout = <GridLayout>args.object;
    const bindingContext = <CarDetailEditViewModel>gridLayout.bindingContext;

    bindingContext.onImageAddRemove();
}
