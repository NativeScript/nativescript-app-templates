import { Observable } from "tns-core-modules/data/observable";

import { carClassList, carDoorList, carSeatList, carTransmissionList } from "./constants";

export class ListSelectorViewModel extends Observable {
    private _items: Array<any>;
    private _tag: string;
    private _selectedIndex: number;

    // tslint:disable-next-line:ban-types
    constructor(context: any, private _closeCallback: Function) {
        super();

        this._tag = context.tag;

        const protoItems = this.resolveProtoItems();
        this._selectedIndex = protoItems.indexOf(context.selectedValue);
        this._items = [];
        for (let i = 0; i < protoItems.length; i++) {
            this._items.push({
                value: protoItems[i],
                isSelected: i === this._selectedIndex ? true : false
            });
        }
    }

    selectItem(newSelectedIndex: number): void {
        const oldSelectedItem = this._items[this._selectedIndex];
        oldSelectedItem.isSelected = false;

        const newSelectedItem = this._items[newSelectedIndex];
        newSelectedItem.isSelected = true;
        this._selectedIndex = newSelectedIndex;

        this._closeCallback(newSelectedItem.value);
    }

    cancelSelection(): void {
        this._closeCallback(null);
    }

    get items(): Array<any> {
        return this._items;
    }

    get title(): string {
        return `Select Car ${this.capitalizeFirstLetter(this._tag)}`;
    }

    private resolveProtoItems(): Array<any> {
        switch (this._tag) {
            case "class":
                return carClassList;
            case "doors":
                return carDoorList;
            case "seats":
                return carSeatList;
            case "transmission":
                return carTransmissionList;
        }
    }

    private capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
