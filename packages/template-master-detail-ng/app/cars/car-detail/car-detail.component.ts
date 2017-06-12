import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";

import { CarEditService } from "../shared/car-edit.service";
import { Car } from "../shared/car.model";
import { CarService } from "../shared/car.service";

@Component({
    selector: "CarDetail",
    moduleId: module.id,
    templateUrl: "./car-detail.component.html"
})
export class CarDetailComponent implements OnInit {
    private _car: Car;

    constructor(
        private _carService: CarService,
        private _carEditService: CarEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        let carId = "";

        // use switchMap to get the latest activatedRoute instance
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                carId = params.id;
            });

        this._car = this._carService.getCarById(carId);
    }

    get car(): Car {
        return this._car;
    }

    onBackButtonTap(): void {
        this._routerExtensions.navigate(["/cars"], { clearHistory: true });
    }

    onEditButtonTap(): void {
        this._carEditService.startEdit(this._car.id);
        this._routerExtensions.navigate(["/cars/detail-edit"]);
    }
}
