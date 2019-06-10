import { Injectable } from "@angular/core";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { UserService } from "kinvey-nativescript-sdk/lib/angular";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable({
    providedIn: "root"
})
export class AppService {
    constructor(private _routerExtensions: RouterExtensions, private _userService: UserService) { }

    logOut() {
        this._userService.logout();

        this._routerExtensions.navigate(["/login"],
            {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
