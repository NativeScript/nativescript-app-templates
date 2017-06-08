import { AfterViewInit, Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid } from "tns-core-modules/platform";
import { alert } from "ui/dialogs";

import { CarEditService } from "../shared/car-edit.service";
import { Car } from "../shared/car.model";
import { CarService } from "../shared/car.service";
import { carClassList, carDoorList, carSeatList, carTransmissionList } from "./constants";

@Component({
    moduleId: module.id,
    selector: "CarDetailEdit",
    templateUrl: "./car-detail-edit.component.html"
})
export class CarDetailEditComponent implements OnInit, AfterViewInit {
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
        for (const classItem of carClassList) {
            this._carClasses.push(classItem);
        }

        this._carDoors = [];
        for (const doorItem of carDoorList) {
            this._carDoors.push(doorItem);
        }

        this._carSeats = [];
        for (const seatItem of carSeatList) {
            this._carSeats.push(seatItem);
        }

        this._carTransmissions = [];
        for (const transmissionItem of carTransmissionList) {
            this._carTransmissions.push(transmissionItem);
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

    get isAndroid(): boolean {
        return isAndroid;
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

    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onDoneButtonTap(): void {
        let queue = Promise.resolve();

        // TODO: car image should be required field
        if (this._isCarImageDirty && this._carImageUriToUpload) {
            // no need to explicitly delete old image as upload to an existing remote path overwrites it
            this._isUploading = true;

            queue = queue
                .then(() => this._carService.uploadImage(this._car.imageStoragePath, this._carImageUriToUpload))
                .then((uploadedFile: any) => {
                    this._isUploading = false;
                    this._car.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._carService.update(this._car))
            .then(() => this._routerExtensions.navigate(["/cars"], { clearHistory: true }))
            .catch((errorMessage: any) => {
                this._isUploading = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
    }

    onImageAddRemove(args): void {
        if (args.newValue) {
            this._isCarImageDirty = true;
            this._carImageUriToUpload = args.newValue;
        }
    }
}
