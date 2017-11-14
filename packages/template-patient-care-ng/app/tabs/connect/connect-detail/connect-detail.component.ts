import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import * as email from "nativescript-email";
import "rxjs/add/operator/switchMap";

import { ConnectItem } from "../shared/connect-item.model";
import { ConnectService } from "../shared/connect.service";

const phoneModule = require("nativescript-phone");

@Component({
    selector: "ConnectDetail",
    moduleId: module.id,
    templateUrl: "./connect-detail.component.html",
    styleUrls: ["../connect-common.css", "connect-detail-common.css"]
})
export class ConnectDetailComponent implements OnInit {
    private _connectItem: ConnectItem;

    constructor(
        private _connectService: ConnectService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                const connectItemId = params.id;

                this._connectItem = this._connectService.getItemById(connectItemId);
            });
    }

    get connectItem(): ConnectItem {
        return this._connectItem;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onCallButtonTap(phone: string) {
        phone = phone.replace(/\s/g, "");
        phoneModule.dial(phone, true);
    }

    onSendMessageButtonTap(phone: string) {
        phone = phone.replace(/\s/g, "");
        phoneModule.sms([phone], "");
    }

    onSendEmailButtonTap(emailAddress: string) {
        const composeOptions: email.ComposeOptions = {
            to: [emailAddress]
        };

        email.available().then((available: boolean) => {
            if (available) {
                email.compose(composeOptions);
            }
        });
    }
}
