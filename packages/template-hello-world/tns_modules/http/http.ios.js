var promises = require("promises/promises");

require("utils/module-merge").merge(require("http/http-common"), exports);

function request(options) {
    var d = promises.defer();

    try  {
        var sessionConfig = Foundation.NSURLSessionConfiguration.defaultSessionConfiguration();
        var queue = Foundation.NSOperationQueue.mainQueue();
        var session = Foundation.NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, null, queue);

        var urlRequest = Foundation.NSMutableURLRequest.requestWithURL(Foundation.NSURL.URLWithString(options.url));

        urlRequest.setHTTPMethod(typeof options.method !== "undefined" ? options.method : "GET");

        if (options.headers) {
            for (var header in options.headers) {
                urlRequest.setValueForHTTPHeaderField(options.headers[header], header);
            }
        }

        if (typeof options.timeout == "number") {
            urlRequest.setTimeoutInterval(options.timeout * 1000);
        }

        if (typeof options.content == "string") {
            urlRequest.setHTTPBody(Foundation.NSString.initWithString(options.content).dataUsingEncoding(4));
        } else {
            urlRequest.setHTTPBody(options.content);
        }

        var dataTask = session.dataTaskWithRequestCompletionHandler(urlRequest, function (data, response, error) {
            if (error) {
                d.reject(new Error(error.localizedDescription()));
            } else {
                var headers = {};
                var headerFields = response.allHeaderFields();
                var keys = headerFields.allKeys();

                for (var i = 0, l = keys.count(); i < l; i++) {
                    var key = keys.objectAtIndex(i);
                    headers[key] = headerFields.valueForKey(key);
                }

                d.resolve({
                    content: {
                        raw: data,
                        toString: function () {
                            return NSDataToString(data);
                        },
                        toJSON: function () {
                            return JSON.parse(NSDataToString(data));
                        },
                        toImage: function () {
                            return require("image-source").fromData(data);
                        }
                    },
                    statusCode: response.statusCode(),
                    headers: headers
                });
            }
        });

        dataTask.resume();
    } catch (ex) {
        d.reject(ex);
    }
    return d.promise();
}
exports.request = request;

function NSDataToString(data) {
    return Foundation.NSString.initWithDataEncoding(data, 4).toString();
}
//# sourceMappingURL=http.ios.js.map
