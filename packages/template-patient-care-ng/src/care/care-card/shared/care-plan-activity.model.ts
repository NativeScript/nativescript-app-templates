import { CarePlanActivityGroup } from "./care-plan-activity-group.enum";
import { CarePlanEvent } from "./care-plan-event.model";

export class CarePlanActivity {
    groupIdentifier: CarePlanActivityGroup;
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

    private getGroupIdentifierType(groupIdentifier: string): CarePlanActivityGroup {
        if (groupIdentifier === CarePlanActivityGroup.Physical.toString()) {
            return CarePlanActivityGroup.Physical;
        } else if (groupIdentifier === CarePlanActivityGroup.Assessment.toString()) {
            return CarePlanActivityGroup.Assessment;
        } else if (groupIdentifier === CarePlanActivityGroup.Medication.toString()) {
            return CarePlanActivityGroup.Medication;
        } else {
            return CarePlanActivityGroup.Other;
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
