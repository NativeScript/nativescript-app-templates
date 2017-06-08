import { EventData } from 'data/observable';
import { StackLayout } from 'ui/layouts/stack-layout';

import frameModule = require("ui/frame");

let model = {
    navigationItems: [
        {
            title: "Home",
            route: "home/home-page"
        },
        {
            title: "Browse",
            route: "browse/browse-page"
        },
        {
            title: "Search",
            route: "search/search-page"
        },
        {
            title: "Featured",
            route: "featured/featured-page"
        },
        {
            title: "Settings",
            route: "settings/settings-page"
        }
    ]
};

// Event handler for Page "navigatingTo" event attached in tabs-page.xml
export function onLoaded(args: EventData) {
    /*
    This gets a reference this page’s <StackLayout> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <StackLayout>args.object;
    page.bindingContext = model;
}

export function onNavigationItemTap(args) {
    let route = args.view.bindingContext.route;
    frameModule.topmost().navigate({
        moduleName: route,
        transition: {
            name: "slide"
        }
    });
}