import { Injectable } from "@angular/core";
// TODO: should be imported from kinvey-nativescript-sdk/angular but declaration file is currently missing
import { DataStoreService, Errors } from "kinvey-nativescript-sdk/lib/angular";

import { Contact } from "./contact.model";

@Injectable({
    providedIn: "root"
})
export class ConnectService {
    private _contacts: Array<Contact>;

    private _contactStore = null;
    private _contactsPromise: Promise<any>;

    constructor(dataStoreService: DataStoreService) {
        this._contactStore = dataStoreService.collection("Contact");
    }

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
                .catch((error: Errors.BaseError) => {
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
