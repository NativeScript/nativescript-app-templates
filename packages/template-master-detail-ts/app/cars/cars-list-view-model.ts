import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { Observable, ObservableArray } from '@nativescript/core'

import { ObservableProperty } from '../shared/observable-property-decorator'
import { Car } from './shared/car-model'
import { CarService } from './shared/car-service'

export class CarsListViewModel extends Observable {
    private static _subscriptionKey = 'car-list-view-model'

    @ObservableProperty() cars: ObservableArray<Car>
    @ObservableProperty() isLoading: boolean

    private _carService: CarService
    private _dataSubscription: Subscription

    constructor() {
        super()

        this.cars = new ObservableArray<Car>([])
        this.isLoading = false

        this._carService = CarService.getInstance()
    }

    load(): void {
        if (!this._dataSubscription) {
            this.isLoading = true

            // we need to be able to unsubscribe from data changes when old page got disposed / inaccessible but
            // we do not have equivalent of Angular ngOnInit / ngOnDestroy so it cannot be implicit solution i.e.
            // we should explicitly state when to unsubscribe e.g. in the following scenario master list #1 ->
            // car detail -> edit car detail -> master list #2 (forward nav with clearHistory)
            // we need to unsubscribe the master list #1 view model (as it can never be accessed again)
            // if cached subscription exists here, we know it is from a different (previous) instance of the same
            // view model and we need to unsubscribe from it
            const cachedSubscription = this._carService.getSubscription(
                CarsListViewModel._subscriptionKey
            )
            if (cachedSubscription) {
                cachedSubscription.unsubscribe()
                this._carService.setSubscription(
                    CarsListViewModel._subscriptionKey,
                    null
                )
            }

            this._dataSubscription = this._carService
                .load()
                .pipe(
                    finalize(() => {
                        this.isLoading = false
                    })
                )
                .subscribe((cars: Array<Car>) => {
                    this.cars = new ObservableArray(cars)
                    this.isLoading = false
                })

            this._carService.setSubscription(
                CarsListViewModel._subscriptionKey,
                this._dataSubscription
            )
        }
    }
}
