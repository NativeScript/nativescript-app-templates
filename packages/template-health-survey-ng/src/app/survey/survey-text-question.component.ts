import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { StudyTextStep } from "../core/task-manager/steps";
import { TaskManagerService } from "../core/task-manager/task-manager.service";
import { AppService } from "../shared/app.service";

@Component({
    selector: "SurveyTextQuestion",
    moduleId: module.id,
    templateUrl: "./survey-text-question.component.html"
})
export class SurveyTextQuestionComponent {
    answer: string;

    constructor(
        public appService: AppService,
        private _routerExtensions: RouterExtensions,
        private _taskManagerService: TaskManagerService
    ) { }

    get isAnswerSelected(): boolean {
        return this.answer != null && this.answer.length > 0;
    }

    onNextButtonTap(pushTask: boolean = true) {
        if (pushTask) {
            this._taskManagerService.addStep(new StudyTextStep("textQuestionStep", this.answer));
            this._taskManagerService.pushTask("textQuestionTask");
        }

        this._routerExtensions.navigate(["/survey/third"],
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
