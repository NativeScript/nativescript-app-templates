import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CareCardComponent } from "./care-card.component";

const routes: Routes = [
    { path: "", component: CareCardComponent },
    { path: "connect", component: CareCardComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CareCardRoutingModule { }
