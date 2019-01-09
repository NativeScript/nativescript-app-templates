import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

const routes: Routes = [
    { path: "", redirectTo: "/consent", pathMatch: "full" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "consent", loadChildren: "~/app/consent/consent.module#ConsentModule", canLoad: [LoggedInLazyLoadGuard] },
    { path: "survey", loadChildren: "~/app/survey/survey.module#SurveyModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
