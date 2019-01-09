import { Kinvey } from "kinvey-nativescript-sdk";

import { RegistrationForm } from "../registration/registration-form.model";

export class UserService {
    static login(username: string, password: string): Promise<any> {
        return Kinvey.User.login(username.toLowerCase(), password);
    }

    static signup(registrationForm: RegistrationForm): Promise<any> {
        return Kinvey.User.signup({
            username: registrationForm.email.toLowerCase(),
            password: registrationForm.password,
            givenName: registrationForm.givenName,
            familyName: registrationForm.familyName,
            email: registrationForm.email,
            gender: registrationForm.gender,
            dateOfBirth: registrationForm.dateOfBirth
        });
    }
}
