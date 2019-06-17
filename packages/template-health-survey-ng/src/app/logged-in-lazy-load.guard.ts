import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { UserService } from "kinvey-nativescript-sdk/lib/angular";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class LoggedInLazyLoadGuard implements CanLoad {
    constructor(private _routerExtensions: RouterExtensions, private _userService: UserService) { }

    canLoad(): boolean {
        if (!this._userService.getActiveUser()) {
            this._routerExtensions.navigate(["login"], { clearHistory: true });
        }

        return true;
    }
}
