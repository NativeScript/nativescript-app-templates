import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { ConnectItem } from "./connect-item.model";

@Injectable()
export class ConnectService {
    private allConnectItems: Array<ConnectItem>;

    getItemById(id: string): ConnectItem {
        if (!id) {
            return;
        }

        return this.allConnectItems.filter((item) => {
            return item.id === id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            this.allConnectItems = [
                new ConnectItem("0", "Dr. Maria Ruiz", "MR", "Physician", "888-555-5512", "mruiz2@mac.com"),
                new ConnectItem("1", "Bill James, RN", "BJ", "Nurse", "888-555-5512", "mruiz2@mac.com"),
                new ConnectItem("2", "Dr. Maria Ruiz", "MR", "Physician", "888-555-5512", "mruiz2@mac.com"),
                new ConnectItem("3", "Bill James, RN", "BJ", "Nurse", "888-555-5512", "mruiz2@mac.com"),
                new ConnectItem("5", "Dr. Maria Ruiz", "MR", "Physician", "888-555-5512", "mruiz2@mac.com"),
                new ConnectItem("6", "Bill James, RN", "BJ", "Nurse", "888-555-5512", "mruiz2@mac.com"),
                new ConnectItem("7", "Dr. Maria Ruiz", "MR", "Physician", "888-555-5512", "mruiz2@mac.com"),
                new ConnectItem("8", "Bill James, RN", "BJ", "Nurse", "888-555-5512", "mruiz2@mac.com")
            ];

            observer.next(this.allConnectItems);
        });
    }
}
