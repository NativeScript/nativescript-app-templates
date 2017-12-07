import { StudyStep } from "./study-step.model";

export class StudyBooleanStep extends StudyStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, booleanAnswer: boolean) {
        super(identifier);

        this.results = [
            {
                questionType: "Boolean",
                saveable: false,
                booleanAnswer,
                identifier
            }
        ];
    }
}
