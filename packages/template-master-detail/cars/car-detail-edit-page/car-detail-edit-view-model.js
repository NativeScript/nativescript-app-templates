const Observable = require("data/observable").Observable;
const imagePicker = require("nativescript-imagepicker");
const permissions = require("nativescript-permissions");
const platform = require("tns-core-modules/platform");
const firebase = require("nativescript-plugin-firebase");

const faPlusIcon = "\uf067";
const faThrashIcon = "\uf014";

function CarDetailEditViewModel(carModel) {
    const viewModel = new Observable();

    viewModel.car = carModel;
    viewModel.addRemoveText = faThrashIcon;

    viewModel.carLuggageMinValue = 0;
    viewModel.carLuggageMaxValue = 5;

    viewModel.isUpdating = false;
    viewModel._isCarImageDirty = false;

    viewModel.onImageAddRemove = function () {
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
    };

    viewModel.saveChanges = function () {
        let queue = Promise.resolve();

        this.set("isUpdating", true);

        // TODO: car image should be required field
        if (this._isCarImageDirty && this.car.imageUrl) {
            queue = queue
                .then(() => {
                    // no need to explicitly delete old image as upload to an existing remote path overwrites it
                    const localFullPath = this.car.imageUrl;
                    const remoteFullPath = this.car.imageStoragePath;

                    return firebase.uploadFile({
                        localFullPath,
                        remoteFullPath,
                        onProgress: null
                    });
                })
                .then((uploadedFile) => {
                    this.car.imageUrl = uploadedFile.url;
                    this._isCarImageDirty = false;
                });
        }

        return queue
            .then(() => firebase.update(`/cars/${this.car.id}`, this.car))
            .then(() => this.set("isUpdating", false))
            .catch((errorMessage) => {
                this.set("isUpdating", false);
                throw errorMessage;
            });
    };

    viewModel._startSelection = function (context) {
        context
            .authorize()
            .then(() => context.present())
            .then((selection) => selection.forEach((selectedImage) => this._handleImageChange(selectedImage.fileUri)))
            .catch((errorMessage) => console.log(errorMessage));
    };

    viewModel._handleImageChange = function (value) {
        const oldValue = this.car.imageUrl;

        if (value) {
            // iOS simulator fileUri looks like file:///Users/...
            value = value.replace("file://", "");
        }

        if (oldValue === value) {
            return;
        }

        this._isCarImageDirty = true;
        this.car.set("imageUrl", value);
        this.set("addRemoveText", this.car.imageUrl ? faThrashIcon : faPlusIcon);
    };

    return viewModel;
}

module.exports = CarDetailEditViewModel;
