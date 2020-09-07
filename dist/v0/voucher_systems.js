"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherSystemDeleteFailed = exports.VoucherSystemCreationFailed = exports.VoucherSystemPutFailed = exports.VoucherSystemFetchFailed = exports.VoucherSystemsFetchFailed = exports.VoucherSystems = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var VoucherSystems = (function (_super) {
    tslib_1.__extends(VoucherSystems, _super);
    function VoucherSystems(options, http) {
        var _this = _super.call(this, http, {
            endpoint: VoucherSystems.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = VoucherSystems.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    VoucherSystems.prototype.getAll = function (queryOrOptions) {
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
                            return [2, reject(new VoucherSystemsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new VoucherSystemsFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    VoucherSystems.prototype.get = function (voucherSystemId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + voucherSystemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new VoucherSystemFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new VoucherSystemFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    VoucherSystems.prototype.put = function (voucherSystemId, voucherSystemGroup) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + voucherSystemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, voucherSystemGroup)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new VoucherSystemPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    VoucherSystems.prototype.create = function (voucherSystemGroup) {
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
                        return [4, this.http.getClient().post(uri, voucherSystemGroup)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new VoucherSystemCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    VoucherSystems.prototype.delete = function (voucherSystemId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + voucherSystemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new VoucherSystemDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new VoucherSystemDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    VoucherSystems.baseEndpoint = '/api/v0/loyalty/voucher_systems';
    return VoucherSystems;
}(base_1.ThBaseHandler));
exports.VoucherSystems = VoucherSystems;
var VoucherSystemsFetchFailed = (function (_super) {
    tslib_1.__extends(VoucherSystemsFetchFailed, _super);
    function VoucherSystemsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch voucher systems'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherSystemsFetchFailed';
        Object.setPrototypeOf(_this, VoucherSystemsFetchFailed.prototype);
        return _this;
    }
    return VoucherSystemsFetchFailed;
}(errors_1.BaseError));
exports.VoucherSystemsFetchFailed = VoucherSystemsFetchFailed;
var VoucherSystemFetchFailed = (function (_super) {
    tslib_1.__extends(VoucherSystemFetchFailed, _super);
    function VoucherSystemFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch voucher system'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherSystemFetchFailed';
        Object.setPrototypeOf(_this, VoucherSystemFetchFailed.prototype);
        return _this;
    }
    return VoucherSystemFetchFailed;
}(errors_1.BaseError));
exports.VoucherSystemFetchFailed = VoucherSystemFetchFailed;
var VoucherSystemPutFailed = (function (_super) {
    tslib_1.__extends(VoucherSystemPutFailed, _super);
    function VoucherSystemPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter voucher system'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherSystemhPutFailed';
        Object.setPrototypeOf(_this, VoucherSystemPutFailed.prototype);
        return _this;
    }
    return VoucherSystemPutFailed;
}(errors_1.BaseError));
exports.VoucherSystemPutFailed = VoucherSystemPutFailed;
var VoucherSystemCreationFailed = (function (_super) {
    tslib_1.__extends(VoucherSystemCreationFailed, _super);
    function VoucherSystemCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create voucher system'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherSystemCreationFailed';
        Object.setPrototypeOf(_this, VoucherSystemCreationFailed.prototype);
        return _this;
    }
    return VoucherSystemCreationFailed;
}(errors_1.BaseError));
exports.VoucherSystemCreationFailed = VoucherSystemCreationFailed;
var VoucherSystemDeleteFailed = (function (_super) {
    tslib_1.__extends(VoucherSystemDeleteFailed, _super);
    function VoucherSystemDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete voucher system'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherSystemDeleteFailed';
        Object.setPrototypeOf(_this, VoucherSystemDeleteFailed.prototype);
        return _this;
    }
    return VoucherSystemDeleteFailed;
}(errors_1.BaseError));
exports.VoucherSystemDeleteFailed = VoucherSystemDeleteFailed;
//# sourceMappingURL=voucher_systems.js.map