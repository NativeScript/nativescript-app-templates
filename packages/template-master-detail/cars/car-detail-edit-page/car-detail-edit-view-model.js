const observableModule = require("data/observable");
const imagePicker = require("nativescript-imagepicker");
const permissions = require("nativescript-permissions");
const platform = require("tns-core-modules/platform");

const CarService = require("../shared/car-service");
const roundingValueConverter = require("./roundingValueConverter");
const visibilityValueConverter = require("./visibilityValueConverter");


function CarDetailEditViewModel(carModel) {
    const viewModel = observableModule.fromObject({

        // car will be fresh editable copy due to the observable.fromObject(...) wrapping
        car: observableModule.fromObject(carModel),

        isUpdating: false,

        // set up value converter to force iOS UISlider to work with discrete steps
        roundingValueConverter: roundingValueConverter,
        // set up value converter to force visibility binding update in the template
        visibilityValueConverter: visibilityValueConverter,

        _carService: CarService.getInstance(),
        _isCarImageDirty: false,

        onImageAddRemove: function () {
            if (this.car.imageUrl) {
                this._handleImageChange(null);

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

            queue.then(() => this._startSelection(context))
                .catch((errorMessage) => console.log(errorMessage));
        },

        saveChanges: function () {
            let queue = Promise.resolve();

            this.set("isUpdating", true);

            // TODO: car image should be required field
            if (this._isCarImageDirty && this.car.imageUrl) {
                queue = queue
                    .then(() => {
                        // no need to explicitly delete old image as upload to an existing remote path overwrites it
                        const localFullPath = this.car.imageUrl;
                        const remoteFullPath = this.car.imageStoragePath;

                        return this._carService.uploadImage(remoteFullPath, localFullPath);
                    })
                    .then((uploadedFile) => {
                        // do not raise property change event here
                        this.car.imageUrl = uploadedFile.url;

                        this._isCarImageDirty = false;
                    });
            }

            return queue
                .then(() => this._carService.update(this.car))
                .then(() => this.set("isUpdating", false))
                .catch((errorMessage) => {
                    this.set("isUpdating", false);
                    throw errorMessage;
                });
        },

        _handleImageChange: function (value) {
            const oldValue = this.car.imageUrl;

            if (value) {
                // iOS simulator fileUri looks like file:///Users/...
                value = value.replace("file://", "");
            }

            if (oldValue === value) {
                return;
            }

            this._isCarImageDirty = true;

            // raise property change event here so binding in
            // /cars/car-detail-edit-page/my-image-add-remove/MyImageAddRemove.xml works correctly
            this.car.set("imageUrl", value);
        },

        _startSelection: function (context) {
            context
                .authorize()
                .then(() => context.present())
                .then((selection) => selection.forEach((selectedImage) => this._handleImageChange(selectedImage.fileUri)))
                .catch((errorMessage) => console.log(errorMessage));
        }
    });

    return viewModel;
}

module.exports = CarDetailEditViewModel;