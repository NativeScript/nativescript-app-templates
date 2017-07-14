import { Observable } from "data/observable";
import { isAndroid } from "platform";

export class TabsViewModel extends Observable {

    private _title: string;

    constructor() {
        super();
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
            this.notifyPropertyChange("title", value);
        }
    }

    get iconPath(): string {
        return isAndroid ? "res://" : "res://tabIcons/";
    }
}
