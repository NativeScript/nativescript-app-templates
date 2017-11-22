import { CarePlanActivity, CarePlanActivityType } from "./care-plan-activity.model";

export class CarePlanEvent {
    date: Date;
    activity: CarePlanActivity;
    isExecuted: boolean;

    constructor(date, activity) {
        this.date = date;
        this.activity = activity;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CarePlanEventsHolder {
    events: Array<CarePlanEvent>;
    activity: CarePlanActivity;
    date: number;

    constructor(activity: CarePlanActivity, date: number) {
        this.events = new Array<CarePlanEvent>();

        this.activity = activity;
        this.date = date;
    }
}
