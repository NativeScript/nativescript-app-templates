import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";

@Component({
    selector: "Complete",
    moduleId: module.id,
    templateUrl: "./survey-complete.component.html"
})
export class SurveyCompleteComponent implements OnInit {
    constructor(private _page: Page) { }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
    }
}
