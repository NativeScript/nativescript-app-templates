import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SurveyCompleteComponent } from "./survey-complete/survey-complete.component";
import { SurveyComponent } from "./survey.component";

const routes: Routes = [
    { path: "", component: SurveyComponent },
    { path: "complete", component: SurveyCompleteComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SurveyRoutingModule { }
