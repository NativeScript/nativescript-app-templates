var helperModule = require("console/console-native");
var Console = (function () {
    function Console() {
        this.dir = this.dump;
        this._timers = {};
        this._stripFirstTwoLinesRegEx = /^([^\n]*?\n){2}((.|\n)*)$/gmi;
    }
    Console.prototype.sprintf = function (message) {
        var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
        var a = arguments;
        var i = 0;
        var format = a[i++];
        var pad = function (str, len, chr, leftJustify) {
            if (!chr) {
                chr = ' ';
            }
            var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0).join(chr);
            return leftJustify ? str + padding : padding + str;
        };
        var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
            var diff = minWidth - value.length;
            if (diff > 0) {
                if (leftJustify || !zeroPad) {
                    value = pad(value, minWidth, customPadChar, leftJustify);
                }
                else {
                    value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
                }
            }
            return value;
        };
        var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
            var number = value >>> 0;
            prefix = prefix && number && {
                '2': '0b',
                '8': '0',
                '16': '0x'
            }[base] || '';
            value = prefix + pad(number.toString(base), precision || 0, '0', false);
            return justify(value, prefix, leftJustify, minWidth, zeroPad);
        };
        var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
            if (precision != null) {
                value = value.slice(0, precision);
            }
            return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
        };
        var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
            var number, prefix, method, textTransform, value;
            if (substring === '%%') {
                return '%';
            }
            var leftJustify = false;
            var positivePrefix = '';
            var zeroPad = false;
            var prefixBaseX = false;
            var customPadChar = ' ';
            var flagsl = flags.length;
            for (var j = 0; flags && j < flagsl; j++) {
                switch (flags.charAt(j)) {
                    case ' ':
                        positivePrefix = ' ';
                        break;
                    case '+':
                        positivePrefix = '+';
                        break;
                    case '-':
                        leftJustify = true;
                        break;
                    case "'":
                        customPadChar = flags.charAt(j + 1);
                        break;
                    case '0':
                        zeroPad = true;
                        customPadChar = '0';
                        break;
                    case '#':
                        prefixBaseX = true;
                        break;
                }
            }
            if (!minWidth) {
                minWidth = 0;
            }
            else if (minWidth === '*') {
                minWidth = +a[i++];
            }
            else if (minWidth.charAt(0) === '*') {
                minWidth = +a[minWidth.slice(1, -1)];
            }
            else {
                minWidth = +minWidth;
            }
            if (minWidth < 0) {
                minWidth = -minWidth;
                leftJustify = true;
            }
            if (!isFinite(minWidth)) {
                throw new Error('sprintf: (minimum-)width must be finite');
            }
            if (!precision) {
                precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
            }
            else if (precision === '*') {
                precision = +a[i++];
            }
            else if (precision.charAt(0) === '*') {
                precision = +a[precision.slice(1, -1)];
            }
            else {
                precision = +precision;
            }
            value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];
            switch (type) {
                case 's':
                    return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
                case 'c':
                    return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
                case 'b':
                    return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'o':
                    return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'x':
                    return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'X':
                    return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
                case 'u':
                    return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                case 'i':
                case 'd':
                    number = +value || 0;
                    number = Math.round(number - number % 1);
                    prefix = number < 0 ? '-' : positivePrefix;
                    value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                    return justify(value, prefix, leftJustify, minWidth, zeroPad);
                case 'e':
                case 'E':
                case 'f':
                case 'F':
                case 'g':
                case 'G':
                    number = +value;
                    prefix = number < 0 ? '-' : positivePrefix;
                    method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                    textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                    value = prefix + Math.abs(number)[method](precision);
                    return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                default:
                    return substring;
            }
        };
        return format.replace(regex, doFormat);
    };
    Console.prototype.formatParams = function (message) {
        if (arguments.length <= 1) {
            return message ? message : '';
        }
        var res = this.sprintf.apply(this, arguments);
        if (res === message) {
            var args = Array.prototype.slice.call(arguments);
            return args.join(' ');
        }
        return res;
    };
    Console.prototype.time = function (reportName) {
        var name = reportName ? '__' + reportName : '__internal_console_time__';
        if (('undefined' === typeof (this._timers[name])) || (this._timers.hasOwnProperty(name))) {
            this._timers[name] = helperModule.timeMillis();
        }
        else {
            this.warn('invalid name for timer console.time(' + reportName + ')');
        }
    };
    Console.prototype.timeEnd = function (reportName) {
        var name = reportName ? '__' + reportName : '__internal_console_time__';
        if (this._timers.hasOwnProperty(name)) {
            var val = this._timers[name];
            if (val) {
                var time = helperModule.timeMillis();
                this.info('console.time(' + reportName + '): %.6f ms', (time - val));
                this._timers[name] = undefined;
            }
            else {
                this.warn('undefined console.time(' + reportName + ')');
            }
        }
    };
    Console.prototype.assert = function (test, message) {
        var formatParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            formatParams[_i - 2] = arguments[_i];
        }
        if (!test) {
            Array.prototype.shift.apply(arguments);
            helperModule.error(this.formatParams.apply(this, arguments));
        }
    };
    Console.prototype.info = function (message) {
        var formatParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            formatParams[_i - 1] = arguments[_i];
        }
        helperModule.info(this.formatParams.apply(this, arguments));
    };
    Console.prototype.warn = function (message) {
        var formatParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            formatParams[_i - 1] = arguments[_i];
        }
        helperModule.warn(this.formatParams.apply(this, arguments));
    };
    Console.prototype.error = function (message) {
        var formatParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            formatParams[_i - 1] = arguments[_i];
        }
        helperModule.error(this.formatParams.apply(this, arguments));
    };
    Console.prototype.log = function (message) {
        var formatParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            formatParams[_i - 1] = arguments[_i];
        }
        helperModule.helper_log(this.formatParams.apply(this, arguments));
    };
    Console.prototype.trace = function () {
        var stack;
        stack = (new Error()).stack.toString();
        stack = stack.replace(this._stripFirstTwoLinesRegEx, "$2");
        stack = "Stack Trace:\n" + stack;
        this.log(stack);
    };
    Console.prototype.dump = function (obj) {
        if (null == obj) {
            this.log("=== dump(): object is 'null' ===");
            return;
        }
        if ("undefined" === typeof obj) {
            this.log("=== dump(): object is 'undefined' ===");
            return;
        }
        var result = ['=== dump(): dumping members ==='];
        result.push(JSON.stringify(obj, null, 4));
        result.push('=== dump(): dumping function names ===');
        for (var id in obj) {
            try {
                if (typeof (obj[id]) === 'function') {
                    result.push(id + '()');
                }
            }
            catch (err) {
                result.push(id + ': inaccessible');
            }
        }
        result.push('=== dump(): finished ===');
        this.log(result.join('\n'));
    };
    return Console;
})();
exports.Console = Console;
