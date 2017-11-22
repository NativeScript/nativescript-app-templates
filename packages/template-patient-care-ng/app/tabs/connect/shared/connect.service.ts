import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { ConnectItem } from "./connect-item.model";

@Injectable()
export class ConnectService {
    private connectItems: Array<ConnectItem>;

    constructor() {
        this.connectItems = [
            new ConnectItem("0", "Dr. Maria Ruiz", "MR", "Physician", "888-555-5512", "mruiz2@mac.com"),
            new ConnectItem("1", "Bill James", "BJ", "Nurse", "888-555-5513", "bjames2@mac.com"),
            new ConnectItem("2", "Henry Ford", "HF", "Father", "888-555-5514", "hford2@mac.com"),
            new ConnectItem("3", "Marta Ford", "MF", "Mother", "888-555-5515", "mford2@mac.com"),
            new ConnectItem("5", "Gerald Ford", "GF", "Brother", "888-555-5516", "gford2@mac.com"),
            new ConnectItem("6", "Patricia Ford", "PF", "Spouse", "888-555-5517", "pford2@mac.com"),
            new ConnectItem("7", "James Kerr", "JK", "Friend", "888-555-5518", "jkerr2@mac.com"),
            new ConnectItem("8", "Jessy Parker", "JP", "Friend", "888-555-5519", "jparker2@mac.com")
        ];
    }

    getItemById(id: string): ConnectItem {
        if (!id) {
            return;
        }

        return this.connectItems.filter((item) => {
            return item.id === id;
        })[0];
    }

    loadConnectItems(): Promise<Array<ConnectItem>> {
        return Promise.resolve().then(() => Promise.resolve(this.connectItems));
    }
}
