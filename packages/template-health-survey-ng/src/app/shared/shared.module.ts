import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

@NgModule({
    imports: [
        NativeScriptUIDataFormModule
    ],
    exports: [
        NativeScriptUIDataFormModule
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
