import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";

import { CareCardActivityService } from "./care-card-activity.service";
import { CareCardEventService } from "./care-card-event.service";
import { CarePlanActivity, CarePlanActivityType } from "./care-plan-activity.model";
import { CarePlanEvent } from "./care-plan-event.model";

@Injectable()
export class CareCardService {
    selectedDate$: Observable<Date>;

    private _selectedDateItemSource: BehaviorSubject<Date>;

    constructor(
        private _careCardEventService: CareCardEventService,
        private _careCardActivityService: CareCardActivityService
    ) {
        // Observable selectedDate source
        this._selectedDateItemSource = new BehaviorSubject<Date>(new Date());

        // Observable selectedDate stream
        this.selectedDate$ = this._selectedDateItemSource.asObservable();
    }

    updateSelectedDate(date: Date) {
        this._selectedDateItemSource.next(date);
    }

    getOverviewValue(date: Date): Promise<number> {
        return this._careCardActivityService.getActivities().
            then((activities: Array<CarePlanActivity>) => {
                let overviewValue: number = 0;
                let totalEventsCount: number = 0;
                let savedEventsCount: number = 0;

                activities.forEach((activity) => {
                    if (activity.type !== 2) {
                        const day: number = date.getDay();
                        const savedEvents = this._careCardEventService.findEvents(activity.title, date);
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
            });
    }
}
