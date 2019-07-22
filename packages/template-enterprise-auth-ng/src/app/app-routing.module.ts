import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoggedInLazyLoadGuard } from "./logged-in-lazy-load.guard";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", loadChildren: import(`~/app/login/login.module`).then(m => m.LoginModule) },
    { path: "home", loadChildren: import(`~/app/home/home.module`).then(m => m.HomeModule), canLoad: [LoggedInLazyLoadGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
