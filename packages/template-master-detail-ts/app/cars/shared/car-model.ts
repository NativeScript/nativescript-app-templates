import { Observable } from "@nativescript/core";

import { ObservableProperty } from "../../shared/observable-property-decorator";

export class Car extends Observable {
    @ObservableProperty() id: string;
    @ObservableProperty() imageStoragePath: string;
    @ObservableProperty() seats: string;
    @ObservableProperty() luggage: number;
    @ObservableProperty() class: string;
    @ObservableProperty() hasAC: boolean;
    @ObservableProperty() doors: number;
    @ObservableProperty() price: number;
    @ObservableProperty() transmission: string;
    @ObservableProperty() isModelValid: boolean;

    private _name: string;
    private _imageUrl: string;

    constructor(options: any) {
        super();

        this._name = options.name;
        this._imageUrl = options.imageUrl;

        this.id = options.id;
        this.seats = options.seats;
        this.luggage = Number(options.luggage);
        this.class = options.class;
        this.hasAC = options.hasAC;
        this.doors = Number(options.doors);
        this.price = Number(options.price);
        this.transmission = options.transmission;
        this.imageStoragePath = options.imageStoragePath;

        this.updateDependentProperties();
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (this._name === value) {
            return;
        }

        this._name = value;
        this.notifyPropertyChange("name", value);

        this.updateDependentProperties();
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        if (this._imageUrl === value) {
            return;
        }

        this._imageUrl = value;
        this.notifyPropertyChange("imageUrl", value);

        this.updateDependentProperties();
    }

    private updateDependentProperties(): void {
        this.isModelValid = !!this._name && !!this._imageUrl;
    }
}
