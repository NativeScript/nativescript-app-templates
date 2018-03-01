import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class LoggedInLazyLoadGuard implements CanLoad {
    constructor(private _routerExtensions: RouterExtensions) { }

    canLoad(): boolean {
        if (!Kinvey.User.getActiveUser()) {
            this._routerExtensions.navigate(["login"], { clearHistory: true });
        }

        return true;
    }
}