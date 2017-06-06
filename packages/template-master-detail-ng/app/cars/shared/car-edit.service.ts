import { Injectable } from "@angular/core";

import { CarService } from "../shared/car.service";
import { Car } from "../shared/car.model";

const editableProperties = [
    "id",
    "doors",
    "imageStoragePath",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

@Injectable()
export class CarEditService {
    private _editObject: any;

    constructor(private _carService: CarService) { }

    public startEdit(id: string) {
        let car = this._carService.getCarById(id);
        this._editObject = this.cloneEditableSubset(car);
    }

    public cancelEdit() {
        this._editObject = null;
    }

    get editObject() {
        return this._editObject;
    }

    private cloneEditableSubset(car: Car) {
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), {});
    }
}