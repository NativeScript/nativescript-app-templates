var ArraySortHelper = (function () {
    function ArraySortHelper() {
    }
    ArraySortHelper.sort = function (keys, index, length, compareFn) {
        if (length < 2) {
            return;
        }
        if (keys.length === length) {
            keys.sort(compareFn);
            return;
        }
        var sorted = keys.splice(index, length);
        sorted.sort(compareFn);
        var args = [0, index];
        keys.splice.apply(keys, args.concat(sorted));
    };
    return ArraySortHelper;
})();
exports.ArraySortHelper = ArraySortHelper;
var StringComparer = (function () {
    function StringComparer() {
    }
    StringComparer.prototype.equals = function (x, y) {
        return x === y;
    };
    StringComparer.prototype.getHashCode = function (str) {
        var res = 0, len = str.length;
        for (var i = 0; i < len; i++) {
            res = res * 31 + str.charCodeAt(i);
        }
        return res;
    };
    return StringComparer;
})();
exports.StringComparer = StringComparer;
var Dictionary = (function () {
    function Dictionary(comparer) {
        this._count = 0;
        this._version = 0;
        this._comparer = comparer;
        this._entries = new Array();
    }
    Object.defineProperty(Dictionary.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.forEach = function (callbackfn) {
        var currentVersion = this._version;
        for (var index in this._entries) {
            var entry = this._entries[index];
            callbackfn(entry.key, entry.value);
            if (currentVersion !== this._version) {
                throw new Error("Cannot modify Dictionary while enumerating.");
            }
        }
    };
    Dictionary.prototype.clear = function () {
        if (this.count > 0) {
            this._entries = new Array();
            this._count = 0;
            this._version++;
        }
    };
    Dictionary.prototype.remove = function (key) {
        if (!key) {
            throw new Error("key cannot be null/undefined.");
        }
        var hash = this._comparer.getHashCode(key);
        var previousEntry = null;
        for (var entry = this._entries[hash]; entry; entry = entry.next) {
            if (entry.hashCode === hash && this._comparer.equals(entry.key, key)) {
                if (previousEntry) {
                    previousEntry.next = entry.next;
                }
                else {
                    this._entries[hash] = entry.next;
                }
                return true;
            }
            this._count--;
            this._version++;
            previousEntry = entry;
        }
        return false;
    };
    Dictionary.prototype.get = function (key) {
        var entry = this.findEntry(key);
        if (entry) {
            return entry.value;
        }
        return undefined;
    };
    Dictionary.prototype.has = function (key) {
        return (this.findEntry(key) ? true : false);
    };
    Dictionary.prototype.set = function (key, value) {
        if (!key) {
            throw new Error("key cannot be null or undefined.");
        }
        var hash = this._comparer.getHashCode(key);
        var lastEntryForHash = null;
        for (var entry = this._entries[hash]; entry; entry = entry.next) {
            lastEntryForHash = entry;
            if (entry.hashCode === hash && this._comparer.equals(entry.key, key)) {
                entry.value = value;
                this._version++;
                return;
            }
        }
        this._count++;
        var newEntry = {};
        newEntry.hashCode = hash;
        newEntry.key = key;
        newEntry.value = value;
        if (lastEntryForHash) {
            lastEntryForHash.next = newEntry;
        }
        else {
            this._entries[hash] = newEntry;
        }
        this._version++;
    };
    Dictionary.prototype.findEntry = function (key) {
        if (!key) {
            throw new Error("key cannot be null or undefined.");
        }
        var hash = this._comparer.getHashCode(key);
        for (var entry = this._entries[hash]; entry; entry = entry.next) {
            if (entry.hashCode === hash && this._comparer.equals(entry.key, key)) {
                return entry;
            }
        }
        return null;
    };
    return Dictionary;
})();
exports.Dictionary = Dictionary;
