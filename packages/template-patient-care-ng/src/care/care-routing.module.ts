import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ActivityDetailComponent } from "./care-card/activity-detail/activity-detail.component";
import { CareComponent } from "./care.component";
import { ConnectDetailComponent } from "./connect/connect-detail/connect-detail.component";

const routes: Routes = [
    { path: "", component: CareComponent },
    { path: "connect-detail/:id", component: ConnectDetailComponent },
    { path: "activity-detail/:title/:date", component: ActivityDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CareRoutingModule { }
