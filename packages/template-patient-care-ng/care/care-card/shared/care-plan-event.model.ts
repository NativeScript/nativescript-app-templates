import { CarePlanActivity, CarePlanActivityType } from "./care-plan-activity.model";

export class CarePlanEvent {
    index: number;
    date: Date;
    activity: CarePlanActivity;
    value: number;

    constructor(activity: CarePlanActivity, date: Date, index: number) {
        this.value = 0;

        this.date = date;
        this.activity = activity;
        this.index = index;
    }
}
