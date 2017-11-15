export enum CarePlanIdentifierType {
    outdoorWalk,
    hamstringStretch,
    takeMedication,
    backPain,
    mood,
    bloodGlucose,
    weight,
    caffeine
}

export enum CarePlanActivityType {
    physical = "Physical",
    assesment = "Assessment"
}

export class CarePlanActivity {
    identifier: CarePlanIdentifierType;
    groupIdentifier: CarePlanActivityType;
    title: string;
    text: string;
    tintColor: string;
    instructions: string;
    imageUrl: string;
    schedule: Array<number>;
    resultResettable: boolean;

    constructor(identifier, groupIdentifier, title, text, tintColor, schedule, instructions?, imageUrl?) {
        this.identifier = identifier;
        this.groupIdentifier = groupIdentifier;
        this.title = title;
        this.text = text;
        this.tintColor = tintColor;
        this.schedule = schedule;
        this.instructions = instructions;
        this.imageUrl = imageUrl;

        this.resultResettable = true;
    }
}
