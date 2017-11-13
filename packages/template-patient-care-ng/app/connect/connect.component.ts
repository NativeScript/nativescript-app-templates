import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";

@Component({
    selector: "Connect",
    moduleId: module.id,
    templateUrl: "./connect.component.html"
})
export class ConnectComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }
}
