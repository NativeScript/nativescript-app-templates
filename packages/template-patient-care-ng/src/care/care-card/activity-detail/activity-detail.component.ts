import { Component, OnInit } from "@angular/core";
import { EventData } from "data/observable";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { TextField } from "ui/text-field";

import { CareCardActivityService } from "../shared/care-card-activity.service";
import { CareCardEventService } from "../shared/care-card-event.service";
import { CarePlanActivityType } from "../shared/care-plan-activity-type.enum";
import { CarePlanActivity } from "../shared/care-plan-activity.model";
import { CarePlanEvent } from "../shared/care-plan-event.model";

const IOS_KEYBOARDTYPE_DECIMALPAD: number = 8;

@Component({
    selector: "ActivityDetails",
    moduleId: module.id,
    templateUrl: "./activity-detail.component.html",
    styleUrls: ["./activity-detail.component.css", "../../care-common.css"]
})
export class ActivityDetailComponent implements OnInit {
    isReadOnlyActivity: boolean;
    value: number;

    private _selectedDate: Date;
    private _activity: CarePlanActivity;
    private event: CarePlanEvent;

    constructor(
        private _careCardActivityService: CareCardActivityService,
        private _careCardEventService: CareCardEventService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    get activity(): CarePlanActivity {
        return this._activity;
    }

    ngOnInit(): void {
        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                this._activity = this._careCardActivityService.getActivity(params.title);
                this._selectedDate = new Date(params.date);
                this.isReadOnlyActivity = this._activity.type !== CarePlanActivityType.Assessment;

                this._careCardEventService.findEvents(params.title, this._selectedDate)
                    .then((events: Array<CarePlanEvent>) => {
                        if (events && events.length) {
                            this.event = events[0];
                            this.value = this.event.value;
                        }
                    });
            });
    }

    onNumericFieldLoaded(args: EventData): void {
        const numericField = <TextField>args.object;
        if (numericField.ios) {
            numericField.ios.keyboardType = IOS_KEYBOARDTYPE_DECIMALPAD;
        }
    }

    onDoneButtonTap(): void {
        // TextField input comes as numeric string
        this.value = +this.value;

        if (this.value > 0) {
            if (this.event) {
                this.event.value = this.value;
            } else {
                this.event = new CarePlanEvent(this._activity, this._selectedDate, 0);
            }

            this.event.value = this.value;

            this._careCardEventService.upsertEvent(this.event, 1)
                .then(() => this.navigateToCareCard());
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
