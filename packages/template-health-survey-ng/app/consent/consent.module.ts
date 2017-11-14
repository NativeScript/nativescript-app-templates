import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { ConsentComponent } from "./consent-review/consent/consent.component";
import { ReviewComponent } from "./consent-review/review/review.component";
import { ConsentRoutingModule } from "./consent-routing.module";
import { ConsentSharingComponent } from "./consent-sharing/consent-sharing.component";
import { ConsentTaskService } from "./shared/consent-task.service";
import { DataGatheringComponent } from "./visual-consent/data-gathering/data-gathering.component";
import { DataUseComponent } from "./visual-consent/data-use/data-use.component";
import { StudySurveyComponent } from "./visual-consent/study-survey/study-survey.component";
import { TimeCommitmentComponent } from "./visual-consent/time-commitment/time-commitment.component";
import { WithdrawingComponent } from "./visual-consent/withdrawing/withdrawing.component";
import { WelcomeComponent } from "./welcome.component";

@NgModule({
    imports: [
        ConsentRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        WelcomeComponent,
        ConsentComponent,
        DataGatheringComponent,
        DataUseComponent,
        ReviewComponent,
        ConsentSharingComponent,
        StudySurveyComponent,
        TimeCommitmentComponent,
        WithdrawingComponent
    ],
    providers: [
        ConsentTaskService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ConsentModule { }
