var frameModule = require("ui/frame");

var MyDrawerViewModel = require("./MyDrawer-view-model");

/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
function onLoaded(args) {
    var component = args.object;

    component.bindingContext = new MyDrawerViewModel();
}

/* ***********************************************************
* Use the "itemTap" event handler of the <ListView> component for handling list item taps.
* The "itemTap" event handler of the app drawer <ListView> is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
function onNavigationItemTap(args) {
    var navigationItemView = args.view;
    var navigationItemRoute = navigationItemView.bindingContext.route;

    frameModule.topmost().navigate({
        moduleName: navigationItemRoute,
        transition: {
            name: "slide"
        }
    });
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;