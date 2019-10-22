import { Frame } from "tns-core-modules/ui/frame";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { CarsListViewModel } from "./cars-list-view-model";
import { Car } from "./shared/car-model";

/* ***********************************************************
* This is the master list code behind in the master-detail structure.
* This code behind gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
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
    const viewModel = new CarsListViewModel();

    page.bindingContext = viewModel;
    viewModel.load();
}

/* ***********************************************************
* Use the "itemTap" event handler of the <RadListView> to navigate to the
* item details page. Retrieve a reference for the data item and pass it
* to the item details page, so that it can identify which data item to display.
* Learn more about navigating and passing context in this documentation article:
* https://docs.nativescript.org/core-concepts/navigation#navigate-and-pass-context
*************************************************************/
export function onCarItemTap(args: ItemEventData): void {
    const tappedCarItem = <Car>args.view.bindingContext;

    Frame.topmost().navigate({
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
