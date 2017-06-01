import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { BrowseComponent } from "./browse.component";
import { BrowseRoutingModule } from "./browse-routing.module";

import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptModule,
        BrowseRoutingModule,
        SharedModule
    ],
    declarations: [
        BrowseComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseModule { }
