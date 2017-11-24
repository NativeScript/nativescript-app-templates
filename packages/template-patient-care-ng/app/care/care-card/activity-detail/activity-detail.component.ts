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
    value: number;

    private _selectedDate: number;
    private _activity: CarePlanActivity;
    private eventHolder: CarePlanEventsHolder;

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
                this._selectedDate = Number(params.date);

                this.eventHolder = this._careCardService.findEventHolder(this.activity.title, this._selectedDate);

                if (this.eventHolder && this.eventHolder.events.length) {
                    this.value = this.eventHolder.events[0].value;
                }

                this.isReadonlyActivity = this._activity.type !== 1;
            });
    }

    onDoneButtonTap(): void {
        if (this.value > 0) {
            if (this.eventHolder && this.eventHolder.events.length) {
                this.eventHolder.events[0].value = this.value;
            } else {
                this.eventHolder = new CarePlanEventsHolder(this._activity, this._selectedDate);
                const event = new CarePlanEvent(this._activity, this._selectedDate);
                event.value = this.value;
                this.eventHolder.events.push(event);
            }

            this._careCardService.upsertEvent(this.eventHolder);
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
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
