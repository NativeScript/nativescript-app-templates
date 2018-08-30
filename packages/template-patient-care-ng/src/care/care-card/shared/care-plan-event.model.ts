import { CarePlanActivity } from "./care-plan-activity.model";

export class CarePlanEvent {
    occurrenceIndexOfDay: number;
    date: Date;
    activity: CarePlanActivity;
    value: number;

    constructor(activity: CarePlanActivity, date: Date, occurrenceIndexOfDay: number, value: number = 0) {
        this.activity = activity;
        this.date = date;
        this.occurrenceIndexOfDay = occurrenceIndexOfDay;
        this.value = value;
    }
}
