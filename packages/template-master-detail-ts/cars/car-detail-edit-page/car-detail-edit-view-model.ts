import { Observable } from "data/observable";
import * as imagePicker from "nativescript-imagepicker";

import { ObservableProperty } from "../../shared/observable-property-decorator";
import { Car } from "../shared/car-model";
import { CarService } from "../shared/car-service";
import { RoundingValueConverter } from "./roundingValueConverter";
import { VisibilityValueConverter } from "./visibilityValueConverter";

export class CarDetailEditViewModel extends Observable {
    @ObservableProperty() car: Car;
    @ObservableProperty() isUpdating: boolean;

    private _roundingValueConverter: RoundingValueConverter;
    private _visibilityValueConverter: VisibilityValueConverter;
    private _isCarImageDirty: boolean;
    private _carService: CarService;

    constructor(car: Car) {
        super();

        // get a fresh editable copy of car model
        this.car = new Car(car);

        this._carService = CarService.getInstance();

        this.isUpdating = false;
        this._isCarImageDirty = false;

        // set up value converter to force iOS UISlider to work with discrete steps
        this._roundingValueConverter = new RoundingValueConverter();

        this._visibilityValueConverter = new VisibilityValueConverter();
    }

    get roundingValueConverter(): RoundingValueConverter {
        return this._roundingValueConverter;
    }

    get visibilityValueConverter(): VisibilityValueConverter {
        return this._visibilityValueConverter;
    }

    onImageAddRemove(): void {
        if (this.car.imageUrl) {
            this.handleImageChange(null);

            return;
        }

        const context = imagePicker.create({
            mode: "single"
        });

        context
            .authorize()
            .then(() => context.present())
            .then((selection) => selection.forEach(
                (selectedImage) => this.handleImageChange(selectedImage.fileUri))
            ).catch((errorMessage: any) => console.log(errorMessage));
    }

    saveChanges(): Promise<any> {
        let queue = Promise.resolve();

        this.isUpdating = true;

        // TODO: car image should be required field
        if (this._isCarImageDirty && this.car.imageUrl) {
            queue = queue
                .then(() => {
                    // no need to explicitly delete old image as upload to an existing remote path overwrites it
                    const localFullPath = this.car.imageUrl;
                    const remoteFullPath = this.car.imageStoragePath;

                    return this._carService.uploadImage(remoteFullPath, localFullPath);
                })
                .then((uploadedFile: any) => {
                    this.car.imageUrl = uploadedFile.url;

                    this._isCarImageDirty = false;
                });
        }

        return queue.then(() => {
            return this._carService.update(this.car);
        }).then(() => this.isUpdating = false)
            .catch((errorMessage: any) => {
                this.isUpdating = false;
                throw errorMessage;
            });
    }

    private handleImageChange(value): void {
        const oldValue = this.car.imageUrl;

        if (value) {
            // iOS simulator fileUri looks like file:///Users/...
            value = value.replace("file://", "");
        }

        if (oldValue === value) {
            return;
        }

        this._isCarImageDirty = true;
        this.car.imageUrl = value;
    }
}
