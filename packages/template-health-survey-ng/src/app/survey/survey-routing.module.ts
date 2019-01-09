import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SurveyBooleanQuestionComponent } from "./survey-boolean-question.component";
import { SurveyCompleteComponent } from "./survey-complete/survey-complete.component";
import { SurveyDateQuestionComponent } from "./survey-date-question.component";
import { SurveyTextQuestionComponent } from "./survey-text-question.component";

const routes: Routes = [
    { path: "", component: SurveyBooleanQuestionComponent },
    { path: "second", component: SurveyTextQuestionComponent },
    { path: "third", component: SurveyDateQuestionComponent },
    { path: "complete", component: SurveyCompleteComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SurveyRoutingModule { }
