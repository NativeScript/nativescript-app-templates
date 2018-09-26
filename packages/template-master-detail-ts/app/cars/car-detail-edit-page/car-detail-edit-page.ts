import { EventData } from "tns-core-modules/data/observable";
import { alert } from "tns-core-modules/ui/dialogs";
import { topmost } from "tns-core-modules/ui/frame";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { CarDetailEditViewModel } from "./car-detail-edit-view-model";

export function onNavigatingTo(args: NavigatedData): void {
    if (args.isBackNavigation) {
        return;
    }

    const page = <Page>args.object;

    page.bindingContext = new CarDetailEditViewModel(page.navigationContext);
}

export function onCancelButtonTap(args: EventData): void {
    topmost().goBack();
}

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
