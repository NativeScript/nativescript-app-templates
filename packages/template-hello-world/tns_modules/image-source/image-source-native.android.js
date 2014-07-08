var appModule = require("application/application");

exports.fromResource = function (name) {
    var androidApp = appModule.android;
    var res = androidApp.context.getResources();
    if (res) {
        var identifier = res.getIdentifier(name, 'drawable', androidApp.packageName);
        if (0 < identifier) {
            return android.graphics.BitmapFactory.decodeResource(res, identifier);
        }
    }

    return null;
};

exports.fromFile = function (path) {
    return android.graphics.BitmapFactory.decodeFile(path, null);
};

exports.fromData = function (data) {
    return android.graphics.BitmapFactory.decodeStream(data);
};

exports.saveToFile = function (instance, path, format, quality) {
    if (typeof quality === "undefined") { quality = 100; }
    if (!instance) {
        return false;
    }

    var targetFormat = android.graphics.Bitmap.CompressFormat.PNG;
    switch (format) {
        case 1:
            targetFormat = android.graphics.Bitmap.CompressFormat.JPEG;
            break;
    }

    var outputStream = new java.io.BufferedOutputStream(new java.io.FileOutputStream(path));

    var res = instance.compress(targetFormat, quality, outputStream);
    outputStream.close();
    return res;
};
//# sourceMappingURL=image-source-native.android.js.map
