import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SettingsComponent } from "./settings.component";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptModule,
        SettingsRoutingModule,
        SharedModule
    ],
    declarations: [
        SettingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
