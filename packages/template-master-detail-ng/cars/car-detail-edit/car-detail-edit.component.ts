import { AfterViewInit, Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";
import { isAndroid } from "tns-core-modules/platform";
import { alert } from "ui/dialogs";

import { Car } from "../shared/car.model";
import { CarService } from "../shared/car.service";
import { carClassList, carDoorList, carSeatList, carTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "CarDetailEdit",
    templateUrl: "./car-detail-edit.component.html"
})
export class CarDetailEditComponent implements OnInit, AfterViewInit {
    private _car: Car;
    private _carClasses: Array<string> = [];
    private _carDoors: Array<number> = [];
    private _carSeats: Array<string> = [];
    private _carTransmissions: Array<string> = [];
    private _carLuggageMinValue: number;
    private _carLuggageMaxValue: number;
    private _carImageUriToUpload: string = null;
    private _isCarImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _carService: CarService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this.initializeEditOptions();

        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        let carId = "";
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                carId = params.id;
            });

        this._car = this._carService.getCarById(carId);
    }

    ngAfterViewInit(): void {
        this._carLuggageMinValue = 0;
        this._carLuggageMaxValue = 5;
    }

    get isAndroid(): boolean {
        return isAndroid;
    }

    get isUpdating(): boolean {
        return this._isUpdating;
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

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as cars/shared/car.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isCarImageDirty && this._carImageUriToUpload) {
            queue = queue
                .then(() => this._carService.uploadImage(this._car.imageStoragePath, this._carImageUriToUpload))
                .then((uploadedFile: any) => {
                    this._car.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._carService.update(this._car))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/cars"], { clearHistory: true });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
    }

    onImageAddRemove(args): void {
        if (args.newValue) {
            this._isCarImageDirty = true;
            this._carImageUriToUpload = args.newValue;
        }
    }

    private initializeEditOptions(): void {
        for (const classItem of carClassList) {
            this._carClasses.push(classItem);
        }

        for (const doorItem of carDoorList) {
            this._carDoors.push(doorItem);
        }

        for (const seatItem of carSeatList) {
            this._carSeats.push(seatItem);
        }

        for (const transmissionItem of carTransmissionList) {
            this._carTransmissions.push(transmissionItem);
        }
    }
}
