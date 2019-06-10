import { Observable } from "tns-core-modules/data/observable";
import { User, Errors } from "kinvey-nativescript-sdk";
import { topmost } from "tns-core-modules/ui/frame";

export class LoginViewModel extends Observable {
    constructor() {
        super();
    }

    login() {
        let activeUser = User.getActiveUser();
        if (activeUser == null) {
            User.loginWithMIC()
                .then((user: User) => {
                    activeUser = user;
                    this.navigateHome(activeUser);
                    console.log("user: " + JSON.stringify(user));
                })
                .catch((error: Errors.BaseError) => {
                    alert("An error occurred. Check your Kinvey settings.");
                    console.log("error: " + error);
                });
        } else {
            this.navigateHome(activeUser);
        }
    }

    private navigateHome(user: User) {
        topmost().navigate({
            moduleName: "home/home-page",
            context: (<any>user.data._socialIdentity).kinveyAuth.id,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 350,
                curve: "ease"
            }
        });
    }
}
