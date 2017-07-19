import { Injectable } from "@angular/core";

import { CarEditModel } from "./car-edit.model";
import { Car } from "./car.model";
import { CarService } from "./car.service";

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
    private _editModel: CarEditModel;

    constructor(private _carService: CarService) {}

    startEdit(id: string): CarEditModel {
        this._editModel = null;

        return this.getEditableCarById(id);
    }

    getEditableCarById(id: string): CarEditModel {
        if (!this._editModel || this._editModel.id !== id) {
            const car = this._carService.getCarById(id);
            this._editModel = this.cloneEditableSubset(car);
        }

        return this._editModel;
    }

    private cloneEditableSubset(car: Car): CarEditModel {
        const clone = editableProperties.reduce((a, e) => (a[e] = car[e], a), {});

        return new CarEditModel(clone);
    }
}
