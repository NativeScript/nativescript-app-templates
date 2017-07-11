import { Kinvey } from "kinvey-nativescript-sdk";

export class Car implements Kinvey.Entity {
    _id: string;
    name: string;
    hasAC: boolean;
    description: string;
    seats: string;
    luggage: number;
    class: string;
    doors: number;
    price: number;
    transmission: string;
    imageUrl: string;
    imageStoragePath: string;

    constructor(options: any) {
        this._id = options._id;
        this.name = options.name;
        this.hasAC = options.ac;
        this.description = options.description;
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
