import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";

import { ConnectItem } from "./shared/connect-item.model";
import { ConnectService } from "./shared/connect.service";

@Component({
    selector: "Connect",
    moduleId: module.id,
    templateUrl: "./connect.component.html",
    styleUrls: ["./connect-common.css"]
})
export class ConnectComponent implements OnInit {
    private _inboxItems: Array<ConnectItem>;
    private _careTeamItems: Array<ConnectItem>;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _connectService: ConnectService
    ) {
    }

    get inboxItems(): Array<ConnectItem> {
        return this._inboxItems;
    }

    get careTeamItems(): Array<ConnectItem> {
        return this._careTeamItems;
    }

    ngOnInit(): void {
        this._connectService.loadConnectItems()
            .then((connectItems: Array<ConnectItem>) => {
                this._inboxItems = connectItems;
                this._careTeamItems = connectItems;
            });
    }

    onCareTeamItemTap(args: ListViewEventData): void {
        const tappedTeamItem = args.view.bindingContext;
        console.log(JSON.stringify(tappedTeamItem));
        this._routerExtensions.navigate(["tabs/connect-detail", tappedTeamItem.id],
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
