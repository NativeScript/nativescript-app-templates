import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

const routes: Routes = [
    { path: "", redirectTo: "/consent", pathMatch: "full" },
    { path: "login", loadChildren: import(`~/app/login/login.module`).then(m => m.LoginModule) },
    { path: "consent", loadChildren: import(`~/app/consent/consent.module`).then(m => m.ConsentModule), canLoad: [LoggedInLazyLoadGuard] },
    { path: "survey", loadChildren: import(`~/app/survey/survey.module`).then(m => m.SurveyModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
