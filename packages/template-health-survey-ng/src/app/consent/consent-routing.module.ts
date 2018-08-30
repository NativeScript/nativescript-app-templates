import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ConsentComponent } from "./consent-review/consent/consent.component";
import { ReviewComponent } from "./consent-review/review/review.component";
import { ConsentSharingComponent } from "./consent-sharing/consent-sharing.component";
import { DataGatheringComponent } from "./visual-consent/data-gathering/data-gathering.component";
import { DataUseComponent } from "./visual-consent/data-use/data-use.component";
import { StudySurveyComponent } from "./visual-consent/study-survey/study-survey.component";
import { TimeCommitmentComponent } from "./visual-consent/time-commitment/time-commitment.component";
import { WithdrawingComponent } from "./visual-consent/withdrawing/withdrawing.component";
import { WelcomeComponent } from "./welcome.component";

const routes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "consent-review/consent", component: ConsentComponent },
    { path: "consent-review/review", component: ReviewComponent },
    { path: "consent-sharing", component: ConsentSharingComponent },
    { path: "visual-consent/data-gathering", component: DataGatheringComponent },
    { path: "visual-consent/data-use", component: DataUseComponent },
    { path: "visual-consent/study-survey", component: StudySurveyComponent },
    { path: "visual-consent/time-commitment", component: TimeCommitmentComponent },
    { path: "visual-consent/withdrawing", component: WithdrawingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ConsentRoutingModule { }
