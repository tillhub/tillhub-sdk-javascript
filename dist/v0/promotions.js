"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionDeleteFailed = exports.PromotionCreationFailed = exports.PromotionPutFailed = exports.PromotionFetchFailed = exports.PromotionsFetchFailed = exports.Promotions = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Promotions = (function (_super) {
    tslib_1.__extends(Promotions, _super);
    function Promotions(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Promotions.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Promotions.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Promotions.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, error_1;
            var _this = this;
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
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new PromotionsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new PromotionsFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Promotions.prototype.get = function (promotionId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + promotionId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new PromotionFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new PromotionFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Promotions.prototype.put = function (promotionId, promotion) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + promotionId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, promotion)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new PromotionPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Promotions.prototype.create = function (promotion) {
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
                        return [4, this.http.getClient().post(uri, promotion)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new PromotionCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Promotions.prototype.delete = function (promotionId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + promotionId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new PromotionDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new PromotionDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Promotions.baseEndpoint = '/api/v0/promotions';
    return Promotions;
}(base_1.ThBaseHandler));
exports.Promotions = Promotions;
var PromotionsFetchFailed = (function (_super) {
    tslib_1.__extends(PromotionsFetchFailed, _super);
    function PromotionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch promotions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PromotionsFetchFailed';
        Object.setPrototypeOf(_this, PromotionsFetchFailed.prototype);
        return _this;
    }
    return PromotionsFetchFailed;
}(errors_1.BaseError));
exports.PromotionsFetchFailed = PromotionsFetchFailed;
var PromotionFetchFailed = (function (_super) {
    tslib_1.__extends(PromotionFetchFailed, _super);
    function PromotionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch promotion'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PromotionFetchFailed';
        Object.setPrototypeOf(_this, PromotionFetchFailed.prototype);
        return _this;
    }
    return PromotionFetchFailed;
}(errors_1.BaseError));
exports.PromotionFetchFailed = PromotionFetchFailed;
var PromotionPutFailed = (function (_super) {
    tslib_1.__extends(PromotionPutFailed, _super);
    function PromotionPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter promotion'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PromotionPutFailed';
        Object.setPrototypeOf(_this, PromotionPutFailed.prototype);
        return _this;
    }
    return PromotionPutFailed;
}(errors_1.BaseError));
exports.PromotionPutFailed = PromotionPutFailed;
var PromotionCreationFailed = (function (_super) {
    tslib_1.__extends(PromotionCreationFailed, _super);
    function PromotionCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create promotion'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PromotionCreationFailed';
        Object.setPrototypeOf(_this, PromotionCreationFailed.prototype);
        return _this;
    }
    return PromotionCreationFailed;
}(errors_1.BaseError));
exports.PromotionCreationFailed = PromotionCreationFailed;
var PromotionDeleteFailed = (function (_super) {
    tslib_1.__extends(PromotionDeleteFailed, _super);
    function PromotionDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete promotion'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PromotionDeleteFailed';
        Object.setPrototypeOf(_this, PromotionDeleteFailed.prototype);
        return _this;
    }
    return PromotionDeleteFailed;
}(errors_1.BaseError));
exports.PromotionDeleteFailed = PromotionDeleteFailed;
//# sourceMappingURL=promotions.js.map