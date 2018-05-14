import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CareCardActivityService } from "./care-card-activity.service";
import { CareCardEventService } from "./care-card-event.service";
import { CarePlanActivityType } from "./care-plan-activity-type.enum";
import { CarePlanActivity } from "./care-plan-activity.model";

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

                const savedEventsPromises = [];

                activities.forEach((activity) => {
                    if (activity.type === CarePlanActivityType.ReadOnly) {
                        return;
                    }

                    const day: number = date.getDay();
                    totalEventsCount += activity.schedule.occurrences[day] || 0;

                    savedEventsPromises.push(this._careCardEventService.findEvents(activity.title, date));
                });

                return Promise.all(savedEventsPromises)
                    .then((values) => {
                        values.forEach((savedEvents) => {
                            savedEvents.forEach((savedEvent) => {
                                if (savedEvent.value !== 0) {
                                    savedEventsCount++;
                                }
                            });
                        });

                        overviewValue = (savedEventsCount / totalEventsCount) * 100;

                        if (overviewValue) {
                            return parseFloat(overviewValue.toFixed(2));
                        } else {
                            return 0;
                        }
                    });
            });
    }
}
