export class RegistrationForm {
    public email: string;
    public password: string;
    public passwordConfirm: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public birthDate: string;

    constructor() {
        this.email = "";
        this.password = "";
        this.passwordConfirm = "";
        this.firstName = "";
        this.lastName = "";
        this.gender = null;
        this.birthDate = null;
    }
};