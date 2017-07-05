import * as app from "application";

import "./bundle-config";

/* ***********************************************************
* The {N} Firebase plugin needs some initialization steps before it is ready
* for use. Check out the initialization script at /shared/firebase.common.ts
* along with more information about it.
*************************************************************/
import "./shared/firebase.common";

app.start({ moduleName: "cars/cars-list-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
