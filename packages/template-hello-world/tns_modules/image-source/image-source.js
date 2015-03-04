var native = require("image-source/image-source-native");
var platform = require("platform");
var types = require("utils/types");
var fs = require("file-system");
var http = require("http");
(function (ImageFormat) {
    ImageFormat[ImageFormat["PNG"] = 0] = "PNG";
    ImageFormat[ImageFormat["JPEG"] = 1] = "JPEG";
})(exports.ImageFormat || (exports.ImageFormat = {}));
var ImageFormat = exports.ImageFormat;
var ImageSource = (function () {
    function ImageSource() {
        this.setNativeInstance(null);
    }
    ImageSource.prototype.loadFromResource = function (name) {
        var nativeInstance = native.fromResource(name);
        this.setNativeInstance(nativeInstance);
        return nativeInstance != null;
    };
    ImageSource.prototype.loadFromFile = function (path) {
        var fileName = types.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        var nativeInstance = native.fromFile(fileName);
        this.setNativeInstance(nativeInstance);
        return (nativeInstance != null);
    };
    ImageSource.prototype.loadFromData = function (data) {
        var nativeInstance = native.fromData(data);
        this.setNativeInstance(nativeInstance);
        return (nativeInstance != null);
    };
    ImageSource.prototype.setNativeSource = function (source) {
        this.setNativeInstance(source);
        return source != null;
    };
    ImageSource.prototype.saveToFile = function (path, format, quality) {
        return native.saveToFile(this.getNativeInstance(), path, format, quality);
    };
    ImageSource.prototype.toBase64String = function (format, quality) {
        return native.toBase64String(this.getNativeInstance(), format, quality);
    };
    Object.defineProperty(ImageSource.prototype, "height", {
        get: function () {
            if (this.android) {
                return this.android.getHeight();
            }
            if (this.ios) {
                return this.ios.size.height;
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSource.prototype, "width", {
        get: function () {
            if (this.android) {
                return this.android.getWidth();
            }
            if (this.ios) {
                return this.ios.size.width;
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    ImageSource.prototype.setNativeInstance = function (instance) {
        if (platform.device.os === platform.platformNames.android) {
            this.android = instance;
        }
        else if (platform.device.os === platform.platformNames.ios) {
            this.ios = instance;
        }
    };
    ImageSource.prototype.getNativeInstance = function () {
        if (this.android) {
            return this.android;
        }
        if (this.ios) {
            return this.ios;
        }
        return undefined;
    };
    return ImageSource;
})();
exports.ImageSource = ImageSource;
function fromResource(name) {
    var image = new ImageSource();
    return image.loadFromResource(name) ? image : null;
}
exports.fromResource = fromResource;
function fromFile(path) {
    var image = new ImageSource();
    return image.loadFromFile(path) ? image : null;
}
exports.fromFile = fromFile;
function fromData(data) {
    var image = new ImageSource();
    return image.loadFromData(data) ? image : null;
}
exports.fromData = fromData;
function fromNativeSource(source) {
    var image = new ImageSource();
    return image.setNativeSource(source) ? image : null;
}
exports.fromNativeSource = fromNativeSource;
function fromUrl(url) {
    return http.getImage(url);
}
exports.fromUrl = fromUrl;
