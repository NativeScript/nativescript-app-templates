import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { StudyStep } from "../core/task-manager/steps";
import { TaskManagerService } from "../core/task-manager/task-manager.service";

@Component({
    selector: "Survey",
    moduleId: module.id,
    templateUrl: "./survey.component.html"
})
export class SurveyComponent implements OnInit {
    isAnswerSelected: boolean;
    answer: boolean;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _taskManagerService: TaskManagerService
    ) { }

    ngOnInit(): void {
        this.isAnswerSelected = false;
        this.answer = false;
    }

    onYesTap() {
        this.isAnswerSelected = true;
        this.answer = true;
    }

    onNoTap() {
        this.isAnswerSelected = true;
        this.answer = false;
    }

    onDoneButtonTap() {
        this._taskManagerService.addStep(new StudyStep("booleanQuestionStep", this.answer));
        this._taskManagerService.pushTask("booleanQuestionTask");

        this._routerExtensions.navigate(["/survey/complete"],
            {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slide",
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
