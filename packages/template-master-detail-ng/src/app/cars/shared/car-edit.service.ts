import { Injectable } from '@angular/core'

import { Car } from './car.model'
import { CarService } from './car.service'

@Injectable({
  providedIn: 'root',
})
export class CarEditService {
  private _editModel: Car

  constructor(private _carService: CarService) {}

  startEdit(id: string): Car {
    this._editModel = null

    return this.getEditableCarById(id)
  }

  getEditableCarById(id: string): Car {
    if (!this._editModel || this._editModel.id !== id) {
      const car = this._carService.getCarById(id)

      // get fresh editable copy of car model
      this._editModel = new Car(car)
    }

    return this._editModel
  }
}
