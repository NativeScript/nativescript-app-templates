var utilsModule = require("utils/utils_ios");
var textModule = require("text/text");

var FileSystemAccess = (function () {
    function FileSystemAccess() {
        this.keyFileType = "NSFileType";
        this.keyModificationTime = "NSFileModificationDate";
        this.keyReadonly = "NSFileImmutable";
        this.documentDir = 9;
        this.cachesDir = 13;
        this.userDomain = 1;
        this.NSUTF8StringEncoding = 4;
    }
    FileSystemAccess.prototype.getLastModified = function (path) {
        var fileManager = Foundation.NSFileManager.defaultManager();
        var attributes = fileManager.attributesOfItemAtPathError(path, null);

        if (attributes) {
            var date = attributes.objectForKey(this.keyModificationTime);
            var interval = date.timeIntervalSince1970();

            return new Date(interval * 1000);
        } else {
            return new Date();
        }
    };

    FileSystemAccess.prototype.getParent = function (path, onError) {
        try  {
            var fileManager = Foundation.NSFileManager.defaultManager();
            var nsString = Foundation.NSString.initWithString(path);

            var parentPath = nsString.stringByDeletingLastPathComponent();
            var name = fileManager.displayNameAtPath(parentPath);

            return {
                path: parentPath.toString(),
                name: name
            };
        } catch (exception) {
            if (onError) {
                onError(exception);
            }

            return undefined;
        }
    };

    FileSystemAccess.prototype.getFile = function (path, onError) {
        try  {
            var fileManager = Foundation.NSFileManager.defaultManager();
            var exists = fileManager.fileExistsAtPath(path);

            if (!exists) {
                if (!fileManager.createFileAtPathContentsAttributes(path, null, null)) {
                    if (onError) {
                        onError(new Error("Failed to create folder at path '" + path + "'"));
                    }

                    return undefined;
                }
            }

            var fileName = fileManager.displayNameAtPath(path);

            return {
                path: path,
                name: fileName,
                extension: this.getFileExtension(path)
            };
        } catch (exception) {
            if (onError) {
                onError(exception);
            }

            return undefined;
        }
    };

    FileSystemAccess.prototype.getFolder = function (path, onError) {
        try  {
            var fileManager = Foundation.NSFileManager.defaultManager();
            var exists = this.folderExists(path);

            if (!exists) {
                if (!fileManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(path, true, null, null)) {
                    if (onError) {
                        onError(new Error("Failed to create folder at path '" + path + "'"));
                    }

                    return undefined;
                }
            }

            var dirName = fileManager.displayNameAtPath(path);

            return {
                path: path,
                name: dirName
            };
        } catch (ex) {
            if (onError) {
                onError(new Error("Failed to create folder at path '" + path + "'"));
            }

            return undefined;
        }
    };

    FileSystemAccess.prototype.eachEntity = function (path, onEntity, onError) {
        if (!onEntity) {
            return;
        }

        this.enumEntities(path, onEntity, onError);
    };

    FileSystemAccess.prototype.getEntities = function (path, onSuccess, onError) {
        if (!onSuccess) {
            return;
        }

        var fileInfos = new Array();
        var onEntity = function (entity) {
            fileInfos.push(entity);
            return true;
        };

        var errorOccurred;
        var localError = function (error) {
            if (onError) {
                onError(error);
            }

            errorOccurred = true;
        };

        this.enumEntities(path, onEntity, onError);

        if (!errorOccurred) {
            onSuccess(fileInfos);
        }
    };

    FileSystemAccess.prototype.fileExists = function (path) {
        var fileManager = Foundation.NSFileManager.defaultManager();
        return fileManager.fileExistsAtPath(path);
    };

    FileSystemAccess.prototype.folderExists = function (path) {
        var fileManager = Foundation.NSFileManager.defaultManager();

        var buffer = NativePointer.create(PrimitiveType.BOOL, 1);
        var exists = fileManager.fileExistsAtPathIsDirectory(path, buffer);

        var isDir = buffer[0] && buffer[0] > 0;

        buffer.delete();

        return exists && isDir;
    };

    FileSystemAccess.prototype.concatPath = function (left, right) {
        var nsArray = utilsModule.Collections.jsArrayToNSArray([left, right]);
        var nsString = Foundation.NSString.pathWithComponents(nsArray);

        return nsString.toString();
    };

    FileSystemAccess.prototype.deleteFile = function (path, onSuccess, onError) {
        this.deleteEntity(path, onSuccess, onError);
    };

    FileSystemAccess.prototype.deleteFolder = function (path, isKnown, onSuccess, onError) {
        this.deleteEntity(path, onSuccess, onError);
    };

    FileSystemAccess.prototype.emptyFolder = function (path, onSuccess, onError) {
        var fileManager = Foundation.NSFileManager.defaultManager();

        var filesEnum = function (files) {
            var i;
            for (i = 0; i < files.length; i++) {
                if (!fileManager.removeItemAtPathError(files[i].path, null)) {
                    if (onError) {
                        onError(new Error("Failed to empty folder '" + path + "'"));
                    }

                    return;
                }
            }

            if (onSuccess) {
                onSuccess();
            }
        };

        this.getEntities(path, filesEnum, onError);
    };

    FileSystemAccess.prototype.rename = function (path, newPath, onSuccess, onError) {
        var fileManager = Foundation.NSFileManager.defaultManager();
        if (!fileManager.moveItemAtPathToPathError(path, newPath, null)) {
            if (onError) {
                onError(new Error("Failed to rename '" + path + "' to '" + newPath + "'"));
            }
        } else if (onSuccess) {
            onSuccess();
        }
    };

    FileSystemAccess.prototype.getDocumentsFolderPath = function () {
        return this.getKnownPath(this.documentDir);
    };

    FileSystemAccess.prototype.getTempFolderPath = function () {
        return this.getKnownPath(this.cachesDir);
    };

    FileSystemAccess.prototype.readText = function (path, onSuccess, onError, encoding) {
        var actualEncoding = encoding;
        if (!actualEncoding) {
            actualEncoding = textModule.encoding.UTF_8;
        }

        var nsString = Foundation.NSString.stringWithContentsOfFileEncodingError(path, actualEncoding, null);
        if (!nsString) {
            if (onError) {
                onError(new Error("Failed to read file at path '" + path + "'"));
            }
        } else if (onSuccess) {
            onSuccess(nsString.toString());
        }
    };

    FileSystemAccess.prototype.writeText = function (path, content, onSuccess, onError, encoding) {
        var nsString = Foundation.NSString.initWithString(content);

        var actualEncoding = encoding;
        if (!actualEncoding) {
            actualEncoding = textModule.encoding.UTF_8;
        }

        if (!nsString.writeToFileAtomicallyEncodingError(path, false, actualEncoding, null)) {
            if (onError) {
                onError(new Error("Failed to write to file '" + path + "'"));
            }
        } else if (onSuccess) {
            onSuccess();
        }
    };

    FileSystemAccess.prototype.getKnownPath = function (folderType) {
        var fileManager = Foundation.NSFileManager.defaultManager();
        var paths = fileManager.URLsForDirectoryInDomains(folderType, this.userDomain);

        var url = paths.objectAtIndex(0);
        return url.path();
    };

    FileSystemAccess.prototype.getFileExtension = function (path) {
        var dotIndex = path.lastIndexOf(".");
        if (dotIndex && dotIndex >= 0 && dotIndex < path.length) {
            return path.substring(dotIndex);
        }

        return "";
    };

    FileSystemAccess.prototype.deleteEntity = function (path, onSuccess, onError) {
        var fileManager = Foundation.NSFileManager.defaultManager();
        if (!fileManager.removeItemAtPathError(path, null)) {
            if (onError) {
                onError(new Error("Failed to delete file at path '" + path + "'"));
            }
        } else {
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    FileSystemAccess.prototype.enumEntities = function (path, callback, onError) {
        try  {
            var fileManager = Foundation.NSFileManager.defaultManager();
            var files = fileManager.contentsOfDirectoryAtPathError(path, null);

            if (!files) {
                if (onError) {
                    onError(new Error("Failed to enum files for forlder '" + path + "'"));
                }

                return;
            }

            var fileInfos = new Array();
            var file, i, info, retVal;

            for (i = 0; i < files.count(); i++) {
                file = files.objectAtIndex(i);

                info = {
                    path: this.concatPath(path, file),
                    name: file
                };

                if (!this.folderExists(file)) {
                    info.extension = this.getFileExtension(info.path);
                }

                retVal = callback(info);
                if (retVal === false) {
                    break;
                }
            }
        } catch (ex) {
            if (onError) {
                onError(ex);
            }
        }
    };

    FileSystemAccess.prototype.getPathSeparator = function () {
        return "/";
    };

    FileSystemAccess.prototype.normalizePath = function (path) {
        var nsString = Foundation.NSString.stringWithString(path);
        var normalized = nsString.stringByStandardizingPath();

        return normalized;
    };

    FileSystemAccess.prototype.joinPath = function (left, right) {
        var nsString = Foundation.NSString.stringWithString(left);
        return nsString.stringByAppendingPathComponent(right);
    };

    FileSystemAccess.prototype.joinPaths = function (paths) {
        if (!paths || paths.length === 0) {
            return "";
        }

        var nsArray = new Foundation.NSMutableArray(paths.length);

        var i;
        for (i = 0; i < paths.length; i++) {
            nsArray.addObject(paths[i]);
        }

        var nsString = Foundation.NSString.stringWithString(Foundation.NSString.pathWithComponents(nsArray));
        return nsString.stringByStandardizingPath();
    };
    return FileSystemAccess;
})();
exports.FileSystemAccess = FileSystemAccess;
//# sourceMappingURL=file-system-access.ios.js.map
