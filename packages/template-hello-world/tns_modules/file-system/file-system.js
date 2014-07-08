var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var file_access_module = require("file-system/file-system-access");
var promises = require("promises/promises");

var fileAccess;
var getFileAccess = function () {
    if (!fileAccess) {
        fileAccess = new file_access_module.FileSystemAccess();
    }

    return fileAccess;
};

var nameProperty = "_name";
var pathProperty = "_path";
var isKnownProperty = "_isKnown";
var fileLockedProperty = "_locked";
var extensionProperty = "_extension";
var lastModifiedProperty = "_lastModified";

var createFile = function (info) {
    var file = new File();
    file[pathProperty] = info.path;
    file[nameProperty] = info.name;
    file[extensionProperty] = info.extension;

    return file;
};

var createFolder = function (info) {
    var documents = knownFolders.documents();
    if (info.path === documents.path) {
        return documents;
    }

    var temp = knownFolders.temp();
    if (info.path === temp.path) {
        return temp;
    }

    var folder = new Folder();

    folder[pathProperty] = info.path;
    folder[nameProperty] = info.name;

    return folder;
};

var FileSystemEntity = (function () {
    function FileSystemEntity() {
    }
    Object.defineProperty(FileSystemEntity.prototype, "parent", {
        get: function () {
            var onError = function (error) {
                throw error;
            };

            var folderInfo = getFileAccess().getParent(this.path, onError);
            if (!folderInfo) {
                return undefined;
            }

            return createFolder(folderInfo);
        },
        enumerable: true,
        configurable: true
    });

    FileSystemEntity.prototype.remove = function () {
        var fileAccess = getFileAccess();
        var promise = promises.defer();

        var localSucces = function () {
            promise.resolve();
        };
        var localError = function (error) {
            promise.reject(error);
        };

        if (this instanceof File) {
            fileAccess.deleteFile(this.path, localSucces, localError);
        } else if (this instanceof Folder) {
            fileAccess.deleteFolder(this.path, this[isKnownProperty], localSucces, localError);
        }

        return promise.promise();
    };

    FileSystemEntity.prototype.rename = function (newName) {
        var deferred = promises.defer();

        if (this instanceof Folder) {
            if (this[isKnownProperty]) {
                deferred.reject(new Error("Cannot rename known folder."));
                return deferred.promise();
            }
        }

        var parentFolder = this.parent;
        if (!parentFolder) {
            deferred.reject(new Error("No parent folder."));
            return deferred.promise();
        }

        var fileAccess = getFileAccess();
        var path = parentFolder.path;
        var newPath = fileAccess.joinPath(path, newName);

        var that = this;
        var localSucceess = function () {
            that[pathProperty] = newPath;
            that[nameProperty] = newName;

            if (that instanceof File) {
                that[extensionProperty] = fileAccess.getFileExtension(newPath);
            }

            deferred.resolve();
        };

        var localError = function (error) {
            deferred.reject(error);
        };

        fileAccess.rename(this.path, newPath, localSucceess, localError);

        return deferred.promise();
    };

    Object.defineProperty(FileSystemEntity.prototype, "name", {
        get: function () {
            return this[nameProperty];
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(FileSystemEntity.prototype, "path", {
        get: function () {
            return this[pathProperty];
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(FileSystemEntity.prototype, "lastModified", {
        get: function () {
            var value = this[lastModifiedProperty];
            if (!this[lastModifiedProperty]) {
                value = this[lastModifiedProperty] = getFileAccess().getLastModified(this.path);
            }

            return value;
        },
        enumerable: true,
        configurable: true
    });
    return FileSystemEntity;
})();
exports.FileSystemEntity = FileSystemEntity;

var File = (function (_super) {
    __extends(File, _super);
    function File() {
        _super.apply(this, arguments);
    }
    File.fromPath = function (path) {
        var onError = function (error) {
            throw error;
        };

        var fileInfo = getFileAccess().getFile(path, onError);
        if (!fileInfo) {
            return undefined;
        }

        return createFile(fileInfo);
    };

    File.exists = function (path) {
        return getFileAccess().fileExists(path);
    };

    Object.defineProperty(File.prototype, "extension", {
        get: function () {
            return this[extensionProperty];
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(File.prototype, "isLocked", {
        get: function () {
            return this[fileLockedProperty];
        },
        enumerable: true,
        configurable: true
    });

    File.prototype.readText = function (encoding) {
        this.checkAccess();

        var deferred = promises.defer();
        this[fileLockedProperty] = true;

        var that = this;
        var localSuccess = function (content) {
            that[fileLockedProperty] = false;
            deferred.resolve(content);
        };

        var localError = function (error) {
            that[fileLockedProperty] = false;
            deferred.reject(error);
        };

        getFileAccess().readText(this.path, localSuccess, localError, encoding);

        return deferred.promise();
    };

    File.prototype.writeText = function (content, encoding) {
        this.checkAccess();

        var deferred = promises.defer();
        this[fileLockedProperty] = true;

        var that = this;
        var localSuccess = function () {
            that[fileLockedProperty] = false;
            deferred.resolve();
        };

        var localError = function (error) {
            that[fileLockedProperty] = false;
            deferred.reject(error);
        };

        getFileAccess().writeText(this.path, content, localSuccess, localError, encoding);

        return deferred.promise();
    };

    File.prototype.checkAccess = function () {
        if (this.isLocked) {
            throw new Error("Cannot access a locked file.");
        }
    };
    return File;
})(FileSystemEntity);
exports.File = File;

var Folder = (function (_super) {
    __extends(Folder, _super);
    function Folder() {
        _super.apply(this, arguments);
    }
    Folder.fromPath = function (path) {
        var onError = function (error) {
            throw error;
        };

        var folderInfo = getFileAccess().getFolder(path, onError);
        if (!folderInfo) {
            return undefined;
        }

        return createFolder(folderInfo);
    };

    Folder.exists = function (path) {
        return getFileAccess().folderExists(path);
    };

    Folder.prototype.contains = function (name) {
        var fileAccess = getFileAccess();
        var path = fileAccess.joinPath(this.path, name);

        if (fileAccess.fileExists(path)) {
            return true;
        }

        return fileAccess.folderExists(path);
    };

    Folder.prototype.clear = function () {
        var deferred = promises.defer();

        var onSuccess = function () {
            deferred.resolve();
        };
        var onError = function (error) {
            deferred.reject(error);
        };

        getFileAccess().emptyFolder(this.path, onSuccess, onError);

        return deferred.promise();
    };

    Object.defineProperty(Folder.prototype, "isKnown", {
        get: function () {
            return this[isKnownProperty];
        },
        enumerable: true,
        configurable: true
    });

    Folder.prototype.getFile = function (name) {
        var fileAccess = getFileAccess();
        var path = fileAccess.joinPath(this.path, name);

        var onError = function (error) {
            throw error;
        };

        var fileInfo = fileAccess.getFile(path, onError);
        if (!fileInfo) {
            return undefined;
        }

        return createFile(fileInfo);
    };

    Folder.prototype.getFolder = function (name) {
        var fileAccess = getFileAccess();
        var path = fileAccess.joinPath(this.path, name);

        var onError = function (error) {
            throw error;
        };

        var folderInfo = fileAccess.getFolder(path, onError);
        if (!folderInfo) {
            return undefined;
        }

        return createFolder(folderInfo);
    };

    Folder.prototype.getEntities = function () {
        var deferred = promises.defer();

        var onSuccess = function (fileInfos) {
            var entities = new Array();
            var i, path, entity;

            for (i = 0; i < fileInfos.length; i++) {
                if (fileInfos[i].extension) {
                    entities.push(createFile(fileInfos[i]));
                } else {
                    entities.push(createFolder(fileInfos[i]));
                }
            }

            deferred.resolve(entities);
        };

        var onError = function (error) {
            throw error;
        };

        getFileAccess().getEntities(this.path, onSuccess, onError);

        return deferred.promise();
    };

    Folder.prototype.eachEntity = function (onEntity) {
        if (!onEntity) {
            return;
        }

        var onSuccess = function (fileInfo) {
            var entity;
            if (fileInfo.extension) {
                entity = createFile(fileInfo);
            } else {
                entity = createFolder(fileInfo);
            }

            return onEntity(entity);
        };

        var onError = function (error) {
            throw error;
        };

        getFileAccess().eachEntity(this.path, onSuccess, onError);
    };
    return Folder;
})(FileSystemEntity);
exports.Folder = Folder;

(function (knownFolders) {
    var _documents;
    var _temp;

    knownFolders.documents = function () {
        if (!_documents) {
            var path = getFileAccess().getDocumentsFolderPath();
            _documents = new Folder();
            _documents[pathProperty] = path;
            _documents[isKnownProperty] = true;
        }

        return _documents;
    };

    knownFolders.temp = function () {
        if (!_temp) {
            var path = getFileAccess().getTempFolderPath();
            _temp = new Folder();
            _temp[pathProperty] = path;
            _temp[isKnownProperty] = true;
        }

        return _temp;
    };
})(exports.knownFolders || (exports.knownFolders = {}));
var knownFolders = exports.knownFolders;

(function (_path) {
    function normalize(path) {
        return getFileAccess().normalizePath(path);
    }
    _path.normalize = normalize;

    function join() {
        var paths = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            paths[_i] = arguments[_i + 0];
        }
        var fileAccess = getFileAccess();
        return fileAccess.joinPaths(paths);
    }
    _path.join = join;

    _path.separator = getFileAccess().getPathSeparator();
})(exports.path || (exports.path = {}));
var path = exports.path;
//# sourceMappingURL=file-system.impl.js.map
