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
        // use switchMap to get the latest activatedRoute instance
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                this._selectedIndex = Number(params.selectedIndex);
                this._tag = params.tag;
                try {
                    this._items = [];
                    const result = JSON.parse(params.items);
                    for (let i = 0; i < result.length; i++) {
                        this._items.push({ value: result[i], isSelected: i === this._selectedIndex ? true : false });
                    }
                } catch (err) {
                    console.log(err);
                }
            });
    }

    onItemSelected(args): void {
        const oldSelectedItem = this._items[this._selectedIndex];
        oldSelectedItem.isSelected = false;

        const newSelectedItem = this._items[args.itemIndex];
        newSelectedItem.isSelected = true;
        this._selectedIndex = args.itemIndex;

        this._carEditService.editObject[this._tag] = newSelectedItem.value;

        this._routerExtensions.navigate(["/cars/detail-edit"], { clearHistory: true });
    }

    get items(): Array<any> {
        return this._items;
    }
}
