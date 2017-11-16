import { RegistrationForm } from "../login/registration/registration-form.model";

export class RegistrationStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, registrationForm: RegistrationForm) {
        this.results = [
            {
                textAnswer: registrationForm.email,
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
                textAnswer: registrationForm.givenName,
                questionType: "Text",
                saveable: false,
                identifier: "ORKRegistrationFormItemGivenName"
            },
            {
                textAnswer: registrationForm.familyName,
                questionType: "Text",
                saveable: false,
                identifier: "ORKRegistrationFormItemFamilyName"
            },
            {
                choiceAnswers: [
                    registrationForm.gender
                ],
                questionType: "SingleChoice",
                saveable: false,
                identifier: "ORKRegistrationFormItemGender"
            },
            {
                calendar: "Gregorian",
                questionType: "Date",
                saveable: false,
                dateAnswer: registrationForm.dateOfBirth,
                identifier: "ORKRegistrationFormItemDOB"
            }
        ];

        this.saveable = false;
        this.identifier = identifier;
    }
}
