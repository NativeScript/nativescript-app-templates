import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppService } from "../../../shared/app.service";

@Component({
    selector: "TimeCommitment",
    templateUrl: "./time-commitment.component.html",
    styleUrls: ["../../consent-common.css"]
})
export class TimeCommitmentComponent implements OnInit {
    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onNextButtonTap() {
        this._routerExtensions.navigate(["/consent/visual-consent/study-survey"],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
