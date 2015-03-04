exports.fromResource = function (name) {
    return UIImage.imageNamed(name);
};
exports.fromFile = function (path) {
    return UIImage.imageWithContentsOfFile(path);
};
exports.fromData = function (data) {
    return UIImage.imageWithData(data);
};
exports.saveToFile = function (instance, path, format, quality) {
    var res = false;
    if (!instance) {
        return res;
    }
    var data = getImageData(instance, format, quality);
    if (data) {
        res = data.writeToFileAtomically(path, true);
    }
    return res;
};
function toBase64String(instance, format, quality) {
    var res = null;
    if (!instance) {
        return res;
    }
    var data = getImageData(instance, format, quality);
    if (data) {
        res = data.base64Encoding();
    }
    return res;
}
exports.toBase64String = toBase64String;
function getImageData(instance, format, quality) {
    var data = null;
    switch (format) {
        case 0:
            data = UIImagePNGRepresentation(instance);
            break;
        case 1:
            data = UIImageJPEGRepresentation(instance, ('undefined' === typeof quality) ? 1.0 : quality);
            break;
    }
    return data;
}
