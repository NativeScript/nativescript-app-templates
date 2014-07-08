var promises = require("promises/promises");
var imageSource = require("image-source/image-source");

var imagePickerController;

var CameraManager = (function () {
    function CameraManager() {
    }
    CameraManager.prototype.takePicture = function (params, onSuccess, onError) {
    };

    CameraManager.prototype.pictureFromLibrary = function (params, onSuccess, onError) {
    };
    return CameraManager;
})();
exports.CameraManager = CameraManager;

function topViewController() {
    return topViewControllerWithRootViewController(UIKit.UIApplication.sharedApplication().keyWindow.rootViewController);
}

function topViewControllerWithRootViewController(rootViewController) {
    if (rootViewController.isKindOfClass(UIKit.UITabBarController.class())) {
        return topViewControllerWithRootViewController(rootViewController.selectedViewController);
    } else if (rootViewController.isKindOfClass(UIKit.UINavigationController.class())) {
        return topViewControllerWithRootViewController(rootViewController.visibleViewController);
    } else if (rootViewController.presentedViewController) {
        return topViewControllerWithRootViewController(rootViewController.presentedViewController);
    } else {
        return rootViewController;
    }
}

exports.takePicture = function (options) {
    var d = promises.defer();

    var listener;

    var ImagePickerControllerListener = Foundation.NSObject.extends({}, {}).implements({
        protocol: "UIImagePickerControllerDelegate",
        implementation: {
            imagePickerControllerDidFinishPickingMediaWithInfo: function (picker, info) {
                console.log('takeImage received');
                picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);

                listener = null;
                var image = imageSource.fromNativeSource(info.valueForKey(UIKit.UIImagePickerControllerOriginalImage));
                d.resolve(image);
            },
            imagePickerControllerDidCancel: function (picker) {
                console.info('takeImage canceled');
                picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);

                listener = null;
                d.reject(new Error('takePicture canceled by user'));
            }
        }
    });

    imagePickerController = new UIKit.UIImagePickerController();
    listener = new ImagePickerControllerListener();
    imagePickerController.delegate = listener;
    imagePickerController.mediaTypes = UIKit.UIImagePickerController.availableMediaTypesForSourceType(1 /* UIImagePickerControllerSourceTypeCamera */);
    imagePickerController.sourceType = 1 /* UIImagePickerControllerSourceTypeCamera */;
    imagePickerController.modalPresentationStyle = 3 /* UIModalPresentationCurrentContext */;

    topViewController().presentViewControllerAnimatedCompletion(imagePickerController, true, null);

    return d.promise();
};
//# sourceMappingURL=camera.ios.js.map
