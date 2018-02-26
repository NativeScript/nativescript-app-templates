import { Observable } from "data/observable";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Kinvey } from 'kinvey-nativescript-sdk';


export class HomeViewModel extends Observable {
    @ObservableProperty() buttonText: string = 'Login';

    constructor() {
        super();
    }

    public submit() {
        if (Kinvey.User.getActiveUser() == null) {
            Kinvey.User.loginWithMIC('http://example.com', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, { version: 'v2' })

                .then((user: Kinvey.User) => {
                    alert("Logged in!");
                    console.log("user: " + JSON.stringify(user));
                    this.updateButtonText();
                })
                .catch((error: Kinvey.BaseError) => {
                    alert("Error!");
                    console.log("error: " + error);
                });
        }
        else {
            Kinvey.User.logout()
                .then(() => {
                    alert("Logged out!");
                    this.updateButtonText();
                });
        }
    }

    private updateButtonText(): void {
        this.buttonText = Kinvey.User.getActiveUser() == null ? `Login` : `Logout`;
    }
}
