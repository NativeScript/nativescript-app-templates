import { Component } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";

import { CarEditService } from "../../shared/car-edit.service";

@Component({
    selector: "ListSelectorPicker",
    moduleId: module.id,
    templateUrl: "./list-selector-picker.component.html"
})
export class ListSelectorPickerComponent {
    private _items: Array<any>;
    private _selectedIndex: number;
    private _tag: string;

    constructor(
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private _carEditService: CarEditService
    ) {
        let self = this;

        // use switchMap to get the latest activatedRoute instance
        this._pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .forEach((params) => {
                self._selectedIndex = Number(params["selectedIndex"]);
                self._tag = params["tag"];
                try {
                    self._items = [];
                    let result = JSON.parse(params["items"]);
                    for (let i = 0; i < result.length; i++) {
                        self._items.push({ value: result[i], isSelected: i === self._selectedIndex ? true : false });
                    }
                } catch (err) {
                    console.log(err)
                }
            });
    }

    onItemSelected(args): void {
        let oldSelectedItem = this._items[this._selectedIndex];
        oldSelectedItem.isSelected = false;

        let newSelectedItem = this._items[args.itemIndex];
        newSelectedItem.isSelected = true;
        this._selectedIndex = args.itemIndex;

        this._carEditService.editObject[this._tag] = newSelectedItem.value;

        this._routerExtensions.navigate(["/car-detail-edit"], { clearHistory: true });
    }

    get items(): Array<any> {
        return this._items;
    }
}