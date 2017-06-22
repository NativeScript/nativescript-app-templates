import { Component, OnInit } from "@angular/core";
import { isAndroid } from "platform";

@Component({
    selector: "TabsComponent",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements OnInit {
    constructor() {

    }

    ngOnInit(): void {

    }

    getIconSource(icon: string): string {
        return isAndroid ? "res://tab_" + icon : "res://tabIcons/tab_" + icon;
    }
}
