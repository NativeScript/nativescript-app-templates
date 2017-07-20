import { Observable } from "data/observable";

export class Car extends Observable {
    id: string;
    imageStoragePath: string;
    name: string;
    seats: string;
    luggage: number;
    class: string;
    doors: number;
    price: number;
    transmission: string;
    imageUrl: string;

    constructor(options: any) {
        super();

        this.id = options.id;
        this.name = options.name;
        this.seats = options.seats;
        this.luggage = Number(options.luggage);
        this.class = options.class;
        this.doors = Number(options.doors);
        this.price = Number(options.price);
        this.transmission = options.transmission;
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
}
