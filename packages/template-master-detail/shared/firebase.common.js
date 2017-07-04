const firebase = require("nativescript-plugin-firebase");

const config = require("../shared/config");

firebase.init({
    // persist should be set to false as otherwise numbers aren't returned during livesync
    persist: false,
    storageBucket: config.firebaseBucket
}).then(() => console.log("firebase.init done"),
    (error) => console.log(`firebase.init error: ${error}`));
