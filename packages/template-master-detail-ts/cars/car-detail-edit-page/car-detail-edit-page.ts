/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from "data/observable";
import { alert } from "ui/dialogs";
import { topmost } from "ui/frame";
import { Page } from "ui/page";

import { CarDetailEditViewModel } from "./car-detail-edit-view-model";

let viewModel: CarDetailEditViewModel;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatingTo(args: EventData): void {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    const page = <Page>args.object;
    if (!page.bindingContext) {
        viewModel = new CarDetailEditViewModel(page.navigationContext);
        page.bindingContext = viewModel;
    }
}

export function onCancelButtonTap(): void {
    topmost().goBack();
}

export function onDoneButtonTap(): void {
    viewModel.saveChanges()
        .then(() => topmost().navigate({ moduleName: "cars/cars-list-page" }))
        .catch((errorMessage: any) =>
            alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" }));
}

export function onSelectorTap(args): void {
    const tag = args.object.tag;
    const selectedValue = viewModel.car[tag];
    const context = { tag, selectedValue };
    const modalPagePath = "cars/car-detail-edit-page/list-selector/list-selector-modal-page";
    const page = <Page>args.object.page;

    page.showModal(modalPagePath, context, (value: string) => {
        if (value) {
            viewModel.car[tag] = value;
        }
    }, false);
}
