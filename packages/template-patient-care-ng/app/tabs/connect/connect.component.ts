import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { ConnectItem } from "./shared/connect-item.model";
import { ConnectService } from "./shared/connect.service";

@Component({
    selector: "Connect",
    moduleId: module.id,
    templateUrl: "./connect.component.html",
    styleUrls: ["./connect.component.css"]
})
export class ConnectComponent implements OnInit {
    private _inboxItems: Array<ConnectItem>;
    private _careTeamItems: Array<ConnectItem>;
    private _friendsFamilyItems: Array<ConnectItem>;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _connectService: ConnectService) {
    }

    get inboxItems(): Array<ConnectItem> {
        return this._inboxItems;
    }

    get careTeamItems(): Array<ConnectItem> {
        return this._careTeamItems;
    }

    get friendsFamilyItems(): Array<ConnectItem> {
        return this._friendsFamilyItems;
    }

    ngOnInit(): void {
        this._connectService.loadConnectItems()
            .then((connectItems: Array<ConnectItem>) => {
                this._inboxItems = connectItems.filter((item) => item.title === "Physician");
                this._careTeamItems = connectItems.filter(
                    (item) => item.title === "Physician" || item.title === "Nurse");
                this._friendsFamilyItems = connectItems.filter(
                    (item) => item.title !== "Physician" && item.title !== "Nurse");
            });
    }

    onItemTap(connectItem: ConnectItem): void {
        this._routerExtensions.navigate(["tabs/connect-detail", connectItem.id],
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
