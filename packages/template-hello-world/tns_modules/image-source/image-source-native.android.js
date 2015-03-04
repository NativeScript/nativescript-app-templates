var appModule = require("application");
function fromResource(name) {
    var androidApp = appModule.android;
    var res = androidApp.context.getResources();
    if (res) {
        var identifier = res.getIdentifier(name, 'drawable', androidApp.packageName);
        if (0 < identifier) {
            return android.graphics.BitmapFactory.decodeResource(res, identifier);
        }
    }
    return null;
}
exports.fromResource = fromResource;
function fromFile(path) {
    return android.graphics.BitmapFactory.decodeFile(path, null);
}
exports.fromFile = fromFile;
function fromData(data) {
    return android.graphics.BitmapFactory.decodeStream(data);
}
exports.fromData = fromData;
function saveToFile(instance, path, format, quality) {
    if (quality === void 0) { quality = 100; }
    if (!instance) {
        return false;
    }
    var targetFormat = getTargetFromat(format);
    var outputStream = new java.io.BufferedOutputStream(new java.io.FileOutputStream(path));
    var res = instance.compress(targetFormat, quality, outputStream);
    outputStream.close();
    return res;
}
exports.saveToFile = saveToFile;
function toBase64String(instance, format, quality) {
    if (quality === void 0) { quality = 100; }
    if (!instance) {
        return null;
        ;
    }
    var targetFormat = getTargetFromat(format);
    var outputStream = new java.io.ByteArrayOutputStream();
    var base64Stream = new android.util.Base64OutputStream(outputStream, android.util.Base64.NO_WRAP);
    instance.compress(targetFormat, quality, base64Stream);
    base64Stream.close();
    outputStream.close();
    return outputStream.toString();
}
exports.toBase64String = toBase64String;
function getTargetFromat(format) {
    switch (format) {
        case 1:
            return android.graphics.Bitmap.CompressFormat.JPEG;
        default:
            return android.graphics.Bitmap.CompressFormat.PNG;
    }
}
