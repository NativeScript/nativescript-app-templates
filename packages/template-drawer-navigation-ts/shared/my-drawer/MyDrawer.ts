import { EventData } from "data/observable";
import { topmost } from "ui/frame";
import { StackLayout } from "ui/layouts/stack-layout";
import { ItemEventData } from "ui/list-view";

import { MyDrawerViewModel } from "./MyDrawer-view-model";

/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
export function onLoaded(args): void {
    const component = <StackLayout>args.object;
    const componentTitle = args.object.selectedPage;

    component.bindingContext = new MyDrawerViewModel(componentTitle);
}

/* ***********************************************************
* Use the "itemTap" event handler of the <ListView> component for handling list item taps.
* The "itemTap" event handler of the app drawer <ListView> is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
export function onNavigationItemTap(args: ItemEventData): void {
    const navigationItemView = args.view;
    const navigationItemRoute = navigationItemView.bindingContext.route;

    topmost().navigate({
        moduleName: navigationItemRoute,
        transition: {
            name: "slide"
        }
    });
}
