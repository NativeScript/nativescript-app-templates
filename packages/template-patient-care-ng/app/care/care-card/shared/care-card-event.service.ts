import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";

import { CarePlanEvent } from "./care-plan-event.model";

@Injectable()
export class CareCardEventService {
    saveEvent(event: CarePlanEvent): Promise<any> {
        const eventsDataStore = Kinvey.DataStore.collection("Event");

        return eventsDataStore.save({
            activity: event.activity.getJson(),
            date: event.date,
            numberOfDaysSinceStart: event.activity.getNumberOfDaysSinceStart(),
            occurrenceIndexOfDay: event.index
        });
    }
}
