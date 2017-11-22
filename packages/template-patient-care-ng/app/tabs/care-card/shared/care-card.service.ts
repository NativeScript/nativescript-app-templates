import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Observable } from "rxjs/Rx";

// tslint:disable-next-line:max-line-length
import { CarePlanActivity, CarePlanActivityType, CarePlanIdentifierType } from "./care-plan-activity.model";
import { CarePlanEvent, CarePlanEventsHolder } from "./care-plan-event.model";

@Injectable()
export class CareCardService {
    private _events: Array<CarePlanEventsHolder>;
    private activityStore = Kinvey.DataStore.collection<any>("Activity");

    constructor() {
        this._events = new Array<CarePlanEventsHolder>();
    }

    get events(): Array<CarePlanEventsHolder> {
        return this._events;
    }

    findEventHolder(eventHolder: CarePlanEventsHolder): CarePlanEventsHolder {
        const event = this._events.find((currentEvent) => {
            return currentEvent.date === eventHolder.date &&
                currentEvent.activity.identifier === eventHolder.activity.identifier;
        });

        return event;
    }

    getAllActivities(): Promise<any> {
        return this.activityStore.find().toPromise()
            .then((data) => {
                const activities = [];

                data.forEach((activityData: any) => {
                    const activity = new CarePlanActivity(activityData);
                    activities.push(activity);
                });

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
