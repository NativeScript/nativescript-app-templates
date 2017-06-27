import { Observable } from "data/observable";

export class Car extends Observable {
    id: string;
    name: string;
    hasAC: boolean;
    description: string;
    luggage: number;
    price: number;
    imageStoragePath: string;

    private _imageUrl: string;
    private _class: string;
    private _doors: number;
    private _seats: string;
    private _transmission: string;

    constructor(options: any) {
        super();

        this.id = options.id;
        this.name = options.name;
        this.hasAC = options.ac;
        this.description = options.description;
        this._seats = options.seats;
        this.luggage = Number(options.luggage);
        this._class = options.class;
        this._doors = Number(options.doors);
        this.price = Number(options.price);
        this._transmission = options.transmission;
        this._imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        if (this._imageUrl !== value) {
            this._imageUrl = value;
            this.notifyPropertyChange("imageUrl", value);
        }
    }

    get class(): string {
        return this._class;
    }

    set class(value: string) {
        if (this._class !== value) {
            this._class = value;
            this.notifyPropertyChange("class", value);
        }
    }

    get doors(): number {
        return this._doors;
    }

    set doors(value: number) {
        if (this._doors !== value) {
            this._doors = value;
            this.notifyPropertyChange("doors", value);
        }
    }

    get seats(): string {
        return this._seats;
    }

    set seats(value: string) {
        if (this._seats !== value) {
            this._seats = value;
            this.notifyPropertyChange("seats", value);
        }
    }

    get transmission(): string {
        return this._transmission;
    }

    set transmission(value: string) {
        if (this._transmission !== value) {
            this._transmission = value;
            this.notifyPropertyChange("transmission", value);
        }
    }
}
