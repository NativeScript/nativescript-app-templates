import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIGaugesModule } from "nativescript-pro-ui/gauges/angular";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { ActivityDetailComponent } from "./care-card/activity-detail/activity-detail.component";
import { CareCardComponent } from "./care-card/care-card.component";
import { CareDashboardComponent } from "./care-card/care-dashboard/care-dashboard.component";
import { RadialRatingComponent } from "./care-card/care-dashboard/radial-rating/radial-rating.component";
import { ConnectDetailComponent } from "./connect/connect-detail/connect-detail.component";
import { ConnectComponent } from "./connect/connect.component";

import { CareCardService } from "./care-card/shared/care-card.service";
import { ConnectService } from "./connect/shared/connect.service";

import { CareRoutingModule } from "./care-routing.module";
import { CareComponent } from "./care.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIGaugesModule,
        NativeScriptUIListViewModule,
        CareRoutingModule
    ],
    declarations: [
        CareCardComponent,
        CareDashboardComponent,
        RadialRatingComponent,
        ConnectComponent,
        ActivityDetailComponent,
        ConnectDetailComponent,
        CareComponent
    ],
    providers: [
        CareCardService,
        ConnectService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CareModule { }
