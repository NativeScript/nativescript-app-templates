import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SurveyRoutingModule } from "./survey-routing.module";
import { SurveyComponent } from "./survey.component";

@NgModule({
    imports: [
        NativeScriptModule,
        SurveyRoutingModule
    ],
    declarations: [
        SurveyComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SurveyModule { }
