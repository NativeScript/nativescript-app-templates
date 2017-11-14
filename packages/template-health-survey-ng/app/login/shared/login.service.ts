import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";

import { RegistrationForm } from "../registration/registration-form.model";

@Injectable()
export class LoginService {
    static login(username: string, password: string): Promise<any> {
        let loginQueue = Promise.resolve();

        if (!!Kinvey.User.getActiveUser()) {
            loginQueue = Kinvey.User.logout();
        }

        return loginQueue.then(() => Kinvey.User.login(username, password));
    }

    static signup(registrationForm: RegistrationForm): Promise<any> {
        let registerQueue = Promise.resolve();

        if (!!Kinvey.User.getActiveUser()) {
            registerQueue = Kinvey.User.logout();
        }

        return registerQueue.then(() => Kinvey.User.signup({
            username: registrationForm.email,
            password: registrationForm.password,
            givenName: registrationForm.givenName,
            familyName: registrationForm.familyName,
            email: registrationForm.email,
            gender: registrationForm.gender,
            dateOfBirth: registrationForm.dateOfBirth
        }));
    }
}
