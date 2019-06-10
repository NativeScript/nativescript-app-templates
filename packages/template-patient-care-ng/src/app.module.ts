import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { KinveyModule } from "kinvey-nativescript-sdk/lib/angular";

import { Config } from "./shared/config";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        KinveyModule.init({
            appKey: Config.kinveyAppKey,
            appSecret: Config.kinveyAppSecret
        })
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        LoggedInLazyLoadGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
