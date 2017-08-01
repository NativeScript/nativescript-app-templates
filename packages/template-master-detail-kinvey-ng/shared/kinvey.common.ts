import { Kinvey } from "kinvey-nativescript-sdk";

import { Config } from "./config";

/* ***********************************************************
* The {N} Kinvey plugin initialization is explained in the plugin readme here:
* http://devcenter.kinvey.com/nativescript/guides/getting-started#ConfigureYourApp
* In this template, Kinvey is set up with a custom existing project, so that
* You can build and run this template without creating your own Kinvey project.
*************************************************************/

Kinvey.init({
    appKey: Config.kinveyAppKey,
    appSecret: Config.kinveyAppSecret
});
