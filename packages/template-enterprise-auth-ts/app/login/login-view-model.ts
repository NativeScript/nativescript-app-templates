import { Observable } from "tns-core-modules/data/observable";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { topmost } from "tns-core-modules/ui/frame";

export class LoginViewModel extends Observable {
    constructor() {
        super();
    }

    login() {
        let activeUser = Kinvey.User.getActiveUser();
        if (activeUser == null) {
            Kinvey.User.loginWithMIC('http://example.com')
                .then((user: Kinvey.User) => {
                    activeUser = user;
                    this.navigateHome(activeUser);
                    console.log("user: " + JSON.stringify(user));
                })
                .catch((error: Kinvey.BaseError) => {
                    alert("An error occurred. Check your Kinvey settings.");
                    console.log("error: " + error);
                });
        } else {
            this.navigateHome(activeUser);
        }
    }

    private navigateHome(user: Kinvey.User) {
        topmost().navigate({
            moduleName: "home/home-page",
            context: user.data['_socialIdentity'].kinveyAuth.id,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 350,
                curve: "ease"
            }
        });
    }
}
