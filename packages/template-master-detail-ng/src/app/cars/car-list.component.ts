import { Component, OnDestroy, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { ListViewEventData } from 'nativescript-ui-listview'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { ObservableArray } from '@nativescript/core'

import { Car } from './shared/car.model'
import { CarService } from './shared/car.service'

@Component({
  selector: 'CarsList',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {
  private _isLoading: boolean = false
  private _cars: ObservableArray<Car> = new ObservableArray<Car>([])
  private _dataSubscription: Subscription

  constructor(private _carService: CarService, private _routerExtensions: RouterExtensions) {}

  ngOnInit(): void {
    if (!this._dataSubscription) {
      this._isLoading = true

      this._dataSubscription = this._carService
        .load()
        .pipe(finalize(() => (this._isLoading = false)))
        .subscribe((cars: Array<Car>) => {
          this._cars = new ObservableArray(cars)
          this._isLoading = false
        })
    }
  }

  ngOnDestroy(): void {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe()
      this._dataSubscription = null
    }
  }

  get cars(): ObservableArray<Car> {
    return this._cars
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  onCarItemTap(args: ListViewEventData): void {
    const tappedCarItem = args.view.bindingContext

    this._routerExtensions.navigate(['/cars/car-detail', tappedCarItem.id], {
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
}
