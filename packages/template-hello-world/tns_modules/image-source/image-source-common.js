var http = require("http");
var types = require("utils/types");
var definition = require("image-source");
var RESOURCE_PREFIX = "res://";
function fromResource(name) {
    var image = new definition.ImageSource();
    return image.loadFromResource(name) ? image : null;
}
exports.fromResource = fromResource;
function fromFile(path) {
    var image = new definition.ImageSource();
    return image.loadFromFile(path) ? image : null;
}
exports.fromFile = fromFile;
function fromData(data) {
    var image = new definition.ImageSource();
    return image.loadFromData(data) ? image : null;
}
exports.fromData = fromData;
function fromNativeSource(source) {
    var image = new definition.ImageSource();
    return image.setNativeSource(source) ? image : null;
}
exports.fromNativeSource = fromNativeSource;
function fromUrl(url) {
    return http.getImage(url);
}
exports.fromUrl = fromUrl;
function fromFileOrResource(path) {
    if (!isFileOrResourcePath(path)) {
        throw new Error("Path \"" + "\" is not a valid file or resource.");
    }
    if (path.indexOf(RESOURCE_PREFIX) === 0) {
        return fromResource(path.substr(RESOURCE_PREFIX.length));
    }
    return fromFile(path);
}
exports.fromFileOrResource = fromFileOrResource;
function isFileOrResourcePath(path) {
    if (!types.isString(path)) {
        return false;
    }
    return path.indexOf("~/") === 0 || path.indexOf("/") === 0 || path.indexOf(RESOURCE_PREFIX) === 0;
}
exports.isFileOrResourcePath = isFileOrResourcePath;
