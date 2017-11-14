import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIGaugesModule } from "nativescript-pro-ui/gauges/angular";

import { CareCardRoutingModule } from "./care-card-routing.module";
import { CareCardComponent } from "./care-card.component";
import { CircularStatusComponent } from "./circular-status/circular-status.component";

@NgModule({
    imports: [
        CareCardRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIGaugesModule
    ],
    declarations: [
        CareCardComponent,
        CircularStatusComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CareCardModule { }
