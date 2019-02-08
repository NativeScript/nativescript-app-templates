const app = require("tns-core-modules/application");

/* ***********************************************************
* The {N} Kinvey plugin needs some initialization steps before it is ready
* for use. Check out the initialization script at /shared/kinvey.common.ts
* along with more information about it.
*************************************************************/
require("./shared/kinvey.common");

app.start({ moduleName: "login/login-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/