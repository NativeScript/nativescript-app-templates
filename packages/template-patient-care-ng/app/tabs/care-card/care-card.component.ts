import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { Observable } from "rxjs/Rx";

import { CareCardService } from "./shared/care-card.service";
import { CarePlanActivity, CarePlanActivityType, CarePlanIdentifierType } from "./shared/care-plan-activity.model";
import { CarePlanEvent, CarePlanEventsHolder } from "./shared/care-plan-event.model";

@Component({
    selector: "CareCard",
    moduleId: module.id,
    templateUrl: "./care-card.component.html"
})
export class CareCardComponent implements OnInit {
    private _physicalEvents: Array<CarePlanEventsHolder>;
    private _optionalEvents: Array<CarePlanEventsHolder>;
    private _assessmentEvents: Array<CarePlanEventsHolder>;

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

    ngOnInit(): void {
        this._currentDayOfWeek = this.getDayOfWeek(this._currentDate);

        this._allActivities = this._careCardService.getAllActivities();

        this.getEvents(this._allActivities, this._currentDayOfWeek);
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
        event.isExecuted = !event.isExecuted;

        this.upsertEvent(eventHolder);
    }

    onActivityTap(args: ListViewEventData): void {
        const tappedTeamItem = args.view.bindingContext;

        this._routerExtensions.navigate(["tabs/connect-detail", tappedTeamItem.id],
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
            }
        });

        this.mapEvents(this._physicalEvents, currentDayOfWeek);
        this.mapEvents(this._assessmentEvents, currentDayOfWeek);
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
