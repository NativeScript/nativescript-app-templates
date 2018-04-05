const AppRootViewModel = require("./app-root-view-model");
const frameModule = require("ui/frame");
let appRootViewModel;
let drawerComponent;
/* ***********************************************************
 * Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
 *************************************************************/
function onLoaded(args) {
    drawerComponent = args.object;

    appRootViewModel = new AppRootViewModel("Home");
    drawerComponent.bindingContext = appRootViewModel;
}

/* ***********************************************************
 * Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
 * The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
 * based on the tapped navigationItem's route.
 *************************************************************/
function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentTitle = component.title;

    appRootViewModel.set("selectedPage", componentTitle);

    frameModule.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });

    drawerComponent.closeDrawer();
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;
