import { Kinvey } from "kinvey-nativescript-sdk";

import { KinveyConfig } from "./kinvey.config";

Kinvey.init({
    appKey: KinveyConfig.appKey,
    appSecret: KinveyConfig.appSecret
});
