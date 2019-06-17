import { Component, NgZone } from "@angular/core";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { UserService, Errors } from "kinvey-nativescript-sdk/lib/angular";
import { User } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    constructor(
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private zone: NgZone,
        private page: Page) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.className = "page-login-container";
        this.page.statusBarStyle = "dark";
    }

    login() {
        if (this._userService.getActiveUser() == null) {
            // see https://devcenter.kinvey.com/nativescript/guides/mobile-identity-connect#MakingMICRequests
            // TODO: UserService.loginWithMIC(...) arguments should be optional (using src/package.json config)
            this._userService.loginWithMIC(null, null)
                .then((user: User) => {
                    this.navigateHome();
                    console.log("user: " + JSON.stringify(user));
                })
                .catch((error: Errors.BaseError) => {
                    alert("An error occurred. Check your Kinvey settings.");
                    console.log("error: " + error);
                });
        } else {
            this.navigateHome();
        }
    }

    private navigateHome() {
        this.zone.run(() => {
            this._routerExtensions.navigate(["home"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        });
    }
}
