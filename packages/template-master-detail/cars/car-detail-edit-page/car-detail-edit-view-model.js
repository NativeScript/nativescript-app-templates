const observableModule = require("data/observable");
const { knownFolders, path } = require("file-system");
const imagePicker = require("nativescript-imagepicker");

const CarService = require("../shared/car-service");
const roundingValueConverter = require("./roundingValueConverter");
const visibilityValueConverter = require("./visibilityValueConverter");

const tempImageFolderName = "nsimagepicker";

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

        onImageAddRemove: function () {
            if (this.car.imageUrl) {
                this._handleImageChange(null);

                return;
            }

            clearImageTempFolder();

            this._pickImage();
        },

        _pickImage: function () {
            const context = imagePicker.create({
                mode: "single"
            });

            context
                .authorize()
                .then(() => context.present())
                .then((selection) => selection.forEach(
                    (selectedAsset) => {
                        selectedAsset.getImage({ maxHeight: 768 })
                            .then((imageSource) => this._handleImageChange(imageSource));
                    })).catch((errorMessage) => console.log(errorMessage));
        },

        _handleImageChange: function (source) {
            let raisePropertyChange = true;
            let tempImagePath = null;
            if (source) {
                tempImagePath = path.join(getImageTempFolder().path, `${Date.now()}.jpg`);
                raisePropertyChange = source.saveToFile(tempImagePath, "jpeg");
            }

            if (raisePropertyChange) {
                // raise property change event here so binding in
                // /cars/car-detail-edit-page/my-image-add-remove/MyImageAddRemove.xml works correctly
                this.car.set("imageUrl", tempImagePath);
                this._isCarImageDirty = true;
            }
        }
    });

    viewModel.car.addEventListener(observableModule.Observable.propertyChangeEvent, (propertyChangeData) => {
        const propertyName = propertyChangeData.propertyName;
        if (propertyName === "name" || propertyName === "imageUrl") {
            // update dependent property
            viewModel.car.set("isModelValid", !!viewModel.car.name && !!viewModel.car.imageUrl);
        }
    });

    return viewModel;
}

function getImageTempFolder() {
    return knownFolders.temp().getFolder(tempImageFolderName);
}

function clearImageTempFolder() {
    getImageTempFolder().clear();
}

module.exports = CarDetailEditViewModel;
