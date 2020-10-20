"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionDeleteFailed = exports.FunctionCreationFailed = exports.FunctionPutFailed = exports.FunctionFetchFailed = exports.FunctionsFetchFailed = exports.Functions = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Functions = /** @class */ (function (_super) {
    tslib_1.__extends(Functions, _super);
    function Functions(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Functions.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Functions.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Functions.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new FunctionsFetchFailed(undefined, { error: error_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Functions.prototype.get = function (functionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + functionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new FunctionFetchFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new FunctionFetchFailed(undefined, { error: error_2 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Functions.prototype.put = function (functionId, fn) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + functionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, fn)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new FunctionPutFailed(undefined, { error: error_3 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Functions.prototype.create = function (fn) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, fn)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new FunctionCreationFailed(undefined, { error: error_4 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Functions.prototype.delete = function (functionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + functionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new FunctionDeleteFailed();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new FunctionDeleteFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Functions.baseEndpoint = '/api/v0/functions';
    return Functions;
}(base_1.ThBaseHandler));
exports.Functions = Functions;
var FunctionsFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(FunctionsFetchFailed, _super);
    function FunctionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch functions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FunctionsFetchFailed';
        Object.setPrototypeOf(_this, FunctionsFetchFailed.prototype);
        return _this;
    }
    return FunctionsFetchFailed;
}(errors_1.BaseError));
exports.FunctionsFetchFailed = FunctionsFetchFailed;
var FunctionFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(FunctionFetchFailed, _super);
    function FunctionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch function'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FunctionFetchFailed';
        Object.setPrototypeOf(_this, FunctionFetchFailed.prototype);
        return _this;
    }
    return FunctionFetchFailed;
}(errors_1.BaseError));
exports.FunctionFetchFailed = FunctionFetchFailed;
var FunctionPutFailed = /** @class */ (function (_super) {
    tslib_1.__extends(FunctionPutFailed, _super);
    function FunctionPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter function'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FunctionPutFailed';
        Object.setPrototypeOf(_this, FunctionPutFailed.prototype);
        return _this;
    }
    return FunctionPutFailed;
}(errors_1.BaseError));
exports.FunctionPutFailed = FunctionPutFailed;
var FunctionCreationFailed = /** @class */ (function (_super) {
    tslib_1.__extends(FunctionCreationFailed, _super);
    function FunctionCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create function'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FunctionCreationFailed';
        Object.setPrototypeOf(_this, FunctionCreationFailed.prototype);
        return _this;
    }
    return FunctionCreationFailed;
}(errors_1.BaseError));
exports.FunctionCreationFailed = FunctionCreationFailed;
var FunctionDeleteFailed = /** @class */ (function (_super) {
    tslib_1.__extends(FunctionDeleteFailed, _super);
    function FunctionDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete function'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FunctionDeleteFailed';
        Object.setPrototypeOf(_this, FunctionDeleteFailed.prototype);
        return _this;
    }
    return FunctionDeleteFailed;
}(errors_1.BaseError));
exports.FunctionDeleteFailed = FunctionDeleteFailed;
//# sourceMappingURL=functions.js.map