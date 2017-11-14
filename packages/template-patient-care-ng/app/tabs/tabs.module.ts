import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIGaugesModule } from "nativescript-pro-ui/gauges/angular";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { CareCardComponent } from "./care-card/care-card.component";
import { CircularStatusComponent } from "./care-card/circular-status/circular-status.component";
import { ConnectComponent } from "./connect/connect.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIGaugesModule,
        NativeScriptUIListViewModule,
        TabsRoutingModule
    ],
    declarations: [
        CareCardComponent,
        ConnectComponent,
        CircularStatusComponent,
        TabsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
