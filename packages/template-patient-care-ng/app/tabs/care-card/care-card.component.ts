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

    private _currentDayOfWeek: number;
    private _currentDate: Date = new Date();

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

        this._currentDayOfWeek = this.getDayOfWeek(this._currentDate);

        this._careCardService.getAllActivities()
            .then((activities: Array<any>) => {
                this.isLoading = false;
                this._allActivities = activities;
                this.getEvents(this._allActivities, this._currentDayOfWeek);
            });
    }

    nextDayButtonTap() {
        this._currentDayOfWeek++;

        this.getEvents(this._allActivities, this._currentDayOfWeek);
    }

    prevDayButtonTap() {
        this._currentDayOfWeek--;

        this.getEvents(this._allActivities, this._currentDayOfWeek);
    }

    onActivityEventTap(eventHolder: CarePlanEventsHolder, event: CarePlanEvent) {
        event.value = event.value === 0 ? 1 : 0;
        this.upsertEvent(eventHolder);
    }

    onActivityTap(eventHolder: CarePlanEventsHolder) {
        this._routerExtensions.navigate([
            "tabs/activity-detail",
            eventHolder.activity.title],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    private getEvents(activities: Array<CarePlanActivity>, currentDayOfWeek: number) {
        this._physicalEvents = new Array<CarePlanEventsHolder>();
        this._assessmentEvents = new Array<CarePlanEventsHolder>();
        this._otherEvents = new Array<CarePlanEventsHolder>();
        this._medicationEvents = new Array<CarePlanEventsHolder>();

        activities.forEach((activity) => {
            const occurrencesForDay: number = activity.schedule[currentDayOfWeek] || 0;
            const eventHolder = new CarePlanEventsHolder(activity, currentDayOfWeek);

            for (let index = 0; index < occurrencesForDay; index++) {
                const event = new CarePlanEvent(this._currentDate, activity);
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

        this.mapEvents(this._physicalEvents, currentDayOfWeek);
        this.mapEvents(this._assessmentEvents, currentDayOfWeek);
        this.mapEvents(this._medicationEvents, currentDayOfWeek);
        this.mapEvents(this._otherEvents, currentDayOfWeek);
    }

    private mapEvents(eventsCollection: Array<CarePlanEventsHolder>, currentDayOfWeek: number) {
        eventsCollection.forEach((eventHolder) => {
            const savedEventHolder = this._careCardService.findEventHolder(eventHolder);

            if (savedEventHolder) {
                eventHolder.events = savedEventHolder.events;
            }
        });
    }

    private upsertEvent(eventHolder: CarePlanEventsHolder) {
        let eventToUpdate = this._careCardService.findEventHolder(eventHolder);

        if (eventToUpdate) {
            eventToUpdate = eventHolder;
        } else {
            this._careCardService.events.push(eventHolder);
        }
    }

    private getDayOfWeek(date: Date): number {
        return 0;
    }
}
