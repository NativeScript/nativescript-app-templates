import { Observable } from "tns-core-modules/data/observable";
import { Folder, knownFolders, path } from "tns-core-modules/file-system";
import { ImageAsset } from "tns-core-modules/image-asset";
import { fromAsset, ImageSource } from "tns-core-modules/image-source";
import * as imagePicker from "nativescript-imagepicker";

import { ObservableProperty } from "../../shared/observable-property-decorator";
import { Car } from "../shared/car-model";
import { CarService } from "../shared/car-service";
import { RoundingValueConverter } from "./roundingValueConverter";
import { VisibilityValueConverter } from "./visibilityValueConverter";

const tempImageFolderName = "nsimagepicker";

export class CarDetailEditViewModel extends Observable {
    static get imageTempFolder(): Folder {
        return knownFolders.temp().getFolder(tempImageFolderName);
    }

    private static clearImageTempFolder(): void {
        CarDetailEditViewModel.imageTempFolder.clear();
    }

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

    onImageAddRemove(): void {
        if (this.car.imageUrl) {
            this.handleImageChange(null);

            return;
        }

        CarDetailEditViewModel.clearImageTempFolder();

        this.pickImage();
    }

    private pickImage(): void {
        const context = imagePicker.create({
            mode: "single"
        });

        context
            .authorize()
            .then(() => context.present())
            .then((selection) => selection.forEach(
                (selectedAsset: ImageAsset) => {
                    selectedAsset.options.height = 768;
                    fromAsset(selectedAsset)
                        .then((imageSource: ImageSource) => this.handleImageChange(imageSource));
                })
            ).catch((errorMessage: any) => console.log(errorMessage));
    }

    private handleImageChange(source: ImageSource): void {
        let raisePropertyChange = true;
        let tempImagePath = null;

        if (source) {
            tempImagePath = path.join(CarDetailEditViewModel.imageTempFolder.path, `${Date.now()}.jpg`);
            raisePropertyChange = source.saveToFile(tempImagePath, "jpeg");
        }

        if (raisePropertyChange) {
            this.car.imageUrl = tempImagePath;
            this._isCarImageDirty = true;
        }
    }
}
