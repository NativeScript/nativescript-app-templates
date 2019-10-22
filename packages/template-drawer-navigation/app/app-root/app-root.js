const application = require("tns-core-modules/application");
const { Frame } = require("tns-core-modules/ui/frame");

const AppRootViewModel = require("./app-root-view-model");

function onLoaded(args) {
    const drawerComponent = args.object;
    drawerComponent.bindingContext = new AppRootViewModel();
}

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentTitle = component.title;
    const bindingContext = component.bindingContext;

    bindingContext.set("selectedPage", componentTitle);

    Frame.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });

    const drawerComponent = application.getRootView();
    drawerComponent.closeDrawer();
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;
