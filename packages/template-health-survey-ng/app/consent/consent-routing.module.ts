import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ConsentComponent } from "./consent/consent.component";
import { DataGatheringComponent } from "./data-gathering/data-gathering.component";
import { DataUseComponent } from "./data-use/data-use.component";
import { ReviewComponent } from "./review/review.component";
import { SharingOptionsComponent } from "./sharing-options/sharing-options.component";
import { StudySurveyComponent } from "./study-survey/study-survey.component";
import { TimeCommitmentComponent } from "./time-commitment/time-commitment.component";
import { WelcomeComponent } from "./welcome.component";
import { WithdrawingComponent } from "./withdrawing/withdrawing.component";

const routes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "consent", component: ConsentComponent },
    { path: "data-gathering", component: DataGatheringComponent },
    { path: "data-use", component: DataUseComponent },
    { path: "review", component: ReviewComponent },
    { path: "sharing-options", component: SharingOptionsComponent },
    { path: "study-survey", component: StudySurveyComponent },
    { path: "time-commitment", component: TimeCommitmentComponent },
    { path: "withdrawing", component: WithdrawingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ConsentRoutingModule { }
