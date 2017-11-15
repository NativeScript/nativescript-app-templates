import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { CarePlanActivity, CarePlanActivityType, CarePlanIdentifierType } from "./care-plan-activity.model";

@Injectable()
export class CareCardService {
    private physicalActivities: Array<CarePlanActivity>;
    private assessmentActivities: Array<CarePlanActivity>;

    loadPhysicalActivities(): Observable<any> {
        return new Observable((observer: any) => {
            this.physicalActivities = [

                new CarePlanActivity(CarePlanIdentifierType.hamstringStretch,
                    CarePlanActivityType.physical,
                    "Hamstring Stretch",
                    "Hamstring Stretch",
                    "blue",
                    [1, 2, 1, 2, 2, 1, 1]
                ),

                new CarePlanActivity(CarePlanIdentifierType.outdoorWalk,
                    CarePlanActivityType.physical,
                    "Outdoor Walk",
                    "Outdoor Walk",
                    "purple",
                    [1, 2, 1, 1, 2, 1, 1]
                )];

            observer.next(this.physicalActivities);
        });
    }

    loadAssessmentActivities(): Observable<any> {
        return new Observable((observer: any) => {
            this.assessmentActivities = [
                new CarePlanActivity(CarePlanIdentifierType.backPain,
                    CarePlanActivityType.assesment,
                    "Pain",
                    "Pain",
                    "blue",
                    [1, 2, 1, 2, 2, 1, 1]
                )
            ];

            observer.next(this.assessmentActivities);
        });
    }
}
