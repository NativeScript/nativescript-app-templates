const frameModule = require("ui/frame");

const MyDrawerViewModel = require("./MyDrawer-view-model");

/* ***********************************************************
 * Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
 *************************************************************/
function onLoaded(args) {
    const component = args.object;
    const componentTitle = component.selectedPage;

    component.bindingContext = new MyDrawerViewModel(componentTitle);
}

/* ***********************************************************
 * Use the "itemTap" event handler of the <ListView> component for handling list item taps.
 * The "itemTap" event handler of the app drawer <ListView> is used to navigate the app
 * based on the tapped navigationItem's route.
 *************************************************************/
function onNavigationItemTap(args) {
    const navigationItem = args.view.bindingContext;

    frameModule.topmost().navigate({
        moduleName: navigationItem.route,
        transition: {
            name: "fade"
        }
    });
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;
