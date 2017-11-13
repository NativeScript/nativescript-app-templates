import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { ConnectRoutingModule } from "./connect-routing.module";
import { ConnectComponent } from "./connect.component";

@NgModule({
    imports: [
        ConnectRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        ConnectComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ConnectModule { }
