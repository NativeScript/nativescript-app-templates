function defer() {
    return new DeferredI();
}
exports.defer = defer;

function resolve(v) {
    return exports.defer().resolve(v).promise();
}
exports.resolve = resolve;

function reject(err) {
    return exports.defer().reject(err).promise();
}
exports.reject = reject;

function unfold(unspool, seed) {
    var d = exports.defer();
    var elements = new Array();

    unfoldCore(elements, d, unspool, seed);

    return d.promise();
}
exports.unfold = unfold;

function unfoldCore(elements, deferred, unspool, seed) {
    var result = unspool(seed);
    if (!result) {
        deferred.resolve(elements);
        return;
    }

    while (result.next && result.promise.status == 2 /* Resolved */) {
        elements.push(result.promise.result);
        result = unspool(result.next);
        if (!result) {
            deferred.resolve(elements);
            return;
        }
    }

    result.promise.done(function (v) {
        elements.push(v);
        if (!result.next)
            deferred.resolve(elements);
        else
            unfoldCore(elements, deferred, unspool, result.next);
    }).fail(function (e) {
        deferred.reject(e);
    });
}

(function (Status) {
    Status[Status["Unfulfilled"] = 0] = "Unfulfilled";
    Status[Status["Rejected"] = 1] = "Rejected";
    Status[Status["Resolved"] = 2] = "Resolved";
})(exports.Status || (exports.Status = {}));
var Status = exports.Status;





function when() {
    var promises = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        promises[_i] = arguments[_i + 0];
    }
    var allDone = exports.defer();
    if (!promises.length) {
        allDone.resolve([]);
        return allDone.promise();
    }

    var resolved = 0;
    var results = [];

    promises.forEach(function (p, i) {
        p.done(function (v) {
            results[i] = v;
            ++resolved;
            if (resolved === promises.length && allDone.status !== 1 /* Rejected */)
                allDone.resolve(results);
        }).fail(function (e) {
            if (allDone.status !== 1 /* Rejected */)
                allDone.reject(new Error("when: one or more promises were rejected"));
        });
    });

    return allDone.promise();
}
exports.when = when;

var PromiseI = (function () {
    function PromiseI(deferred) {
        this.deferred = deferred;
    }
    Object.defineProperty(PromiseI.prototype, "status", {
        get: function () {
            return this.deferred.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromiseI.prototype, "result", {
        get: function () {
            return this.deferred.result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromiseI.prototype, "error", {
        get: function () {
            return this.deferred.error;
        },
        enumerable: true,
        configurable: true
    });

    PromiseI.prototype.done = function (f) {
        this.deferred.done(f);
        return this;
    };

    PromiseI.prototype.fail = function (f) {
        this.deferred.fail(f);
        return this;
    };

    PromiseI.prototype.always = function (f) {
        this.deferred.always(f);
        return this;
    };

    PromiseI.prototype.then = function (f) {
        return this.deferred.then(f);
    };
    return PromiseI;
})();

var DeferredI = (function () {
    function DeferredI() {
        this._resolved = function (_) {
        };
        this._rejected = function (_) {
        };
        this._status = 0 /* Unfulfilled */;
        this._error = { message: "" };
        this._promise = new PromiseI(this);
    }
    DeferredI.prototype.promise = function () {
        return this._promise;
    };

    Object.defineProperty(DeferredI.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DeferredI.prototype, "result", {
        get: function () {
            if (this._status != 2 /* Resolved */)
                throw new Error("Promise: result not available");
            return this._result;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(DeferredI.prototype, "error", {
        get: function () {
            if (this._status != 1 /* Rejected */)
                throw new Error("Promise: rejection reason not available");
            return this._error;
        },
        enumerable: true,
        configurable: true
    });

    DeferredI.prototype.then = function (f) {
        var d = exports.defer();

        this.done(function (v) {
            var promiseOrValue = f(v);

            if (promiseOrValue instanceof PromiseI) {
                var p = promiseOrValue;
                p.done(function (v2) {
                    return d.resolve(v2);
                }).fail(function (err) {
                    return d.reject(err);
                });
                return p;
            }

            d.resolve(promiseOrValue);
        }).fail(function (err) {
            return d.reject(err);
        });

        return d.promise();
    };

    DeferredI.prototype.done = function (f) {
        if (this.status === 2 /* Resolved */) {
            f(this._result);
            return this;
        }

        if (this.status !== 0 /* Unfulfilled */)
            return this;

        var prev = this._resolved;
        this._resolved = function (v) {
            prev(v);
            f(v);
        };

        return this;
    };

    DeferredI.prototype.fail = function (f) {
        if (this.status === 1 /* Rejected */) {
            f(this._error);
            return this;
        }

        if (this.status !== 0 /* Unfulfilled */)
            return this;

        var prev = this._rejected;
        this._rejected = function (e) {
            prev(e);
            f(e);
        };

        return this;
    };

    DeferredI.prototype.always = function (f) {
        this.done(function (v) {
            return f(v);
        }).fail(function (err) {
            return f(null, err);
        });

        return this;
    };

    DeferredI.prototype.resolve = function (result) {
        if (this._status !== 0 /* Unfulfilled */)
            throw new Error("tried to resolve a fulfilled promise");

        this._result = result;
        this._status = 2 /* Resolved */;
        this._resolved(result);

        this.detach();
        return this;
    };

    DeferredI.prototype.reject = function (err) {
        if (this._status !== 0 /* Unfulfilled */)
            throw new Error("tried to reject a fulfilled promise");

        this._error = err;
        this._status = 1 /* Rejected */;
        this._rejected(err);

        this.detach();
        return this;
    };

    DeferredI.prototype.detach = function () {
        this._resolved = function (_) {
        };
        this._rejected = function (_) {
        };
    };
    return DeferredI;
})();


function generator(g) {
    return function () {
        return exports.iterator(g());
    };
}
exports.generator = generator;
;

function iterator(f) {
    return new IteratorI(f);
}
exports.iterator = iterator;

var IteratorI = (function () {
    function IteratorI(f) {
        this.f = f;
        this.current = undefined;
    }
    IteratorI.prototype.advance = function () {
        var _this = this;
        var res = this.f();
        return res.then(function (value) {
            if (exports.isUndefined(value))
                return false;

            _this.current = value;
            return true;
        });
    };
    return IteratorI;
})();

function each(gen, f) {
    var d = exports.defer();
    eachCore(d, gen(), f);
    return d.promise();
}
exports.each = each;

function eachCore(fin, it, f) {
    it.advance().done(function (hasValue) {
        if (!hasValue) {
            fin.resolve({});
            return;
        }

        f(it.current);
        eachCore(fin, it, f);
    }).fail(function (err) {
        return fin.reject(err);
    });
}

function isUndefined(v) {
    return typeof v === 'undefined';
}
exports.isUndefined = isUndefined;
//# sourceMappingURL=promises.js.map
