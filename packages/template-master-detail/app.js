/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
require("./bundle-config");
const app = require("application");

// Firebase initialization
require("./shared/firebase.common");

app.start({ moduleName: "cars/cars-list-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
