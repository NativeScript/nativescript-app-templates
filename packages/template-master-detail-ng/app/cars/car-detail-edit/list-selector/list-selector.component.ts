import { Component, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { action } from "ui/dialogs";

import { CarEditService } from "../../shared/car-edit.service";

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

@Component({
    selector: "ListSelector",
    moduleId: module.id,
    templateUrl: "./list-selector.component.html"
})
export class ListSelectorComponent {
    @Input() selectedValue: string;
    @Input() items: Array<string>;
    @Input() tag: string;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _carEditService: CarEditService) { }

    onSelectorTap(): void {
        if (isAndroid) {
            let options = {
                title: capitalizeFirstLetter(this.tag),
                message: "Choose your " + this.tag,
                cancelButtonText: "Cancel",
                actions: this.items.map(item => item.toString())
            };

            action(options).then((selectedValue) => {
                this._carEditService.editObject[this.tag] = selectedValue;
            });
        } else {
            let selectedIndex = this.items.indexOf(this.selectedValue);
            let items = JSON.stringify(this.items);

            this._routerExtensions.navigate(["/list-selector-picker", this.tag, items, selectedIndex]);
        }
    }
}