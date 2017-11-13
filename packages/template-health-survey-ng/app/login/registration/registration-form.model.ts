export class RegistrationForm {
    email: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;

    constructor() {
        this.email = "";
        this.password = "";
        this.passwordConfirm = "";
        this.firstName = "";
        this.lastName = "";
        this.gender = null;
        this.birthDate = null;
    }
}
