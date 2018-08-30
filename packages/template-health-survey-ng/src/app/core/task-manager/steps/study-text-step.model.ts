import { StudyStep } from "./study-step.model";

export class StudyTextStep extends StudyStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, textAnswer: string) {
        super(identifier);

        this.results = [
            {
                questionType: "Text",
                saveable: false,
                textAnswer,
                identifier
            }
        ];
    }
}
