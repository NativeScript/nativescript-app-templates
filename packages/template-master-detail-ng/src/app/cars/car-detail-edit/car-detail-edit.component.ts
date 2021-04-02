import { Component, OnInit } from '@angular/core'
import { PageRoute, RouterExtensions } from '@nativescript/angular'
import { switchMap } from 'rxjs/operators'
import { Dialogs } from '@nativescript/core'

import { CarEditService } from '../shared/car-edit.service'
import { Car } from '../shared/car.model'
import { CarService } from '../shared/car.service'
import { carClassList, carDoorList, carSeatList, carTransmissionList } from './constants'

@Component({
  selector: 'CarDetailEdit',
  templateUrl: './car-detail-edit.component.html',
  styleUrls: ['./car-detail-edit.component.scss'],
})
export class CarDetailEditComponent implements OnInit {
  private _car: Car
  private _carClassOptions: Array<string> = []
  private _carDoorOptions: Array<number> = []
  private _carSeatOptions: Array<string> = []
  private _carTransmissionOptions: Array<string> = []
  private _isCarImageDirty: boolean = false
  private _isUpdating: boolean = false

  constructor(
    private _carService: CarService,
    private _carEditService: CarEditService,
    private _pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.initializeEditOptions()

    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
        const carId = params.id

        this._car = this._carEditService.startEdit(carId)
      })
  }

  get isUpdating(): boolean {
    return this._isUpdating
  }

  get car(): Car {
    return this._car
  }

  get pricePerDay(): number {
    return this._car.price
  }

  set pricePerDay(value: number) {
    // force iOS UISlider to work with discrete steps
    this._car.price = Math.round(value)
  }

  get luggageValue(): number {
    return this._car.luggage
  }

  set luggageValue(value: number) {
    // force iOS UISlider to work with discrete steps
    this._car.luggage = Math.round(value)
  }

  get carClassOptions(): Array<string> {
    return this._carClassOptions
  }

  get carDoorOptions(): Array<number> {
    return this._carDoorOptions
  }

  get carSeatOptions(): Array<string> {
    return this._carSeatOptions
  }

  get carTransmissionOptions(): Array<string> {
    return this._carTransmissionOptions
  }

  get carImageUrl(): string {
    return this._car.imageUrl
  }

  set carImageUrl(value: string) {
    this._car.imageUrl = value
    this._isCarImageDirty = true
  }

  onCancelButtonTap(): void {
    this._routerExtensions.backToPreviousPage()
  }

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
                Dialogs.alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *************************************************************/

    /* ***********************************************************
     * Comment out the code block below if you made the app editable.
     *************************************************************/
    const readOnlyMessage =
      'Check out the "Firebase database setup" section in the readme file to make it editable.'
    const queue = Promise.resolve()
    queue
      .then(() =>
        Dialogs.alert({
          title: 'Read-Only Template!',
          message: readOnlyMessage,
          okButtonText: 'Ok',
        })
      )
      .then(() =>
        this._routerExtensions.navigate(['/cars'], {
          clearHistory: true,
          animated: true,
          transition: {
            name: 'slideBottom',
            duration: 200,
            curve: 'ease',
          },
        })
      )
  }

  private initializeEditOptions(): void {
    for (const classItem of carClassList) {
      this._carClassOptions.push(classItem)
    }

    for (const doorItem of carDoorList) {
      this._carDoorOptions.push(doorItem)
    }

    for (const seatItem of carSeatList) {
      this._carSeatOptions.push(seatItem)
    }

    for (const transmissionItem of carTransmissionList) {
      this._carTransmissionOptions.push(transmissionItem)
    }
  }
}
