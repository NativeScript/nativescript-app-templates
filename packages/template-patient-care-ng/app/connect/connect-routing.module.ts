import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ConnectComponent } from "./connect.component";

const routes: Routes = [
    { path: "", component: ConnectComponent },
    { path: "connect", component: ConnectComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ConnectRoutingModule { }
