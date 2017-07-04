const topmost = require("ui/frame").topmost;

const CarDetailViewModel = require("./car-detail-view-model");

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
    page.bindingContext = new CarDetailViewModel(page.navigationContext);
}

function onBackButtonTap() {
    topmost().goBack();
}

function onEditButtonTap(args) {
    const tappedCarItem = args.object.bindingContext;

    topmost().navigate({
        moduleName: "cars/car-detail-edit-page/car-detail-edit-page",
        context: tappedCarItem.car
    });
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onEditButtonTap = onEditButtonTap;
