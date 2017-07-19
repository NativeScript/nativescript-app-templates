import { Observable } from "data/observable";
import * as imagePicker from "nativescript-imagepicker";
import * as permissions from "nativescript-permissions";
import * as platform from "tns-core-modules/platform";
import firebase = require("nativescript-plugin-firebase");

import { Car } from "../shared/car-model";
import { RoundingValueConverter } from "./roundingValueConverter";
import { VisibilityValueConverter } from "./visibilityValueConverter";

const editableProperties = [
    "doors",
    "imageUrl",
    "luggage",
    "name",
    "price",
    "seats",
    "transmission",
    "class"
];

export class CarDetailEditViewModel extends Observable {
    private _roundingValueConverter: RoundingValueConverter;
    private _visibilityValueConverter: VisibilityValueConverter;
    private _isUpdating: boolean;
    private _isCarImageDirty: boolean;

    constructor(private _car: Car) {
        super();

        this._isUpdating = false;
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

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    set isUpdating(value: boolean) {
        if (this._isUpdating !== value) {
            this._isUpdating = value;
            this.notifyPropertyChange("isUpdating", value);
        }
    }

    get car(): Car {
        return this._car;
    }

    onImageAddRemove(): void {
        if (this.car.imageUrl) {
            this.handleImageChange(null);

            return;
        }

        const context = imagePicker.create({
            mode: "single"
        });

        let queue = Promise.resolve();

        // lower SDK versions will grant permission from AndroidManifest file
        if (platform.device.os === "Android" && Number(platform.device.sdkVersion) >= 23) {
            queue = queue.then(() => permissions.requestPermission("android.permission.READ_EXTERNAL_STORAGE"));
        }

        queue.then(() => this.startSelection(context))
            .catch((errorMessage: any) => console.log(errorMessage));
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

                    return firebase.uploadFile({ localFullPath, remoteFullPath, onProgress: null });
                })
                .then((uploadedFile: any) => {
                    this.car.imageUrl = uploadedFile.url;
                    this._isCarImageDirty = false;
                });
        }

        return queue.then(() => {
            const carEditObject = this.cloneEditObject(this.car);

            return firebase.update("/cars/" + this.car.id, carEditObject);
        }).then(() => this.isUpdating = false)
            .catch((errorMessage: any) => {
                this.isUpdating = false;
                throw errorMessage;
            });
    }

    private cloneEditObject(car: Car) {
        // clone only editable properties
        // otherwise private properties (with leading underscore) from Car model will be sent to firebase
        return editableProperties.reduce((a, e) => (a[e] = car[e], a), {});
    }

    private startSelection(context): void {
        context
            .authorize()
            .then(() => context.present())
            .then((selection) => selection.forEach((selectedImage) => this.handleImageChange(selectedImage.fileUri)))
            .catch((errorMessage: any) => console.log(errorMessage));
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
