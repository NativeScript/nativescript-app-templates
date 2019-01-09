export abstract class StudyStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string) {
        this.saveable = false;
        this.identifier = identifier;
    }
}
