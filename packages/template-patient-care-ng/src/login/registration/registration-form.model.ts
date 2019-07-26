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

    toPlainObject() {
        return {
            email: this.email,
            password: this.password,
            givenName: this.givenName,
            familyName: this.familyName,
            gender: this.gender,
            dateOfBirth: this.dateOfBirth
        };
    }
}
