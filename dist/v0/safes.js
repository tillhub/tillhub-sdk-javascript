"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafesLogBook = exports.Safes = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors/safes"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Safes = (function (_super) {
    tslib_1.__extends(Safes, _super);
    function Safes(options, http) {
        var _this = _super.call(this, http, { endpoint: Safes.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Safes.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Safes.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new errors.SafesFetchAllFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Safes.prototype.get = function (safeId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + safeId);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.SafesFetchOneFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2, reject(new errors.SafesFetchOneFailed(undefined, { error: error_2 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Safes.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/meta");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            reject(new errors.SafesGetMetaFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2, reject(new errors.SafesGetMetaFailed(undefined, { error: error_3 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Safes.prototype.create = function (safe) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, safe)];
                    case 1:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_4 = _a.sent();
                        return [2, reject(new errors.SafesCreationFailed(undefined, { error: error_4 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Safes.prototype.put = function (safeId, safe) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + safeId);
                        return [4, this.http.getClient().put(uri, safe)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.SafesPutFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_5 = _a.sent();
                        return [2, reject(new errors.SafesPutFailed(undefined, { error: error_5 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Safes.prototype.book = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/book");
                        return [4, this.http.getClient().post(uri, body)];
                    case 1:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data,
                                msg: response.data.msg
                            })];
                    case 2:
                        error_6 = _a.sent();
                        return [2, reject(new errors.SafesBookFailed(error_6.msg, { error: error_6 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Safes.baseEndpoint = '/api/v0/safes';
    return Safes;
}(base_1.ThBaseHandler));
exports.Safes = Safes;
var SafesLogBook = (function (_super) {
    tslib_1.__extends(SafesLogBook, _super);
    function SafesLogBook(options, http) {
        var _this = _super.call(this, http, {
            endpoint: SafesLogBook.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = SafesLogBook.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    SafesLogBook.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_2, error_7;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/logs');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _a.sent();
                        if (response_2.data.cursor && response_2.data.cursor.next) {
                            next = function () {
                                return _this.getAll({ uri: response_2.data.cursor.next });
                            };
                        }
                        return [2, resolve({
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count, cursor: response_2.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_7 = _a.sent();
                        return [2, reject(new errors.SafesLogBookFetchAllFailed(undefined, { error: error_7 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    SafesLogBook.prototype.meta = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/logs/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            reject(new errors.SafesLogBookGetMetaFailed());
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.results[0].count }
                            })];
                    case 2:
                        error_8 = _a.sent();
                        return [2, reject(new errors.SafesLogBookGetMetaFailed(undefined, { error: error_8 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    SafesLogBook.baseEndpoint = '/api/v0/safes';
    return SafesLogBook;
}(base_1.ThBaseHandler));
exports.SafesLogBook = SafesLogBook;
//# sourceMappingURL=safes.js.map