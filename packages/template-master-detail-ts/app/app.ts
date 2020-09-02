import { Application } from "@nativescript/core";

/*
The {N} Firebase plugin needs some initialization steps before it is ready
for use. Check out the initialization script at /shared/firebase.common.ts
along with more information about it.
*/
import "./shared/firebase.common";

Application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
