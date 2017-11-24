export class RegistrationStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, registrationData: any) {
        this.results = [
            {
                textAnswer: registrationData.email,
                questionType: "Text",
                saveable: false,
                identifier: "ORKRegistrationFormItemEmail"
            },
            {
                questionType: "Text",
                saveable: false,
                identifier: "ORKRegistrationFormItemPassword"
            },
            {
                questionType: "Text",
                saveable: false,
                identifier: "ORKRegistrationFormItemConfirmPassword"
            },
            {
                textAnswer: registrationData.givenName,
                questionType: "Text",
                saveable: false,
                identifier: "ORKRegistrationFormItemGivenName"
            },
            {
                textAnswer: registrationData.familyName,
                questionType: "Text",
                saveable: false,
                identifier: "ORKRegistrationFormItemFamilyName"
            },
            {
                choiceAnswers: [
                    registrationData.gender
                ],
                questionType: "SingleChoice",
                saveable: false,
                identifier: "ORKRegistrationFormItemGender"
            },
            {
                calendar: "Gregorian",
                questionType: "Date",
                saveable: false,
                dateAnswer: registrationData.dateOfBirth,
                identifier: "ORKRegistrationFormItemDOB"
            }
        ];

        this.saveable = false;
        this.identifier = identifier;
    }
}
