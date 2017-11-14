import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { ConnectRoutingModule } from "./connect-routing.module";
import { ConnectComponent } from "./connect.component";

@NgModule({
    imports: [
        ConnectRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        ConnectComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ConnectModule { }
