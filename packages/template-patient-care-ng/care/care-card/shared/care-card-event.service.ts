import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { BehaviorSubject, Observable } from "rxjs";

import { CarePlanActivityType } from "./care-plan-activity-type.enum";
import { CarePlanActivity } from "./care-plan-activity.model";
import { CarePlanEvent } from "./care-plan-event.model";

export const enum CarePlanEventState {
    Initial = 0,
    NotCompleted = 1,
    Completed = 2
}

@Injectable()
export class CareCardEventService {
    updatedEvent$: Observable<CarePlanEvent>;

    private _updatedEventItemSource: BehaviorSubject<CarePlanEvent>;
    private _eventsDataStore = Kinvey.DataStore.collection<any>("Event");
    private _events: Array<CarePlanEvent>;
    private _eventsPromise: Promise<any>;

    constructor() {
        this._events = new Array<CarePlanEvent>();

        // Observable events source
        this._updatedEventItemSource = new BehaviorSubject<CarePlanEvent>(null);

        // Observable events stream
        this.updatedEvent$ = this._updatedEventItemSource.asObservable();
    }

    upsertEvent(event: CarePlanEvent, eventsCount: number): Promise<any> {
        return this.findEvents(event.activity.title, event.date)
            .then((registeredEvents: Array<CarePlanEvent>) => {
                let promiseQueue = Promise.resolve();

                if (registeredEvents.length === eventsCount) {
                    let eventToUpdate = registeredEvents.find((currentEvent) => {
                        return currentEvent.occurrenceIndexOfDay === event.occurrenceIndexOfDay;
                    });

                    eventToUpdate = event;
                } else {
                    this._events.push(event);
                    promiseQueue = promiseQueue.then(() => this.saveEvent(event));
                }

                return promiseQueue;
            })
            .then(() => this._updatedEventItemSource.next(event));
    }

    findEvents(title: string, date: Date): Promise<Array<CarePlanEvent>> {
        return this.getEvents()
            .then(() => {
                const filteredEvents = this._events.filter((currentEvent) => {
                    return currentEvent.date.toDateString() === date.toDateString() &&
                        currentEvent.activity.title === title;
                });

                return filteredEvents;
            });
    }

    private getEvents(): Promise<any> {
        if (!this._eventsPromise) {
            this._eventsPromise = this._eventsDataStore.find().toPromise()
                .then((data) => {
                    const events = [];

                    if (data && data.length) {
                        data.forEach((eventData: any) => {
                            const activity = new CarePlanActivity(eventData.activity);

                            const jsonDate = eventData.date;
                            const date = new Date(jsonDate.year, jsonDate.month - 1, jsonDate.day);

                            const occurrenceIndexOfDay = eventData.occurrenceIndexOfDay;

                            const result = eventData.result;
                            const value = result && result.values && result.values.length ? result.values[0] : 1;

                            const event = new CarePlanEvent(activity, date, occurrenceIndexOfDay, value);

                            events.push(event);
                        });
                    }

                    this._events = events;

                    return events;
                })
                .catch((error: Kinvey.BaseError) => {
                    alert({
                        title: "Oops something went wrong.",
                        message: error.message,
                        okButtonText: "Ok"
                    });
                });
        }

        return this._eventsPromise;
    }

    private saveEvent(event: CarePlanEvent): Promise<any> {
        const eventObject: any = {
            activity: event.activity.getJson(),
            date: {
                year: event.date.getUTCFullYear(),
                month: event.date.getUTCMonth() + 1,
                era: 1,
                day: event.date.getUTCDate()
            },
            numberOfDaysSinceStart: event.activity.getNumberOfDaysSinceStart(),
            occurrenceIndexOfDay: event.occurrenceIndexOfDay,
            state: CarePlanEventState.Completed
        };

        if (event.activity.type === CarePlanActivityType.Assessment) {
            const result: any = {
                creationDate: new Date(),
                values: [event.value],
                valueString: event.value.toString()
            };

            if (event.activity.title === "Weight") {
                result.unitStringKeys = { lb: "lb" };
                result.displayUnit = "lb";
                result.unitString = "lb";
            } else {
                result.unitString = "of 10";
            }

            eventObject.result = result;
        }

        return this._eventsDataStore.save(eventObject);
    }
}
