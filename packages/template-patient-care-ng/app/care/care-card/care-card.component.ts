import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { Observable } from "rxjs/Rx";

import { CareCardService } from "./shared/care-card.service";
import { CarePlanActivity, CarePlanActivityType } from "./shared/care-plan-activity.model";
import { CarePlanEvent, CarePlanEventsHolder } from "./shared/care-plan-event.model";

@Component({
    selector: "CareCard",
    moduleId: module.id,
    templateUrl: "./care-card.component.html"
})
export class CareCardComponent implements OnInit {
    isLoading: boolean;

    private _physicalEvents: Array<CarePlanEventsHolder>;
    private _otherEvents: Array<CarePlanEventsHolder>;
    private _assessmentEvents: Array<CarePlanEventsHolder>;
    private _medicationEvents: Array<CarePlanEventsHolder>;

    private _allActivities: Array<CarePlanActivity>;
    private _selectedDate: Date;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _careCardService: CareCardService
    ) {
    }

    get physicalEvents(): Array<CarePlanEventsHolder> {
        return this._physicalEvents;
    }

    get assessmentEvents(): Array<CarePlanEventsHolder> {
        return this._assessmentEvents;
    }

    get otherEvents(): Array<CarePlanEventsHolder> {
        return this._otherEvents;
    }

    get medicationEvents(): Array<CarePlanEventsHolder> {
        return this._medicationEvents;
    }

    ngOnInit(): void {
        this.isLoading = true;

        this._physicalEvents = new Array<CarePlanEventsHolder>();
        this._assessmentEvents = new Array<CarePlanEventsHolder>();
        this._otherEvents = new Array<CarePlanEventsHolder>();
        this._medicationEvents = new Array<CarePlanEventsHolder>();

        this._careCardService.getAllActivities()
            .then((activities: Array<any>) => {
                this.isLoading = false;
                this._allActivities = activities;

                this.getEvents(this._allActivities, this._selectedDate);
            });
    }

    onSelectedDateChanged(date: Date) {
        this._selectedDate = date;

        if (this._allActivities) {
            this.getEvents(this._allActivities, this._selectedDate);
        }
    }

    onActivityEventTap(eventHolder: CarePlanEventsHolder, event: CarePlanEvent) {
        event.value = event.value === 0 ? 1 : 0;
        this._careCardService.upsertEvent(eventHolder);
    }

    onActivityTap(eventHolder: CarePlanEventsHolder) {
        this._routerExtensions.navigate([
            "care/activity-detail",
            eventHolder.activity.title,
            this._selectedDate.toISOString()],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    private getEvents(activities: Array<CarePlanActivity>, selectedDate: Date) {
        this._physicalEvents = new Array<CarePlanEventsHolder>();
        this._assessmentEvents = new Array<CarePlanEventsHolder>();
        this._otherEvents = new Array<CarePlanEventsHolder>();
        this._medicationEvents = new Array<CarePlanEventsHolder>();

        activities.forEach((activity) => {
            const day: number = selectedDate.getDay();
            const occurrencesForDay: number = activity.schedule[day] || 0;
            const eventHolder = new CarePlanEventsHolder(activity, selectedDate);

            for (let index = 0; index < occurrencesForDay; index++) {
                const event = new CarePlanEvent(activity, selectedDate);
                eventHolder.events.push(event);
            }

            if (activity.groupIdentifier === CarePlanActivityType.physical) {
                this._physicalEvents.push(eventHolder);
            } else if (activity.groupIdentifier === CarePlanActivityType.assesment) {
                this._assessmentEvents.push(eventHolder);
            } else if (activity.groupIdentifier === CarePlanActivityType.medication) {
                this._medicationEvents.push(eventHolder);
            } else if (activity.groupIdentifier === CarePlanActivityType.other) {
                this._otherEvents.push(eventHolder);
            }
        });

        this.mapEvents(this._physicalEvents, selectedDate);
        this.mapEvents(this._assessmentEvents, selectedDate);
        this.mapEvents(this._medicationEvents, selectedDate);
        this.mapEvents(this._otherEvents, selectedDate);
    }

    private mapEvents(eventsCollection: Array<CarePlanEventsHolder>, selectedDate: Date) {
        eventsCollection.forEach((eventHolder) => {
            // tslint:disable-next-line:max-line-length
            const savedEventHolder = this._careCardService.findEventHolder(eventHolder.activity.title, selectedDate);

            if (savedEventHolder) {
                eventHolder.events = savedEventHolder.events;
            }
        });
    }
}
