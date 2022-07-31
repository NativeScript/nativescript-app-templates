import { Component, OnInit } from '@angular/core'
import { PageRoute, RouterExtensions } from '@nativescript/angular'
import { switchMap } from 'rxjs/operators'

import { Car } from '../shared/car.model'
import { CarService } from '../shared/car.service'

@Component({
  selector: 'CarDetail',
  templateUrl: './car-detail.component.html',
})
export class CarDetailComponent implements OnInit {
  private _car: Car

  constructor(
    private _carService: CarService,
    private _pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
        const carId = params.id

        this._car = this._carService.getCarById(carId)
      })
  }

  get car(): Car {
    return this._car
  }

  onBackButtonTap(): void {
    this._routerExtensions.backToPreviousPage()
  }

  onEditButtonTap(): void {
    this._routerExtensions.navigate(['/cars/car-detail-edit', this._car.id], {
      animated: true,
      transition: {
        name: 'slideTop',
        duration: 200,
        curve: 'ease',
      },
    })
  }
}
