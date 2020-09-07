"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontsDeleteFailed = exports.StorefrontsCreationFailed = exports.StorefrontsPutFailed = exports.StorefrontsFetchOneFailed = exports.StorefrontsFetchFailed = exports.Storefronts = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var base_1 = require("../base");
var Storefronts = (function (_super) {
    tslib_1.__extends(Storefronts, _super);
    function Storefronts(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Storefronts.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Storefronts.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Storefronts.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(tslib_1.__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new StorefrontsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new StorefrontsFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Storefronts.prototype.get = function (storefrontId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + storefrontId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StorefrontsFetchOneFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new StorefrontsFetchOneFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Storefronts.prototype.put = function (storefrontId, storefront) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + storefrontId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new StorefrontsPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Storefronts.prototype.create = function (storefront) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new StorefrontsCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Storefronts.prototype.delete = function (storefrontId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + storefrontId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StorefrontsDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new StorefrontsDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Storefronts.baseEndpoint = '/api/v0/storefronts';
    return Storefronts;
}(base_1.ThBaseHandler));
exports.Storefronts = Storefronts;
var StorefrontsFetchFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchFailed, _super);
    function StorefrontsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchFailed.prototype);
        return _this;
    }
    return StorefrontsFetchFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchFailed = StorefrontsFetchFailed;
var StorefrontsFetchOneFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchOneFailed, _super);
    function StorefrontsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchOneFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchOneFailed.prototype);
        return _this;
    }
    return StorefrontsFetchOneFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchOneFailed = StorefrontsFetchOneFailed;
var StorefrontsPutFailed = (function (_super) {
    tslib_1.__extends(StorefrontsPutFailed, _super);
    function StorefrontsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsPutFailed';
        Object.setPrototypeOf(_this, StorefrontsPutFailed.prototype);
        return _this;
    }
    return StorefrontsPutFailed;
}(errors_1.BaseError));
exports.StorefrontsPutFailed = StorefrontsPutFailed;
var StorefrontsCreationFailed = (function (_super) {
    tslib_1.__extends(StorefrontsCreationFailed, _super);
    function StorefrontsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsCreationFailed';
        Object.setPrototypeOf(_this, StorefrontsCreationFailed.prototype);
        return _this;
    }
    return StorefrontsCreationFailed;
}(errors_1.BaseError));
exports.StorefrontsCreationFailed = StorefrontsCreationFailed;
var StorefrontsDeleteFailed = (function (_super) {
    tslib_1.__extends(StorefrontsDeleteFailed, _super);
    function StorefrontsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsDeleteFailed';
        Object.setPrototypeOf(_this, StorefrontsDeleteFailed.prototype);
        return _this;
    }
    return StorefrontsDeleteFailed;
}(errors_1.BaseError));
exports.StorefrontsDeleteFailed = StorefrontsDeleteFailed;
//# sourceMappingURL=storefronts.js.map