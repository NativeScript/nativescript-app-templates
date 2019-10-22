import { Frame } from "tns-core-modules/ui/frame";
import { NavigatedData, Page } from "tns-core-modules/ui/page";

import { CarDetailViewModel } from "./car-detail-view-model";

/* ***********************************************************
* This is the item details code behind in the master-detail structure.
* This code behind retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
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

    page.bindingContext = new CarDetailViewModel(page.navigationContext);
}

/* ***********************************************************
* The back button is essential for a master-detail feature.
*************************************************************/
export function onBackButtonTap(): void {
    Frame.topmost().goBack();
}

/* ***********************************************************
* The master-detail template comes with an example of an item edit page.
* Check out the edit page in the /cars/car-detail-edit-page folder.
*************************************************************/
export function onEditButtonTap(args): void {
    const bindingContext = <CarDetailViewModel>args.object.bindingContext;

    Frame.topmost().navigate({
        moduleName: "cars/car-detail-edit-page/car-detail-edit-page",
        context: bindingContext.car,
        animated: true,
        transition: {
            name: "slideTop",
            duration: 200,
            curve: "ease"
        }
    });
}
