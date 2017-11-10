import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "survey", loadChildren: "./survey/survey.module#SurveyModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Survey",
    moduleId: module.id,
    templateUrl: "./survey.component.html"
})
export class SurveyComponent implements OnInit {
    isAnswerSelected: boolean = false;
    answer: boolean = false;

    constructor(private _routerExtensions: RouterExtensions) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    onDoneButtonTap() {
        // TODO: Implement
    }

    onYesTap() {
        this.isAnswerSelected = true;
        this.answer = true;
    }

    onNoTap() {
        this.isAnswerSelected = true;
        this.answer = false;
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
