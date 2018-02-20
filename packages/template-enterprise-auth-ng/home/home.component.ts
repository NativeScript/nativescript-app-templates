import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Button } from "ui/button";
import { Kinvey } from 'kinvey-nativescript-sdk';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    @ViewChild("loginButton") loginButton: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
        let viewButton: Button = this.loginButton.nativeElement;
        viewButton.text = (Kinvey.User.getActiveUser() == null ? `Login` : `Logout`);
    }

    submit() {
        let viewButton: Button = this.loginButton.nativeElement;
        if (Kinvey.User.getActiveUser() == null) {
            Kinvey.User.loginWithMIC('http://example.com', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, { version: 'v2' })

                .then((user: Kinvey.User) => {
                    alert("Logged in!");
                    console.log("user: " + JSON.stringify(user));
                    viewButton.text = `Logout`;
                })
                .catch((error: Kinvey.BaseError) => {
                    alert("Error!");
                    console.log("error: " + error);
                });
        }
        else {
            let viewButton: Button = this.loginButton.nativeElement;

            Kinvey.User.logout()
                .then(() => {
                    alert("Logged out!");
                    viewButton.text = `Login`;
                });
        }
    }
}
