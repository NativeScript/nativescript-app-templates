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
    tintColor: any;
    instructions: string;
    schedule: any;
    resultResettable: boolean;
    type: number;
    optional: boolean;

    hexColor: string;
    events: Array<CarePlanEvent>;

    constructor(options: any) {
        this.groupIdentifier = this.getGroupIdentifierType(options.groupIdentifier);
        this.title = options.title;
        this.text = options.text;
        this.tintColor = options.tintColor;
        this.instructions = options.instructions;
        this.schedule = options.schedule;
        this.resultResettable = options.resultResettable;
        this.type = options.type;
        this.optional = options.optional;

        this.events = new Array<CarePlanEvent>();
        this.hexColor = options.tintColor ? this.getHexColor(options.tintColor) : "";
    }

    getJson() {
        return {
            groupIdentifier: this.groupIdentifier.toString(),
            title: this.title,
            text: this.text,
            tintColor: this.tintColor,
            instructions: this.instructions,
            schedule: this.schedule,
            resultResettable: this.resultResettable,
            type: this.type,
            optional: this.optional
        };
    }

    getNumberOfDaysSinceStart(): number {
        if (this.schedule && this.schedule.startDate) {
            let startDate = this.schedule.startDate;
            const oneDay = 24 * 60 * 60 * 1000;
            startDate = new Date(startDate.year, startDate.month - 1, startDate.day);

            return Math.round(Math.abs((startDate.getTime() - new Date().getTime()) / (oneDay)));
        }

        return 0;
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
