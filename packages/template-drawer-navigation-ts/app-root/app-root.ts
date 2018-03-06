import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { GridLayout } from "ui/layouts/grid-layout";

import { AppRootViewModel } from "./app-root-view-model";
let appRootViewModel;
let drawerComponent;
/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
export function onLoaded(args: EventData): void {
    drawerComponent = <RadSideDrawer>args.object;

    appRootViewModel = new AppRootViewModel("Home");
    drawerComponent.bindingContext = appRootViewModel;
}

/* ***********************************************************
* Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
* The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
export function onNavigationItemTap(args: EventData): void {
    const component = <GridLayout>args.object;
    const componentRoute = component.get("route");
    const componentTitle = component.get("title");

    appRootViewModel.set("selectedPage", componentTitle);

    topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });

    drawerComponent.closeDrawer();
}
