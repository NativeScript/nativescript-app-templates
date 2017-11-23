import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ActivityDetailComponent } from "./care-card/activity-detail/activity-detail.component";
import { ConnectDetailComponent } from "./connect/connect-detail/connect-detail.component";
import { TabsComponent } from "./tabs.component";

const routes: Routes = [
    { path: "", component: TabsComponent },
    { path: "connect-detail/:id", component: ConnectDetailComponent },
    { path: "activity-detail/:title", component: ActivityDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TabsRoutingModule { }
