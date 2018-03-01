import { Component } from "@angular/core";
import { Button } from "ui/button";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    constructor(private _routerExtensions: RouterExtensions) {
    }

    login() {
        if (Kinvey.User.getActiveUser() == null) {
            Kinvey.User.loginWithMIC('http://example.com', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, { version: 'v2' })
                .then((user: Kinvey.User) => {
                    this.navigateHome();
                    console.log("user: " + JSON.stringify(user));
                })
                .catch((error: Kinvey.BaseError) => {
                    alert("Error!");
                    console.log("error: " + error);
                });
        } else {
            this.navigateHome();
        }
    }

    private navigateHome() {
        this._routerExtensions.navigate(["home"], {
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 350,
                curve: "ease"
            }
        });
    }
}
