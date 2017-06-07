import firebase = require("nativescript-plugin-firebase");

import { Config } from "../shared/config";

firebase.init({
    // persist should be set to false as otherwise numbers aren't returned during livesync
    persist: false,
    storageBucket: Config.firebaseBucket
}).then((instance) => console.log("firebase.init done"),
    (error) => console.log("firebase.init error: " + error));
