"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasonsDeleteFailed = exports.ReasonsCreationFailed = exports.ReasonsPutFailed = exports.ReasonsFetchOneFailed = exports.ReasonsFetchFailed = exports.Reasons = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var Reasons = (function (_super) {
    tslib_1.__extends(Reasons, _super);
    function Reasons(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: Reasons.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Reasons.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Reasons.prototype.getAll = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ReasonsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ReasonsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Reasons.prototype.get = function (reasonId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + reasonId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ReasonsFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new ReasonsFetchOneFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Reasons.prototype.put = function (reasonId, reason) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + reasonId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, reason)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new ReasonsPutFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Reasons.prototype.create = function (reason) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, reason)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new ReasonsCreationFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Reasons.prototype.delete = function (reasonId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + reasonId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ReasonsDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new ReasonsDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Reasons.baseEndpoint = '/api/v0/reasons';
    return Reasons;
}(base_1.ThBaseHandler));
exports.Reasons = Reasons;
var ReasonsFetchFailed = (function (_super) {
    tslib_1.__extends(ReasonsFetchFailed, _super);
    function ReasonsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch reasons'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReasonsFetchFailed';
        Object.setPrototypeOf(_this, ReasonsFetchFailed.prototype);
        return _this;
    }
    return ReasonsFetchFailed;
}(errors_1.BaseError));
exports.ReasonsFetchFailed = ReasonsFetchFailed;
var ReasonsFetchOneFailed = (function (_super) {
    tslib_1.__extends(ReasonsFetchOneFailed, _super);
    function ReasonsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one reason'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReasonsFetchOneFailed';
        Object.setPrototypeOf(_this, ReasonsFetchOneFailed.prototype);
        return _this;
    }
    return ReasonsFetchOneFailed;
}(errors_1.BaseError));
exports.ReasonsFetchOneFailed = ReasonsFetchOneFailed;
var ReasonsPutFailed = (function (_super) {
    tslib_1.__extends(ReasonsPutFailed, _super);
    function ReasonsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update reason'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReasonsPutFailed';
        Object.setPrototypeOf(_this, ReasonsPutFailed.prototype);
        return _this;
    }
    return ReasonsPutFailed;
}(errors_1.BaseError));
exports.ReasonsPutFailed = ReasonsPutFailed;
var ReasonsCreationFailed = (function (_super) {
    tslib_1.__extends(ReasonsCreationFailed, _super);
    function ReasonsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create reasons'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReasonsCreationFailed';
        Object.setPrototypeOf(_this, ReasonsCreationFailed.prototype);
        return _this;
    }
    return ReasonsCreationFailed;
}(errors_1.BaseError));
exports.ReasonsCreationFailed = ReasonsCreationFailed;
var ReasonsDeleteFailed = (function (_super) {
    tslib_1.__extends(ReasonsDeleteFailed, _super);
    function ReasonsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete reasons'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReasonsDeleteFailed';
        Object.setPrototypeOf(_this, ReasonsDeleteFailed.prototype);
        return _this;
    }
    return ReasonsDeleteFailed;
}(errors_1.BaseError));
exports.ReasonsDeleteFailed = ReasonsDeleteFailed;
//# sourceMappingURL=reasons.js.map