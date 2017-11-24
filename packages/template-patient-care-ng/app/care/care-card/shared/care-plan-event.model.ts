import { CarePlanActivity, CarePlanActivityType } from "./care-plan-activity.model";

export class CarePlanEvent {
    date: Date;
    activity: CarePlanActivity;
    value: number;

    constructor(activity: CarePlanActivity, date: Date) {
        this.value = 0;

        this.date = date;
        this.activity = activity;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CarePlanEventsHolder {
    events: Array<CarePlanEvent>;
    activity: CarePlanActivity;
    date: Date;

    constructor(activity: CarePlanActivity, date: Date) {
        this.events = new Array<CarePlanEvent>();

        this.activity = activity;
        this.date = date;
    }
}
