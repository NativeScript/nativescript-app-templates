var appModule = require("application/application");

var REQUEST_IMAGE_CAPTURE = 1;
var REQUEST_SELECT_PICTURE = 2;

var CameraManager = (function () {
    function CameraManager() {
    }
    CameraManager.prototype.takePicture = function (params, onSuccess, onError) {
        var takePictureIntent = new android.content.Intent('android.media.action.IMAGE_CAPTURE');
        var androidApp = appModule.android;

        if (takePictureIntent.resolveActivity(androidApp.context.getPackageManager()) !== null) {
            androidApp.currentActivity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    };

    CameraManager.prototype.pictureFromLibrary = function (params, onSuccess, onError) {
        var readPictureIntent = new android.content.Intent();
        var androidApp = appModule.android;

        readPictureIntent.setType('image/*');
        readPictureIntent.setAction('android.intent.action.GET_CONTENT');

        androidApp.currentActivity.startActivityForResult(android.content.Intent.createChooser(readPictureIntent, 'Select Picture'), REQUEST_SELECT_PICTURE);
    };
    return CameraManager;
})();
exports.CameraManager = CameraManager;
//# sourceMappingURL=camera.android.js.map
