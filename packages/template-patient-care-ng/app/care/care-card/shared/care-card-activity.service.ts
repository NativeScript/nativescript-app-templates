import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";

import { CareCardEventService } from "./care-card-event.service";
import { CareCardService } from "./care-card.service";
import { CarePlanActivity, CarePlanActivityType } from "./care-plan-activity.model";
import { CarePlanEvent } from "./care-plan-event.model";

@Injectable()
export class CareCardActivityService {
    private _activityStore = Kinvey.DataStore.collection<any>("Activity");

    private _activities: Array<CarePlanActivity>;
    private _activitiesPromise: Promise<any>;

    constructor(private _careCardEventService: CareCardEventService) {
        this._activities = new Array<CarePlanActivity>();
        this.getActivities().then((activities: Array<CarePlanActivity>) => {
            this._activities = activities;
        });
    }

    getActivity(title: string): CarePlanActivity {
        const activity = this._activities.find((currentActivity) => {
            return currentActivity.title === title;
        });

        return activity;
    }

    getActivities(): Promise<any> {
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
            const savedEvents = this._careCardEventService.findEvents(activity.title, selectedDate);

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
}
