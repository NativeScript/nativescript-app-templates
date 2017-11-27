import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SurveyCompleteComponent } from "./survey-complete/survey-complete.component";
import { SurveyRoutingModule } from "./survey-routing.module";
import { SurveyComponent } from "./survey.component";

@NgModule({
    imports: [
        NativeScriptModule,
        SurveyRoutingModule
    ],
    declarations: [
        SurveyComponent,
        SurveyCompleteComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SurveyModule { }
