import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";

import { CareCardEventService } from "./care-card-event.service";
import { CarePlanActivity, CarePlanActivityType } from "./care-plan-activity.model";
import { CarePlanEvent } from "./care-plan-event.model";

@Injectable()
export class CareCardService {
    selectedDate$: Observable<Date>;
    events$: Observable<CarePlanEvent>;

    private _events: Array<CarePlanEvent>;

    private _selectedDateItemSource: BehaviorSubject<Date>;
    private _eventsItemSource: BehaviorSubject<CarePlanEvent>;
    private _activities: Array<CarePlanActivity>;
    private _activityStore = Kinvey.DataStore.collection<any>("Activity");
    private _activitiesPromise: Promise<any>;

    constructor(private _careCardEventService: CareCardEventService) {
        this._activities = new Array<CarePlanActivity>();

        this._events = new Array<CarePlanEvent>();

        // Observable selectedDate source
        this._selectedDateItemSource = new BehaviorSubject<Date>(new Date());

        // Observable events source
        this._eventsItemSource = new BehaviorSubject<CarePlanEvent>(null);

        // Observable selectedDate stream
        this.selectedDate$ = this._selectedDateItemSource.asObservable();

        // Observable events stream
        this.events$ = this._eventsItemSource.asObservable();

        this.getActivities().then((activities: Array<CarePlanActivity>) => {
            this._activities = activities;

            this.updateSelectedDate(new Date());
        });
    }

    updateSelectedDate(date: Date) {
        this._selectedDateItemSource.next(date);
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
            this._careCardEventService.saveEvent(event);
        }

        this._eventsItemSource.next(event);
    }

    findEvents(title: string, date: Date): Array<CarePlanEvent> {
        const event = this._events.filter((currentEvent) => {
            return currentEvent.date.toDateString() === date.toDateString() && currentEvent.activity.title === title;
        });

        return event;
    }

    getActivity(title: string): CarePlanActivity {
        const activity = this._activities.find((currentActivity) => {
            return currentActivity.title === title;
        });

        return activity;
    }

    getOverviewValue(date: Date): number {
        const activities = this._activities;
        let overviewValue: number = 0;
        let totalEventsCount: number = 0;
        let savedEventsCount: number = 0;

        activities.forEach((activity) => {
            if (activity.type !== 2) {
                const day: number = date.getDay();
                const savedEvents = this.findEvents(activity.title, date);
                totalEventsCount += activity.schedule.occurrences[day] || 0;

                savedEvents.forEach((savedEvent) => {
                    if (savedEvent.value !== 0) {
                        savedEventsCount++;
                    }
                });
            }
        });

        overviewValue = (savedEventsCount / totalEventsCount) * 100;

        if (overviewValue) {
            return overviewValue;
        } else {
            return 0;
        }
    }

    createActivitiesWithEvents(selectedDate: Date) {
        const physicalActivities = new Array<CarePlanActivity>();
        const assessmentActivities = new Array<CarePlanActivity>();
        const otherActivities = new Array<CarePlanActivity>();
        const medicationActivities = new Array<CarePlanActivity>();

        return this.getActivities()
            .then((activities: Array<CarePlanActivity>) => {
                for (const activity of activities) {
                    activity.events = new Array<CarePlanEvent>();

                    if (activity.type !== 2) {
                        activity.events = this.getActivityEvents(activity, selectedDate);
                    }

                    if (activity.groupIdentifier === CarePlanActivityType.physical) {
                        physicalActivities.push(activity);
                    } else if (activity.groupIdentifier === CarePlanActivityType.assessment) {
                        assessmentActivities.push(activity);
                    } else if (activity.groupIdentifier === CarePlanActivityType.medication) {
                        medicationActivities.push(activity);
                    } else if (activity.groupIdentifier === CarePlanActivityType.other) {
                        otherActivities.push(activity);
                    }
                }

                this.mapEvents(physicalActivities, selectedDate);
                this.mapEvents(assessmentActivities, selectedDate);
                this.mapEvents(otherActivities, selectedDate);
                this.mapEvents(medicationActivities, selectedDate);

                return {
                    physicalActivities,
                    assessmentActivities,
                    otherActivities,
                    medicationActivities
                };
            });
    }

    private mapEvents(activityCollection: Array<CarePlanActivity>, selectedDate: Date) {
        activityCollection.forEach((activity) => {
            const savedEvents = this.findEvents(activity.title, selectedDate);

            if (savedEvents.length && activity.events.length) {
                for (const event of savedEvents) {
                    activity.events[event.index] = event;
                }
            }
        });
    }

    private getActivityEvents(activity: CarePlanActivity, selectedDate: Date): Array<CarePlanEvent> {
        const events = new Array<CarePlanEvent>();

        const day: number = selectedDate.getDay();
        const occurrencesForDay: number = activity.schedule.occurrences[day] || 0;

        for (let index = 0; index < occurrencesForDay; index++) {
            const event = new CarePlanEvent(activity, selectedDate, index);
            events.push(event);
        }

        return events;
    }

    private getActivities(): Promise<any> {
        if (!this._activitiesPromise) {
            this._activitiesPromise = this._activityStore.find().toPromise()
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
                        title: "Oops something went wrong.",
                        message: error.message,
                        okButtonText: "Ok"
                    });
                });
        }

        return this._activitiesPromise;
    }
}
