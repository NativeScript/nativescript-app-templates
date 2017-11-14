import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";

import { ConnectItem } from "./connect-item.model";

@Component({
    selector: "Connect",
    moduleId: module.id,
    templateUrl: "./connect.component.html",
    styleUrls: ["./connect-common.css"]
})
export class ConnectComponent implements OnInit {
    private _inboxItems: Array<ConnectItem>;
    private _careTeamItems: Array<ConnectItem>;

    constructor(private routerExtensions: RouterExtensions) {
    }

    get inboxItems(): Array<ConnectItem> {
        return this._inboxItems;
    }

    get careTeamItems(): Array<ConnectItem> {
        return this._careTeamItems;
    }

    ngOnInit(): void {
        const items = [
            new ConnectItem("Dr. Maria Ruiz", "MR", "Physician"),
            new ConnectItem("Bill James, RN", "BJ", "Nurse"),
            new ConnectItem("Dr. Maria Ruiz", "MR", "Physician"),
            new ConnectItem("Bill James, RN", "BJ", "Nurse"),
            new ConnectItem("Dr. Maria Ruiz", "MR", "Physician"),
            new ConnectItem("Bill James, RN", "BJ", "Nurse"),
            new ConnectItem("Dr. Maria Ruiz", "MR", "Physician"),
            new ConnectItem("Bill James, RN", "BJ", "Nurse")
        ];

        this._inboxItems = items;
        this._careTeamItems = items;
    }
}
