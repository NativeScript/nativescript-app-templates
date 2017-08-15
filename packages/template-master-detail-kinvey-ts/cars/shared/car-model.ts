import { Observable } from "data/observable";

import { ObservableProperty } from "../../shared/observable-property-decorator";

export class Car extends Observable {
    @ObservableProperty() id: string;
    @ObservableProperty() imageStoragePath: string;
    @ObservableProperty() name: string;
    @ObservableProperty() seats: string;
    @ObservableProperty() luggage: number;
    @ObservableProperty() class: string;
    @ObservableProperty() hasAC: boolean;
    @ObservableProperty() doors: number;
    @ObservableProperty() price: number;
    @ObservableProperty() transmission: string;
    @ObservableProperty() imageUrl: string;

    constructor(options: any) {
        super();

        this.id = options.id;
        this.name = options.name;
        this.seats = options.seats;
        this.luggage = Number(options.luggage);
        this.class = options.class;
        this.hasAC = options.hasAC;
        this.doors = Number(options.doors);
        this.price = Number(options.price);
        this.transmission = options.transmission;
        this.imageUrl = encodeURI(options.imageUrl);
        this.imageStoragePath = options.imageStoragePath;
    }
}
