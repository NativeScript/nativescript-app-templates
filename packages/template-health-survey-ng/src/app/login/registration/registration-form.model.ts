export class RegistrationForm {
    email: string;
    password: string;
    passwordConfirm: string;
    givenName: string;
    familyName: string;
    gender: string;
    dateOfBirth: string;

    constructor() {
        this.email = "";
        this.password = "";
        this.passwordConfirm = "";
        this.givenName = "";
        this.familyName = "";
        this.gender = "male";
        this.dateOfBirth = null;
    }
}
