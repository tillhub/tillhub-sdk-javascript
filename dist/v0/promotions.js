"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionDeleteFailed = exports.PromotionCreationFailed = exports.PromotionPutFailed = exports.PromotionFetchFailed = exports.PromotionsFetchFailed = exports.Promotions = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Promotions = (function (_super) {
    tslib_1.__extends(Promotions, _super);
    function Promotions(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Promotions.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Promotions.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Promotions.prototype.getAll = function (queryOrOptions) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new PromotionsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new PromotionsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Promotions.prototype.get = function (promotionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + promotionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PromotionFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new PromotionFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Promotions.prototype.put = function (promotionId, promotion) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + promotionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, promotion)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new PromotionPutFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Promotions.prototype.create = function (promotion) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, promotion)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new PromotionCreationFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Promotions.prototype.delete = function (promotionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + promotionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new PromotionDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new PromotionDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
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