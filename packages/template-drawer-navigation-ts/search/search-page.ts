import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { topmost } from "ui/frame";
import { Page } from "ui/page";

import { SearchViewModel } from "./search-view-model";

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new SearchViewModel();
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap() {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
