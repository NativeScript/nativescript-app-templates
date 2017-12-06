import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { AppService } from "./app.service";

@NgModule({
    imports: [
        NativeScriptUIDataFormModule
    ],
    providers: [
        AppService
    ],
    exports: [
        NativeScriptUIDataFormModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
