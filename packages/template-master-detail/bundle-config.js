if (global.TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    global.registerModule("nativescript-telerik-ui/listview", function () { return require("../node_modules/nativescript-telerik-ui/listview"); });

    //register application modules
    global.registerModule("cars/cars-list-page", function () { return require("./cars/cars-list-page"); });
    global.registerModule("cars/car-detail-page/car-detail-page", function () { return require("./cars/car-detail-page/car-detail-page"); });
}
