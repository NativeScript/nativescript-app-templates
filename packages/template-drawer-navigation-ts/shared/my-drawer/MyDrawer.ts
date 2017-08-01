import { EventData } from "data/observable";
import { topmost } from "ui/frame";
import { StackLayout } from "ui/layouts/stack-layout";
import { ItemEventData } from "ui/list-view";

import { MyDrawerViewModel } from "./MyDrawer-view-model";

/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
export function onLoaded(args: EventData): void {
    const component = <StackLayout>args.object;
    const componentTitle = component.get("selectedPage");

    component.bindingContext = new MyDrawerViewModel(componentTitle);
}

/* ***********************************************************
* Use the "itemTap" event handler of the <ListView> component for handling list item taps.
* The "itemTap" event handler of the app drawer <ListView> is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
export function onNavigationItemTap(args: ItemEventData): void {
    const navigationItem = args.view.bindingContext;

    topmost().navigate({
        moduleName: navigationItem.route,
        transition: {
            name: "slide"
        }
    });
}
