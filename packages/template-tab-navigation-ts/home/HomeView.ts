/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData } from 'data/observable';
import { StackLayout } from 'ui/layouts/stack-layout';
import { HomeViewModel } from './home-view-model';

// Event handler for Page "navigatingTo" event attached in tabs-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <StackLayout> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <StackLayout>args.object;
    page.bindingContext = new HomeViewModel();
}