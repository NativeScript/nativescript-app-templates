import { Injectable } from "@angular/core";

import { Kinvey } from "kinvey-nativescript-sdk";

@Injectable()
export class LoginService {
    static login(username: string, password: string): Promise<any> {
        return Kinvey.User.login(username, password);
    }
}
