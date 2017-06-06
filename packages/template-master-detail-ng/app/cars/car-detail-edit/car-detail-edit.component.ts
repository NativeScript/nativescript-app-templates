import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";

import { CarService } from "../shared/car.service";
import { CarEditService } from "../shared/car-edit.service";
import { Car } from "../shared/car.model";
import { carClassList, carDoorList, carSeatList, carTransmissionList } from "./constants";

@Component({
    selector: "CarDetailEdit",
    moduleId: module.id,
    templateUrl: "./car-detail-edit.component.html",
})
export class CarDetailEditComponent implements OnInit {
    private _car: Car;
    private _carClasses: Array<string>;
    private _carDoors: Array<number>;
    private _carSeats: Array<string>;
    private _carTransmissions: Array<string>;
    private _carLuggageMinValue: number;
    private _carLuggageMaxValue: number;
    private _carImageUriToUpload: string;
    private _isCarImageDirty: boolean;
    private _isUploading: boolean;

    constructor(
        private _carService: CarService,
        private _carEditService: CarEditService,
        private _routerExtensions: RouterExtensions
    ) {
        this._carClasses = [];
        for (let i = 0; i < carClassList.length; i++) {
            this._carClasses.push(carClassList[i]);
        }

        this._carDoors = [];
        for (let i = 0; i < carDoorList.length; i++) {
            this._carDoors.push(carDoorList[i]);
        }

        this._carSeats = [];
        for (let i = 0; i < carSeatList.length; i++) {
            this._carSeats.push(carSeatList[i]);
        }

        this._carTransmissions = [];
        for (let i = 0; i < carTransmissionList.length; i++) {
            this._carTransmissions.push(carTransmissionList[i]);
        }

        this._isUploading = false;
        this._isCarImageDirty = false;
        this._carImageUriToUpload = null;
    }

    ngOnInit(): void {
        this._car = this._carEditService.editObject;
    }

    ngAfterViewInit(): void {
        this._carLuggageMinValue = 0;
        this._carLuggageMaxValue = 5;
    }

    get isUploading(): boolean {
        return this._isUploading;
    }

    get car(): Car {
        return this._car;
    }

    get carClasses(): Array<string> {
        return this._carClasses;
    }

    get carDoors(): Array<number> {
        return this._carDoors;
    }

    get carSeats(): Array<string> {
        return this._carSeats;
    }

    get carTransmissions(): Array<string> {
        return this._carTransmissions;
    }

    get carLuggageMinValue(): number {
        return this._carLuggageMinValue;
    }

    get carLuggageMaxValue(): number {
        return this._carLuggageMaxValue;
    }

    set carLuggageValue(value: number) {
        this._car.luggage = value;
    }

    onCancel(): void {
        this._routerExtensions.navigate(["/car-detail", this._car.id], { clearHistory: true });
    }

    onUpdate(): void {
        let self = this;
        let queue = Promise.resolve();

        // TODO: car image should be required field
        if (this._isCarImageDirty && this._carImageUriToUpload) {
            // no need to explicitly delete old image as upload to an existing remote path overwrites it
            this._isUploading = true;

            queue = queue
                .then(function () {
                    return self._carService.uploadImage(self._car.imageStoragePath, self._carImageUriToUpload);
                })
                .then(function (uploadedFile: any) {
                    self._isUploading = false;
                    self._car.imageUrl = uploadedFile.url;
                });
        }

        queue.then(function () {
            return self._carService.update(self._car);
        }).then(function () {
            self._routerExtensions.navigate(["/car-detail", self._car.id], { clearHistory: true });
        }).catch(function (errorMessage: any) {
            self._isUploading = false;

            console.log(errorMessage);
            alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" })
        });
    }

    onImageAddRemove(args): void {
        if (args.newValue) {
            this._isCarImageDirty = true;
            this._carImageUriToUpload = args.newValue;
        }
    }
}
