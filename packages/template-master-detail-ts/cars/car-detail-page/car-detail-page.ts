/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { CarDetailViewModel } from './car-detail-view-model';

import frameModule = require("ui/frame");

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;
    page.bindingContext = new CarDetailViewModel(page.navigationContext);
}

export function onGoBack() {
    frameModule.topmost().goBack();
}