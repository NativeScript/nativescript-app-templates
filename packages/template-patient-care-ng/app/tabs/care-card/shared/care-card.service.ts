import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

// tslint:disable-next-line:max-line-length
import { CarePlanActivity, CarePlanActivityType, CarePlanIdentifierType } from "./care-plan-activity.model";
import { CarePlanEvent, CarePlanEventsHolder } from "./care-plan-event.model";

@Injectable()
export class CareCardService {
    events: Array<CarePlanEventsHolder>;

    constructor() {
        this.events = new Array<CarePlanEventsHolder>();
    }

    findEventHolder(eventHolder: CarePlanEventsHolder): CarePlanEventsHolder {
        const event = this.events.find((currentEvent) => {
            return currentEvent.date === eventHolder.date &&
                currentEvent.activity.identifier === eventHolder.activity.identifier;
        });

        return event;
    }

    getAllActivities() {
        const activities = [
            new CarePlanActivity(CarePlanIdentifierType.backPain,
                CarePlanActivityType.assesment,
                "Pain",
                "Lower Back",
                "blue",
                [1, 1, 1, 1, 1, 1, 1]
            ),

            new CarePlanActivity(CarePlanIdentifierType.mood,
                CarePlanActivityType.assesment,
                "Mood",
                "",
                "green",
                [1, 1, 1, 1, 1, 1, 1]
            ),

            new CarePlanActivity(CarePlanIdentifierType.bloodGlucose,
                CarePlanActivityType.assesment,
                "Blood Glucose",
                "After dinner",
                "purple",
                [1, 1, 1, 1, 1, 1, 1]
            ),

            new CarePlanActivity(CarePlanIdentifierType.weight,
                CarePlanActivityType.assesment,
                "Weight",
                "Early morning",
                "yellow",
                [1, 1, 1, 1, 1, 1, 1]
            ),

            new CarePlanActivity(CarePlanIdentifierType.hamstringStretch,
                CarePlanActivityType.physical,
                "Hamstring Stretch",
                "15 mins",
                "blue",
                [3, 2, 1, 2, 2, 1, 1],
                "Gentle hamstring stretches on both legs."
            ),

            new CarePlanActivity(CarePlanIdentifierType.outdoorWalk,
                CarePlanActivityType.physical,
                "Outdoor Walk",
                "5 mins",
                "purple",
                [2, 2, 1, 1, 2, 1, 1],
                "Take a leisurely walk."
            )
        ];

        return activities;
    }
}
