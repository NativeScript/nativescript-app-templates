export class ConsentReviewStep {
    results: Array<any>;
    saveable: boolean;
    identifier: string;

    constructor(identifier: string, givenName: string, familyName: string) {
        this.results = [{
            identifier: "consentDocumentParticipantSignature",
            consented: true,
            saveable: false,
            signature: {
                signatureImage: "",
                requiresName: true,
                givenName,
                requiresSignatureImage: false,
                title: "Participant",
                familyName,
                signatureDate: new Date().toUTCString(),
                identifier: "consentDocumentParticipantSignature"
            }
        }];

        this.saveable = false;
        this.identifier = identifier;
    }
}
