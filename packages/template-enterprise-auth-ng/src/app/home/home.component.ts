import { Component, ElementRef, OnInit } from "@angular/core";
import { User } from "kinvey-nativescript-sdk";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { UserService } from "kinvey-nativescript-sdk/lib/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    loggedUser: string;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private page: Page) {
        this.page.actionBarHidden = false;
    }

    ngOnInit(): void {
        this._userService.me()
            .then((user: User) => {
                this.loggedUser = (<any>user.data._socialIdentity).kinveyAuth.id;
            });
    }

    logout() {
        this._userService.logout()
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

    onMenuButtonTap(args: EventData) {
        // Navigate to corresponding page
        const menuButtonParent = (<StackLayout>args.object).parent;
        alert("Navigate to " + menuButtonParent.get("data-name"));
    }

    onProfileButtonTap() {
        // Navigate to profile page here
        alert("Navigate to profile page");
    }
}
