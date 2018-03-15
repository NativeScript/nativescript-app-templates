import { Observable } from "tns-core-modules/data/observable";
import { ObservableProperty } from "../shared/observable-property-decorator";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { topmost } from "tns-core-modules/ui/frame";

export class HomeViewModel extends Observable {
    @ObservableProperty() loggedUser: string;

    constructor(private user: string) {
        super();
        this.loggedUser = user;
    }

    logout() {
        Kinvey.User.logout()
            .then(() => {
                topmost().navigate({
                    moduleName: "login/login-page",
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 350,
                        curve: "ease"
                    }
                });
            });
    }
}
