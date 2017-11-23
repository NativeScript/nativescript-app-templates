import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";

import { CareCardService } from "../shared/care-card.service";
import { CarePlanActivity, CarePlanActivityType } from "../shared/care-plan-activity.model";
import { CarePlanEvent, CarePlanEventsHolder } from "../shared/care-plan-event.model";

@Component({
    selector: "ActivityDetails",
    moduleId: module.id,
    templateUrl: "./activity-detail.component.html",
    styleUrls: ["./activity-detail.component.css"]
})
export class ActivityDetailComponent implements OnInit {
    isReadonlyActivity: boolean;
    value: string;

    private _activity: CarePlanActivity;

    constructor(
        private _careCardService: CareCardService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    get activity(): CarePlanActivity {
        return this._activity;
    }

    ngOnInit(): void {
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                this._activity = this._careCardService.getActivity(params.title);

                this.isReadonlyActivity = this._activity.type !== 1;
            });
    }

    onDoneButtonTap(): void {

    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
