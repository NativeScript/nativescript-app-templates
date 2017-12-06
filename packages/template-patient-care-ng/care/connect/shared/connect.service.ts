import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { Observable } from "rxjs/Rx";

import { Contact } from "./contact.model";
import { Patient } from "./patient.model";

@Injectable()
export class ConnectService {
    private _patientStore = Kinvey.DataStore.collection<any>("Patient");
    private _contactStore = Kinvey.DataStore.collection<any>("Contact");

    private _patient: Patient;
    private _patientPromise: Promise<any>;

    getContactById(id: string): Promise<any> {
        return this._contactStore.findById(id).toPromise()
            .then((contactData) => {
                const contact = new Contact(contactData);

                return contact;
            })
            .catch((error: Kinvey.BaseError) => {
                alert({
                    title: "Oops something went wrong.",
                    message: error.message,
                    okButtonText: "Ok"
                });
            });
    }

    getPatient(): Promise<any> {
        if (!this._patientPromise) {
            this._patientPromise = this._patientStore.find().toPromise()
                .then((data) => {
                    const activities = [];

                    if (data && data.length) {
                        const patient = new Patient(data[0]);
                        this._patient = patient;

                        return patient;
                    }
                })
                .catch((error: Kinvey.BaseError) => {
                    alert({
                        title: "Oops something went wrong.",
                        message: error.message,
                        okButtonText: "Ok"
                    });
                });
        }

        return this._patientPromise;
    }
}
