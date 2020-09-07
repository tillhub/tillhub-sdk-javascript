"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasonsDeleteFailed = exports.ReasonsCreationFailed = exports.ReasonsPutFailed = exports.ReasonsFetchOneFailed = exports.ReasonsFetchFailed = exports.Reasons = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var base_1 = require("../base");
var Reasons = (function (_super) {
    tslib_1.__extends(Reasons, _super);
    function Reasons(options, http) {
        var _this = _super.call(this, http, { endpoint: Reasons.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Reasons.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Reasons.prototype.getAll = function (queryOrOptions) {
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
                            return [2, reject(new ReasonsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new ReasonsFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Reasons.prototype.get = function (reasonId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + reasonId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new ReasonsFetchOneFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new ReasonsFetchOneFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Reasons.prototype.put = function (reasonId, reason) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + reasonId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, reason)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new ReasonsPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Reasons.prototype.create = function (reason) {
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
                        return [4, this.http.getClient().post(uri, reason)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new ReasonsCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Reasons.prototype.delete = function (reasonId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + reasonId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new ReasonsDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new ReasonsDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
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