import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";

import { CareCardService } from "../shared/care-card.service";
import { CarePlanActivity, CarePlanActivityType } from "../shared/care-plan-activity.model";
import { CarePlanEvent } from "../shared/care-plan-event.model";

@Component({
    selector: "ActivityDetails",
    moduleId: module.id,
    templateUrl: "./activity-detail.component.html",
    styleUrls: ["./activity-detail.component.css"]
})
export class ActivityDetailComponent implements OnInit {
    isReadonlyActivity: boolean;
    value: number;

    private _selectedDate: Date;
    private _activity: CarePlanActivity;
    private event: CarePlanEvent;

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
                this._selectedDate = new Date(params.date);

                const events = this._careCardService.findEvents(params.title, this._selectedDate);

                if (events && events.length) {
                    this.event = events[0];
                    this.value = this.event.value;
                }

                this.isReadonlyActivity = this._activity.type !== 1;
            });
    }

    onDoneButtonTap(): void {
        if (this.value > 0) {
            if (this.event) {
                this.event.value = this.value;
            } else {
                this.event = new CarePlanEvent(this._activity, this._selectedDate, 0);
            }

            this.event.value = this.value;

            this._careCardService.upsertEvent(this.event, 1);
            this.navigateToCareCard();
        }
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    private navigateToCareCard() {
        this._routerExtensions.navigate([
            "care"],
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
