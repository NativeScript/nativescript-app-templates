import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { StudyDateStep } from "../core/task-manager/steps";
import { TaskManagerService } from "../core/task-manager/task-manager.service";
import { AppService } from "../shared/app.service";

@Component({
    selector: "SurveyDateQuestion",
    templateUrl: "./survey-date-question.component.html"
})
export class SurveyDateQuestionComponent implements OnInit {
    answer: Date;

    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions,
        private _taskManagerService: TaskManagerService
    ) { }

    ngOnInit(): void {
        this.answer = new Date();
    }

    onDoneButtonTap() {
        this._taskManagerService.addStep(new StudyDateStep("dateQuestionStep", this.answer));
        this._taskManagerService.pushTask("dateQuestionTask");

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
}
