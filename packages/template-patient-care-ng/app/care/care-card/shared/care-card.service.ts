import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Observable } from "rxjs/Rx";

// tslint:disable-next-line:max-line-length
import { CarePlanActivity, CarePlanActivityType } from "./care-plan-activity.model";
import { CarePlanEvent } from "./care-plan-event.model";

@Injectable()
export class CareCardService {
    private _events: Array<CarePlanEvent>;
    private _activities: Array<CarePlanActivity>;
    private _selectedDate: Date;
    private _activityStore = Kinvey.DataStore.collection<any>("Activity");

    constructor() {
        this._selectedDate = new Date();
        this._events = new Array<CarePlanEvent>();
        this._activities = Array<CarePlanActivity>();
    }

    get selectedDate(): Date {
        return this._selectedDate;
    }

    set selectedDate(date: Date) {
        this._selectedDate = date;
    }

    get events(): Array<CarePlanEvent> {
        return this._events;
    }

    getActivity(title: string): CarePlanActivity {
        const activity = this._activities.find((currentActivity) => {
            return currentActivity.title === title;
        });

        return activity;
    }

    findEvents(title: string, date: Date): Array<CarePlanEvent> {
        const event = this._events.filter((currentEvent) => {
            return currentEvent.date.toDateString() === date.toDateString() && currentEvent.activity.title === title;
        });

        return event;
    }

    getAllActivities(): Promise<any> {
        if (this._activities.length) {
            return Promise.resolve(this._activities);
        } else {

            return this._activityStore.find().toPromise()
                .then((data) => {
                    const activities = [];

                    data.forEach((activityData: any) => {
                        const activity = new CarePlanActivity(activityData);
                        activities.push(activity);
                    });

                    this._activities = activities;

                    return activities;
                })
                .catch((error: Kinvey.BaseError) => {
                    alert({
                        title: "Opps something went wrong.",
                        message: error.message,
                        okButtonText: "Ok"
                    });
                });
        }
    }

    upsertEvent(event: CarePlanEvent, eventsCount: number) {
        const registeredEvents = this.findEvents(event.activity.title, event.date);

        if (registeredEvents.length === eventsCount) {
            let eventToUpdate = registeredEvents.find((currentEvent) => {
                return currentEvent.index === event.index;
            });

            eventToUpdate = event;
        } else {
            this._events.push(event);
        }
    }

    getOverviewValue(date: Date): number {
        const activities = this._activities;
        let overviewValue: number = 0;
        let totalEventsCount: number = 0;
        let savedEventsCount: number = 0;

        activities.forEach((activity) => {
            const savedEvents = this.findEvents(activity.title, date);
            totalEventsCount += activity.events.length;

            savedEvents.forEach((savedEvent) => {
                if (savedEvent.value !== 0) {
                    savedEventsCount++;
                }
            });
        });

        overviewValue = (savedEventsCount / totalEventsCount) * 100;

        if (overviewValue) {
            return overviewValue;
        } else {
            return 0;
        }
    }
}
