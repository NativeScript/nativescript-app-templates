import { CarePlanEvent } from "./care-plan-event.model";

export enum CarePlanActivityType {
    physical = "Physical Activity",
    assessment = "Assessment",
    medication = "Medications",
    other = "Other"
}

export class CarePlanActivity {
    groupIdentifier: CarePlanActivityType;
    title: string;
    text: string;
    tintColor: string;
    instructions: string;
    schedule: Array<number>;
    resultResettable: boolean;
    type: number;
    events: Array<CarePlanEvent>;

    constructor(options: any) {
        this.events = new Array<CarePlanEvent>();

        this.groupIdentifier = this.getGroupIdentifierType(options.groupIdentifier);
        this.title = options.title;
        this.text = options.text;
        this.tintColor = options.tintColor ? this.getHexColor(options.tintColor) : "";
        this.schedule = options.schedule.occurrences;
        this.instructions = options.instructions;
        this.resultResettable = options.resultResettable;
        this.type = options.type;
    }

    private getGroupIdentifierType(groupIdentifier: string): CarePlanActivityType {
        if (groupIdentifier === CarePlanActivityType.physical.toString()) {
            return CarePlanActivityType.physical;
        } else if (groupIdentifier === CarePlanActivityType.assessment.toString()) {
            return CarePlanActivityType.assessment;
        } else if (groupIdentifier === CarePlanActivityType.medication.toString()) {
            return CarePlanActivityType.medication;
        } else {
            return CarePlanActivityType.other;
        }
    }

    private getHexColor(tintColor: any): string {
        const r = Math.round(tintColor.r * 255).toString().slice(0, 2);
        const g = Math.round(tintColor.g * 255).toString().slice(0, 2);
        const b = Math.round(tintColor.b * 255).toString().slice(0, 2);

        let hexColor = `#${r + g + b}`;
        let a = tintColor.a;

        if (a < 1) {
            a = Math.round(a * 255).toString().slice(0, 2);
            hexColor += a;
        }

        return hexColor;
    }
}
