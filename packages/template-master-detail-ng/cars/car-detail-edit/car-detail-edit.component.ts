import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";

import { CarEditService } from "../shared/car-edit.service";
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
    templateUrl: "./car-detail-edit.component.html",
    styleUrls: ["./car-detail-edit.component.css"]
})
export class CarDetailEditComponent implements OnInit {
    private _car: Car;
    private _carClassOptions: Array<string> = [];
    private _carDoorOptions: Array<number> = [];
    private _carSeatOptions: Array<string> = [];
    private _carTransmissionOptions: Array<string> = [];
    private _isCarImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _carService: CarService,
        private _carEditService: CarEditService,
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
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                const carId = params.id;

                this._car = this._carEditService.startEdit(carId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get car(): Car {
        return this._car;
    }

    get pricePerDay(): number {
        return this._car.price;
    }

    set pricePerDay(value: number) {
        // force iOS UISlider to work with discrete steps
        this._car.price = Math.round(value);
    }

    get luggageValue(): number {
        return this._car.luggage;
    }

    set luggageValue(value: number) {
        // force iOS UISlider to work with discrete steps
        this._car.luggage = Math.round(value);
    }

    get carClassOptions(): Array<string> {
        return this._carClassOptions;
    }

    get carDoorOptions(): Array<number> {
        return this._carDoorOptions;
    }

    get carSeatOptions(): Array<string> {
        return this._carSeatOptions;
    }

    get carTransmissionOptions(): Array<string> {
        return this._carTransmissionOptions;
    }

    get carImageUrl(): string {
        return this._car.imageUrl;
    }

    set carImageUrl(value: string) {
        this._car.imageUrl = value;
        this._isCarImageDirty = true;
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
        /* ***********************************************************
        * By design this app is set up to work with read-only sample data.
        * Follow the steps in the "Firebase database setup" section in app/readme.md file
        * and uncomment the code block below to make it editable.
        *************************************************************/

        /* ***********************************************************
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isCarImageDirty && this._car.imageUrl) {
            queue = queue
                .then(() => this._carService.uploadImage(this._car.imageStoragePath, this._car.imageUrl))
                .then((uploadedFile: any) => {
                    this._car.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._carService.update(this._car))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/cars"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *************************************************************/

        /* ***********************************************************
        * Comment out the code block below if you made the app editable.
        *************************************************************/
        const readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
        const queue = Promise.resolve();
        queue.then(() => alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }))
            .then(() => this._routerExtensions.navigate(["/cars"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            }));
    }

    private initializeEditOptions(): void {
        for (const classItem of carClassList) {
            this._carClassOptions.push(classItem);
        }

        for (const doorItem of carDoorList) {
            this._carDoorOptions.push(doorItem);
        }

        for (const seatItem of carSeatList) {
            this._carSeatOptions.push(seatItem);
        }

        for (const transmissionItem of carTransmissionList) {
            this._carTransmissionOptions.push(transmissionItem);
        }
    }
}
