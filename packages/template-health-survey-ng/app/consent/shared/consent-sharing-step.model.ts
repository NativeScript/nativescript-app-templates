export class ConsentSharingStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, answer: boolean) {
        this.results = [{
            choiceAnswers: [
                answer
            ],
            questionType: "SingleChoice",
            saveable: false,
            identifier: "consentSharingStep"
        }];

        this.saveable = false;
        this.identifier = identifier;
    }
}
