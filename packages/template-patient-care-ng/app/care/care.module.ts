import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { ActivityDetailComponent } from "./care-card/activity-detail/activity-detail.component";
import { ActivityListComponent } from "./care-card/activity/activity-list.component";
import { CareCardComponent } from "./care-card/care-card.component";
import { CareDashboardComponent } from "./care-card/care-dashboard/care-dashboard.component";
import { RadialRatingComponent } from "./care-card/care-dashboard/radial-rating/radial-rating.component";
import { ConnectDetailComponent } from "./connect/connect-detail/connect-detail.component";
import { ConnectComponent } from "./connect/connect.component";

import { CareCardActivityService } from "./care-card/shared/care-card-activity.service";
import { CareCardEventService } from "./care-card/shared/care-card-event.service";
import { CareCardService } from "./care-card/shared/care-card.service";
import { ConnectService } from "./connect/shared/connect.service";

import { CareRoutingModule } from "./care-routing.module";
import { CareComponent } from "./care.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIGaugeModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        CareRoutingModule
    ],
    declarations: [
        CareCardComponent,
        CareDashboardComponent,
        RadialRatingComponent,
        ConnectComponent,
        ActivityDetailComponent,
        ActivityListComponent,
        ConnectDetailComponent,
        CareComponent
    ],
    providers: [
        CareCardActivityService,
        CareCardEventService,
        CareCardService,
        ConnectService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CareModule { }
