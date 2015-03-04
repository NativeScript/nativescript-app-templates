var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var imageSource = require("image-source");
var frame = require("ui/frame");
var UIImagePickerControllerDelegateImpl = (function (_super) {
    __extends(UIImagePickerControllerDelegateImpl, _super);
    function UIImagePickerControllerDelegateImpl() {
        _super.apply(this, arguments);
    }
    UIImagePickerControllerDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UIImagePickerControllerDelegateImpl.prototype.initWithCallback = function (callback) {
        this._callback = callback;
        return this;
    };
    UIImagePickerControllerDelegateImpl.prototype.imagePickerControllerDidFinishPickingMediaWithInfo = function (picker, info) {
        if (info) {
            var source = info.valueForKey(UIImagePickerControllerOriginalImage);
            if (source) {
                var image = imageSource.fromNativeSource(source);
                if (this._callback) {
                    this._callback(image);
                }
            }
        }
        picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    };
    UIImagePickerControllerDelegateImpl.prototype.imagePickerControllerDidCancel = function (picker) {
        picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    };
    UIImagePickerControllerDelegateImpl.ObjCProtocols = [UIImagePickerControllerDelegate];
    return UIImagePickerControllerDelegateImpl;
})(NSObject);
exports.takePicture = function () {
    return new Promise(function (resolve, reject) {
        var imagePickerController = new UIImagePickerController();
        var listener = UIImagePickerControllerDelegateImpl.new().initWithCallback(resolve);
        imagePickerController.delegate = listener;
        if (UIDevice.currentDevice().model !== "iPhone Simulator") {
            imagePickerController.mediaTypes = UIImagePickerController.availableMediaTypesForSourceType(UIImagePickerControllerSourceType.UIImagePickerControllerSourceTypeCamera);
            imagePickerController.sourceType = UIImagePickerControllerSourceType.UIImagePickerControllerSourceTypeCamera;
        }
        imagePickerController.modalPresentationStyle = UIModalPresentationStyle.UIModalPresentationCurrentContext;
        var topMostFrame = frame.topmost();
        if (topMostFrame) {
            var viewController = topMostFrame.currentPage && topMostFrame.currentPage.ios;
            if (viewController) {
                viewController.presentModalViewControllerAnimated(imagePickerController, true);
            }
        }
    });
};
