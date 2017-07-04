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
const topmost = require("ui/frame").topmost;

const CarsListViewModel = require("./cars-list-view-model");

const viewModel = new CarsListViewModel();

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    const page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ carsList }} and {{ isLoading }} bindings are resolved
    against the object returned by CarsListViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = viewModel;

    /*
    Using onNavigatingTo event will trigger fetching on remote data for every page navigation.
    Consider using 'loaded' event for fetching remote data that should not be reloaded
    on every page nacigation. 
    */

    viewModel.load();
}

function onCarItemTap(args) {
    const tappedCarItem = args.object.bindingContext;

    topmost().navigate({
        moduleName: "cars/car-detail-page/car-detail-page",
        context: tappedCarItem
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onCarItemTap = onCarItemTap;
