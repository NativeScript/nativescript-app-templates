import { Kinvey } from "kinvey-nativescript-sdk";

import { Config } from "./config";

Kinvey.init({
    appKey: Config.kinveyAppKey,
    appSecret: Config.kinveyAppSecret,
    apiHostname: Config.kinveyApiHostname,
    micHostname: Config.kinveyMicHostname
});
