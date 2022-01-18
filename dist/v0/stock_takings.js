"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTakingsMetaFailed = exports.StockTakingsDeleteFailed = exports.StockTakingsCreationFailed = exports.StockTakingsUpdateFailed = exports.StockTakingsFetchOneFailed = exports.StockTakingsFetchFailed = exports.StockTakings = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var StockTakings = (function (_super) {
    tslib_1.__extends(StockTakings, _super);
    function StockTakings(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: StockTakings.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = StockTakings.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    StockTakings.prototype.create = function (stockTaking) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, stockTaking)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StockTakingsCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new StockTakingsCreationFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    StockTakings.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, baseUri, uri, response_1, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new StockTakingsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        error_2 = _b.sent();
                        throw new StockTakingsFetchFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    StockTakings.prototype.get = function (stockTakingId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUri, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri("/" + stockTakingId);
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StockTakingsFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: 1 }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new StockTakingsFetchOneFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    StockTakings.prototype.update = function (stockTakingId, stockTaking) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + stockTakingId);
                        return [4, this.http.getClient().patch(uri, stockTaking)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StockTakingsUpdateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new StockTakingsUpdateFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    StockTakings.prototype.delete = function (stockTakingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + stockTakingId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StockTakingsDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new StockTakingsDeleteFailed(error_5.message, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    StockTakings.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StockTakingsMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new StockTakingsMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new StockTakingsMetaFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    StockTakings.baseEndpoint = '/api/v0/stock_takings';
    return StockTakings;
}(base_1.ThBaseHandler));
exports.StockTakings = StockTakings;
var StockTakingsFetchFailed = (function (_super) {
    tslib_1.__extends(StockTakingsFetchFailed, _super);
    function StockTakingsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch stock takings'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsFetchFailed';
        Object.setPrototypeOf(_this, StockTakingsFetchFailed.prototype);
        return _this;
    }
    return StockTakingsFetchFailed;
}(errors_1.BaseError));
exports.StockTakingsFetchFailed = StockTakingsFetchFailed;
var StockTakingsFetchOneFailed = (function (_super) {
    tslib_1.__extends(StockTakingsFetchOneFailed, _super);
    function StockTakingsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsFetchOneFailed';
        Object.setPrototypeOf(_this, StockTakingsFetchOneFailed.prototype);
        return _this;
    }
    return StockTakingsFetchOneFailed;
}(errors_1.BaseError));
exports.StockTakingsFetchOneFailed = StockTakingsFetchOneFailed;
var StockTakingsUpdateFailed = (function (_super) {
    tslib_1.__extends(StockTakingsUpdateFailed, _super);
    function StockTakingsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsUpdateFailed';
        Object.setPrototypeOf(_this, StockTakingsUpdateFailed.prototype);
        return _this;
    }
    return StockTakingsUpdateFailed;
}(errors_1.BaseError));
exports.StockTakingsUpdateFailed = StockTakingsUpdateFailed;
var StockTakingsCreationFailed = (function (_super) {
    tslib_1.__extends(StockTakingsCreationFailed, _super);
    function StockTakingsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsCreationFailed';
        Object.setPrototypeOf(_this, StockTakingsCreationFailed.prototype);
        return _this;
    }
    return StockTakingsCreationFailed;
}(errors_1.BaseError));
exports.StockTakingsCreationFailed = StockTakingsCreationFailed;
var StockTakingsDeleteFailed = (function (_super) {
    tslib_1.__extends(StockTakingsDeleteFailed, _super);
    function StockTakingsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete stock taking'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsDeleteFailed';
        Object.setPrototypeOf(_this, StockTakingsDeleteFailed.prototype);
        return _this;
    }
    return StockTakingsDeleteFailed;
}(errors_1.BaseError));
exports.StockTakingsDeleteFailed = StockTakingsDeleteFailed;
var StockTakingsMetaFailed = (function (_super) {
    tslib_1.__extends(StockTakingsMetaFailed, _super);
    function StockTakingsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get meta of stock takings'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StockTakingsMetaFailed';
        Object.setPrototypeOf(_this, StockTakingsMetaFailed.prototype);
        return _this;
    }
    return StockTakingsMetaFailed;
}(errors_1.BaseError));
exports.StockTakingsMetaFailed = StockTakingsMetaFailed;
//# sourceMappingURL=stock_takings.js.map