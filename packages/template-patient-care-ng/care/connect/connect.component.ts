import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { ConnectService } from "./shared/connect.service";
import { Contact } from "./shared/contact.model";
import { Patient } from "./shared/patient.model";

@Component({
    selector: "Connect",
    moduleId: module.id,
    templateUrl: "./connect.component.html",
    styleUrls: ["./connect.component.css", "../care-common.css"]
})
export class ConnectComponent implements OnInit {
    isLoading: boolean;

    private _patient: Patient;
    private _inboxItems: Array<Contact>;
    private _careTeamItems: Array<Contact>;
    private _friendsFamilyItems: Array<Contact>;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _connectService: ConnectService) {
    }

    get patient(): Patient {
        return this._patient;
    }

    get inboxItems(): Array<Contact> {
        return this._inboxItems;
    }

    get careTeamItems(): Array<Contact> {
        return this._patient.getContactsByType(0);
    }

    get friendsFamilyItems(): Array<Contact> {
        return this._patient.getContactsByType(1);
    }

    ngOnInit(): void {
        this.isLoading = true;

        this._connectService.getPatient()
            .then((patient: Patient) => {
                this.isLoading = false;
                this._patient = patient;
            });
    }

    onContactTap(contact: Contact): void {
        this._routerExtensions.navigate(["care/connect-detail", contact.name],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
