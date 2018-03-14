import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { SurveyBooleanQuestionComponent } from "./survey-boolean-question.component";
import { SurveyCompleteComponent } from "./survey-complete/survey-complete.component";
import { SurveyDateQuestionComponent } from "./survey-date-question.component";
import { SurveyRoutingModule } from "./survey-routing.module";
import { SurveyTextQuestionComponent } from "./survey-text-question.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        SharedModule,
        SurveyRoutingModule
    ],
    declarations: [
        SurveyBooleanQuestionComponent,
        SurveyCompleteComponent,
        SurveyDateQuestionComponent,
        SurveyTextQuestionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SurveyModule { }
