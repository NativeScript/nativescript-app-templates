import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "TimeCommitment",
    moduleId: module.id,
    templateUrl: "./time-commitment.component.html",
    styleUrls: ["../consent-common.css", "../consent.css"]
})
export class TimeCommitmentComponent implements OnInit {
    constructor(private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onNextButtonTap() {
        this._routerExtensions.navigate(["/consent/study-survey"],
            {
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "ease"
                }
            });
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
}
