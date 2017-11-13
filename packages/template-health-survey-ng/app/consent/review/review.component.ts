import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Review",
    moduleId: module.id,
    templateUrl: "./review.component.html",
    styleUrls: ["../consent-common.css", "../consent.css"]
})
export class ReviewComponent implements OnInit {
    constructor(private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onCancelButtonTap() {
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

    onDisagreeButtonTap() {
        this._routerExtensions.navigate(["/login"],
            {
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    onAgreeButtonTap() {
        this._routerExtensions.navigate(["/consent/consent"],
            {
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
