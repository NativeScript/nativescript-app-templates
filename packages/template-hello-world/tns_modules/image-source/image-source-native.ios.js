exports.fromResource = function (name) {
    return UIKit.UIImage.imageNamed(name);
};

exports.fromFile = function (path) {
    return UIKit.UIImage.imageWithContentsOfFile(path);
};

exports.fromData = function (data) {
    return UIKit.UIImage.imageWithData(data);
};

exports.saveToFile = function (instance, path, format, quality) {
    if (!instance) {
        return false;
    }

    var res = false;
    var data = null;
    switch (format) {
        case 0:
            data = UIKit.UIImagePNGRepresentation(instance);
            break;
        case 1:
            data = UIKit.UIImageJPEGRepresentation(instance, ('undefined' == typeof quality) ? 1.0 : quality);
            break;
    }
    if (null != data) {
        res = data.writeToFileAtomically(path, true);
    }
    return res;
};
//# sourceMappingURL=image-source-native.ios.js.map
