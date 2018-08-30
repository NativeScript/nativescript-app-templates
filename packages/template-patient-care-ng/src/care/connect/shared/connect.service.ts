import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Observable } from "rxjs";

import { Contact } from "./contact.model";

@Injectable()
export class ConnectService {
    private _contacts: Array<Contact>;

    private _contactStore = Kinvey.DataStore.collection<any>("Contact");
    private _contactsPromise: Promise<any>;

    getContactById(id: string): Contact {
        return this._contacts.find((contact) => {
            return contact.id === id;
        });
    }

    getContacts(): Promise<any> {
        if (!this._contactsPromise) {
            this._contactsPromise = this._contactStore.find().toPromise()
                .then((data) => {
                    const contacts = [];

                    if (data && data.length) {
                        data.forEach((contactData: any) => {
                            const contact = new Contact(contactData);
                            contacts.push(contact);
                        });
                    }

                    this._contacts = contacts;

                    return contacts;
                })
                .catch((error: Kinvey.BaseError) => {
                    alert({
                        title: "Oops something went wrong.",
                        message: error.message,
                        okButtonText: "Ok"
                    });
                });
        }

        return this._contactsPromise;
    }
}
