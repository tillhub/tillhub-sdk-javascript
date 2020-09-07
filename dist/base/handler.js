"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThAnalyticsBaseHandler = exports.ThBaseHandler = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var ThBaseHandler = (function () {
    function ThBaseHandler(http, handlerOptions) {
        this.client = http;
        this.handlerOptions = handlerOptions;
    }
    return ThBaseHandler;
}());
exports.ThBaseHandler = ThBaseHandler;
var ThAnalyticsBaseHandler = (function () {
    function ThAnalyticsBaseHandler(http, handlerOptions) {
        this.client = http;
        this.handlerOptions = handlerOptions;
    }
    ThAnalyticsBaseHandler.generateAuthenticatedInstance = function (type, options, http) {
        return new type(options, http);
    };
    ThAnalyticsBaseHandler.generateUriWithQuery = function (basePath, query) {
        var uri;
        if (!query) {
            uri = "" + basePath;
        }
        else if (query.uri || (query.query && query.query.uri)) {
            uri = query.uri || query.query.uri;
        }
        else if (query.query) {
            var flattenedQuery = Object.assign({}, query, query.query);
            flattenedQuery.query = undefined;
            uri = "" + basePath + (flattenedQuery ? qs_1.default.stringify(flattenedQuery, { addQueryPrefix: true }) : '');
        }
        else {
            uri = "" + basePath + (query ? qs_1.default.stringify(query, { addQueryPrefix: true }) : '');
        }
        return uri;
    };
    ThAnalyticsBaseHandler.prototype.handleGet = function (url, query, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = tslib_1.__assign({ method: 'GET', url: ThAnalyticsBaseHandler.generateUriWithQuery(url, query) }, requestOptions);
                        return [4, this.client.getClient()(opts)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                status: response.status,
                                next: response.data.cursor && response.data.cursor.next ? response.data.cursor.next : undefined,
                                results: response.data.results
                            }];
                }
            });
        });
    };
    ThAnalyticsBaseHandler.prototype.handleExport = function (url, query, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opts, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = tslib_1.__assign({ method: 'GET', url: ThAnalyticsBaseHandler.generateUriWithQuery(url, query) }, requestOptions);
                        return [4, this.client.getClient()(opts)];
                    case 1:
                        response = _a.sent();
                        return [2, tslib_1.__assign({}, response.data.results[0])];
                }
            });
        });
    };
    return ThAnalyticsBaseHandler;
}());
exports.ThAnalyticsBaseHandler = ThAnalyticsBaseHandler;
//# sourceMappingURL=handler.js.map