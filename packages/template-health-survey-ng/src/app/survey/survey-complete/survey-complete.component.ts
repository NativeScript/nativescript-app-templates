import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AppService } from "../../shared/app.service";

@Component({
    selector: "Complete",
    templateUrl: "./survey-complete.component.html"
})
export class SurveyCompleteComponent implements OnInit {
    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions
    ) { }

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
}
