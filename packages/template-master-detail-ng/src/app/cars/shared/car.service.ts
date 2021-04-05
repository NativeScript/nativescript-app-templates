import { Injectable, NgZone } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import ApiService  from "~/services/api.service";

import { Car } from './car.model'

const editableProperties = [
  'doors',
  'imageUrl',
  'luggage',
  'name',
  'price',
  'seats',
  'transmission',
  'class',
]

/* ***********************************************************
 * This is the master detail data service. It handles all the data operations
 * of retrieving and updating the data. In this case, it is connected to Firebase and
 * is using the {N} Firebase plugin. Learn more about it here:
 * https://github.com/EddyVerbruggen/nativescript-plugin-firebase
 * The {N} Firebase plugin needs some initialization steps before the app starts.
 * Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
 *************************************************************/
@Injectable({
  providedIn: 'root',
})
export class CarService {
  private static cloneUpdateModel(car: Car): object {
    return editableProperties.reduce((a, e) => ((a[e] = car[e]), a), {})
  }

  private _cars: Array<Car> = []

  constructor(private _ngZone: NgZone) {}

  getCarById(id: string): Car {
    if (!id) {
      return
    }

    return this._cars.filter((car) => {
      return car.id === id
    })[0]
  }

  load(): Observable<any> {
    return new Observable((observer: any) => {
      const path = 'cars'

      const onValueEvent = (snapshot: any) => {
        this._ngZone.run(() => {
          const results = this.handleSnapshot(snapshot)
          observer.next(results)
        })
      }
      ApiService.addValueEventListener(onValueEvent, `/${path}`)
    }).pipe(catchError(this.handleErrors))
  }

  update(carModel: Car): Promise<any> {
    const updateModel = CarService.cloneUpdateModel(carModel)

    return ApiService.update('/cars/' + carModel.id, updateModel)
  }

  uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
    return ApiService.uploadFile({
      localFullPath,
      remoteFullPath,
      onProgress: null,
    })
  }

  private handleSnapshot(data: any): Array<Car> {
    this._cars = []

    if (data) {
      for (const id in data) {
        if (data.hasOwnProperty(id)) {
          this._cars.push(new Car(data[id]))
        }
      }
    }

    return this._cars
  }

  private handleErrors(error: Response): Observable<never> {
    return throwError(error)
  }
}
