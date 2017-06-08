import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SearchComponent } from "./search.component";
import { SearchRoutingModule } from "./search-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptModule,
        SearchRoutingModule,
        SharedModule
    ],
    declarations: [
        SearchComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
