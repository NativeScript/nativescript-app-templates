import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable({
    providedIn: "root"
})
export class AppService {
    constructor(private _routerExtensions: RouterExtensions) { }

    logOut() {
        Kinvey.User.logout();

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
