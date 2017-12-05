import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
        LoggedInLazyLoadGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
