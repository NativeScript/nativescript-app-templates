import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppService } from "../../../shared/app.service";

@Component({
    selector: "Review",
    templateUrl: "./review.component.html",
    styleUrls: ["../../consent-common.css"]
})
export class ReviewComponent implements OnInit {
    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onAgreeButtonTap() {
        this._routerExtensions.navigate(["/consent/consent-review/consent"],
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
