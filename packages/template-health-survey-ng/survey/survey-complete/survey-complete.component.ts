import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

@Component({
    selector: "Complete",
    moduleId: module.id,
    templateUrl: "./survey-complete.component.html"
})
export class SurveyCompleteComponent implements OnInit {
    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
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
