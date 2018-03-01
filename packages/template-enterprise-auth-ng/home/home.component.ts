import { Component, ElementRef, OnInit } from "@angular/core";
import { Button } from "ui/button";
import { Kinvey, User } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public loggedUser: string;

    constructor(private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        Kinvey.User.me()
            .then((user: User) => {
                this.loggedUser = user.data['_socialIdentity'].kinveyAuth.id
            });
    }

    logout() {
        Kinvey.User.logout()
            .then(() => {
                this._routerExtensions.navigate(["login"],
                    {
                        clearHistory: true,
                        animated: true,
                        transition: {
                            name: "slideBottom",
                            duration: 350,
                            curve: "ease"
                        }
                    });
            });
    }
}
