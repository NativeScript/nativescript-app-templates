import * as firebase from "nativescript-plugin-firebase";

import { Config } from "./config";

/* ***********************************************************
* The {N} Firebase plugin initialization is explained in the plugin readme here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#usage
* Another important part of the initialization are the prerequisites:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#prerequisites
* In this template, Firebase is set up with a custom existing project, so that
* You can build and run this template without creating your own Firebase project.
* Note that if you change the bundle id of the application, the Firebase configuration
* will stop working.
*************************************************************/

export function initFirebase() {
    firebase.init({
        persist: false,
        storageBucket: Config.firebaseBucket
    }).then((instance) => console.log("firebase.init done"),
        (error) => console.log("firebase.init error: " + error));
}
