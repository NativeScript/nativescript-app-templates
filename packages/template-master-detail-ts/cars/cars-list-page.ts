import { EventData } from "data/observable";
import { ListViewEventData } from "nativescript-telerik-ui/listview";
import { topmost } from "ui/frame";
import { Page } from "ui/page";

import { CarsListViewModel } from "./cars-list-view-model";

/* ***********************************************************
* This is the master list code behind in the master-detail structure.
* This code behind gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
const viewModel = new CarsListViewModel();

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
* Call any view model data initialization load here.
*************************************************************/
export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;

    page.bindingContext = viewModel;
    viewModel.load();
}

/* ***********************************************************
* Use the "itemTap" event handler of the <RadListView> to navigate to the
* item details page. Retrieve a reference for the data item (the id) and pass it
* to the item details page, so that it can identify which data item to display.
* Learn more about navigating with a parameter in this documentation article:
* http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
*************************************************************/
export function onCarItemTap(args: ListViewEventData) {
    const tappedCarItem = args.view.bindingContext;

    topmost().navigate({
        moduleName: "cars/car-detail-page/car-detail-page",
        context: tappedCarItem
    });
}
