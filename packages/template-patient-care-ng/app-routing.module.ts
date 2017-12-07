import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

const routes: Routes = [
    { path: "", redirectTo: "/care", pathMatch: "full" },
    { path: "care", loadChildren: "./care/care.module#CareModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "login", loadChildren: "./login/login.module#LoginModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
