export class StudyStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, answer: boolean) {
        this.results = [
            {
                questionType: "Boolean",
                saveable: false,
                booleanAnswer: answer,
                identifier: "booleanQuestionStep"
            }
        ];

        this.saveable = false;
        this.identifier = identifier;
    }
}
