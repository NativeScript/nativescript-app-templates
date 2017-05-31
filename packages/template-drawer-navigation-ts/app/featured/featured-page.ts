import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { FeaturedViewModel } from './featured-view-model';

import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';
import view = require("ui/core/view");

var page;
// Event handler for Page "navigatingTo" event attached in tabs-page.xml
export function onNavigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <StackLayout> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    page = <Page>args.object;
    page.bindingContext = new FeaturedViewModel();
}

export function onOpenDrawerTap() {
    let sideDrawer = <RadSideDrawer>view.getViewById(page, "sideDrawer");
    sideDrawer.showDrawer();
}