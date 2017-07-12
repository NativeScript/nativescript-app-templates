import { Observable } from "data/observable";

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
}
