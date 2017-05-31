/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/

import { Car } from "./shared/car-model";
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { CarsListViewModel } from './cars-list-view-model';

import frameModule = require("ui/frame");
import observableModule = require("data/observable");

var carsListViewModel = new CarsListViewModel();

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */

    page.bindingContext = carsListViewModel;

    carsListViewModel.empty();
    carsListViewModel.load();
}

export function onCarItemTap(args) {
    var tappedCarItem = args.object.bindingContext;

    frameModule.topmost().navigate({
        moduleName: "cars/car-detail-page/car-detail-page",
        context: tappedCarItem
    });
}