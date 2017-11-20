import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { StudyStep } from "../shared/study-step.model";
import { TaskService } from "../shared/task.service";

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
        private _taskService: TaskService
    ) { }

    ngOnInit(): void {
        this.isAnswerSelected = false;
        this.answer = false;
    }

    onDoneButtonTap() {
        this._taskService.addStep(new StudyStep("booleanQuestionStep", this.answer));
        this._taskService.pushTask("booleanQuestionTask");
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
