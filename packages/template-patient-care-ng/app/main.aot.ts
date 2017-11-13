// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScript } from "nativescript-angular/platform-static";

import { AppModuleNgFactory } from "./app.module.ngfactory";

import "./shared/kinvey.common";

platformNativeScript().bootstrapModuleFactory(AppModuleNgFactory);
