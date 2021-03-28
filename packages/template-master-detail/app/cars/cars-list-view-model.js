const { fromObject, ObservableArray } = require('@nativescript/core')
const finalize = require('rxjs/operators').finalize

const CarService = require('./shared/car-service')

const subscriptionKey = 'car-list-view-model'

function CarsListViewModel() {
  const viewModel = fromObject({
    cars: new ObservableArray([]),
    isLoading: false,

    _carService: CarService.getInstance(),
    _dataSubscription: null,

    load: function () {
      if (!this._dataSubscription) {
        this.set('isLoading', true)

        // we need to be able to unsubscribe from data changes when old page got disposed / inaccessible but
        // we do not have equivalent of Angular ngOnInit / ngOnDestroy so it cannot be implicit solution i.e.
        // we should explicitly state when to unsubscribe e.g. in the following scenario master list #1 ->
        // car detail -> edit car detail -> master list #2 (forward nav with clearHistory)
        // we need to unsubscribe the master list #1 view model (as it can never be accessed again)
        // if cached subscription exists here, we know it is from a different (previous) instance of the same
        // view model and we need to unsubscribe from it
        const cachedSubscription = this._carService.getSubscription(subscriptionKey)
        if (cachedSubscription) {
          cachedSubscription.unsubscribe()
          this._carService.setSubscription(subscriptionKey, null)
        }

        this._dataSubscription = this._carService
          .load()
          .pipe(finalize(() => this.set('isLoading', false)))
          .subscribe((cars) => {
            this.set('cars', new ObservableArray(cars))
            this.set('isLoading', false)
          })

        this._carService.setSubscription(subscriptionKey, this._dataSubscription)
      }
    },

    unload: function () {
      if (this._dataSubscription) {
        this._dataSubscription.unsubscribe()
        this._dataSubscription = null
      }
    },
  })

  return viewModel
}

module.exports = CarsListViewModel
