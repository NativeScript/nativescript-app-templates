import { Component, OnInit } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { RouterExtensions } from "nativescript-angular/router";

import { ConnectService } from "./shared/connect.service";
import { Contact } from "./shared/contact.model";

@Component({
    selector: "Connect",
    moduleId: module.id,
    templateUrl: "./connect.component.html",
    styleUrls: ["./connect.component.css", "../care-common.css"]
})
export class ConnectComponent implements OnInit {
    isLoading: boolean;

    private _name: string;
    private _monogram: string;
    private _careTeamItems: Array<Contact>;
    private _friendsFamilyItems: Array<Contact>;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _connectService: ConnectService) {
    }

    get name(): string {
        if (this._name) {
            return this._name;
        }

        const activeUser: any = Kinvey.User.getActiveUser();

        if (activeUser) {
            const givenName = activeUser.data.givenName;
            const familyName = activeUser.data.familyName;

            if (givenName && familyName) {
                this._name = `${givenName + " " + familyName}`;
            }

            return this._name;
        }
    }

    get monogram(): string {
        if (this._monogram) {
            return this._monogram;
        }

        const activeUser: any = Kinvey.User.getActiveUser();

        if (activeUser) {
            const givenName = activeUser.data.givenName;
            const familyName = activeUser.data.familyName;

            if (givenName && familyName) {
                this._monogram = givenName.charAt(0) + familyName.charAt(0);
            }

            return this._monogram;
        }
    }

    get careTeamItems(): Array<Contact> {
        return this._careTeamItems;
    }

    get friendsFamilyItems(): Array<Contact> {
        return this._friendsFamilyItems;
    }

    ngOnInit(): void {
        this.isLoading = true;

        this._connectService.getContacts()
            .then((contacts) => {
                this.isLoading = false;
                this._careTeamItems = this.getContactsByType(contacts, 0);
                this._friendsFamilyItems = this.getContactsByType(contacts, 1);
            });
    }

    onContactTap(contact: Contact): void {
        this._routerExtensions.navigate(["care/connect-detail", contact.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    private getContactsByType(contacts: Array<Contact>, type: number): Array<Contact> {
        return contacts.filter((contact) => {
            return contact.type === type;
        });
    }
}
