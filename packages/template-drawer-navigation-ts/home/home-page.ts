import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { getViewById } from "ui/core/view";
import { Page } from "ui/page";

import { HomeViewModel } from "./home-view-model";

let page;

export function onNavigatingTo(args: EventData) {
    page = <Page> args.object;
    page.bindingContext = new HomeViewModel();
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap() {
    const sideDrawer = <RadSideDrawer> getViewById(page, "sideDrawer");
    sideDrawer.showDrawer();
}
