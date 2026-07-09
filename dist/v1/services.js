"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDeleteFailed = exports.ServicePutFailed = exports.ServiceCreationFailed = exports.ServiceFetchFailed = exports.ServicesFetchAllFailed = exports.Services = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var ServiceQueryBodyKeys = new Set(['id']);
var Services = (function (_super) {
    tslib_1.__extends(Services, _super);
    function Services(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Services.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Services.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Services.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _b.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: (_a = response.data.results) === null || _a === void 0 ? void 0 : _a.length, cursors: response.data.cursors }
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new ServicesFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Services.prototype.query = function (options) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, splitBodyAndQuery, flat, uri, _e, body, query, postUri, response_1, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        splitBodyAndQuery = function (flat) {
                            var body = {};
                            var query = {};
                            for (var _i = 0, _a = Object.keys(flat); _i < _a.length; _i++) {
                                var key = _a[_i];
                                if (ServiceQueryBodyKeys.has(key)) {
                                    body[key] = flat[key];
                                }
                                else {
                                    query[key] = flat[key];
                                }
                            }
                            return { body: body, query: query };
                        };
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        flat = tslib_1.__assign({}, (options !== null && options !== void 0 ? options : {}));
                        if (flat.query) {
                            flat = tslib_1.__assign(tslib_1.__assign({}, flat), flat.query);
                            delete flat.query;
                        }
                        uri = typeof flat.uri === 'string' ? flat.uri : undefined;
                        if (uri !== undefined) {
                            delete flat.uri;
                        }
                        _e = splitBodyAndQuery(flat), body = _e.body, query = _e.query;
                        postUri = uri !== null && uri !== void 0 ? uri : this.uriHelper.generateUriWithQuery(this.uriHelper.generateBaseUri('/query'), Object.keys(query).length > 0 ? { query: query } : undefined);
                        return [4, this.http.getClient().post(postUri, body)];
                    case 2:
                        response_1 = _f.sent();
                        if (response_1.status !== 200) {
                            throw new ServicesFetchAllFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.query(tslib_1.__assign(tslib_1.__assign({}, options), { uri: response_1.data.cursors.after })); };
                        }
                        return [2, {
                                data: (_b = response_1.data.results) !== null && _b !== void 0 ? _b : [],
                                metadata: {
                                    count: (_d = (_c = response_1.data.results) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0,
                                    cursors: response_1.data.cursors
                                },
                                next: next
                            }];
                    case 3:
                        error_2 = _f.sent();
                        throw new ServicesFetchAllFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Services.prototype.get = function (serviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ServiceFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new ServiceFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Services.prototype.create = function (service) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, service)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new ServiceCreationFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Services.prototype.put = function (serviceId, service) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, service)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new ServicePutFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Services.prototype.delete = function (serviceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ServiceDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new ServiceDeleteFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Services.baseEndpoint = '/api/v1/services';
    return Services;
}(base_1.ThBaseHandler));
exports.Services = Services;
var ServicesFetchAllFailed = (function (_super) {
    tslib_1.__extends(ServicesFetchAllFailed, _super);
    function ServicesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all services'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServicesFetchAllFailed';
        Object.setPrototypeOf(_this, ServicesFetchAllFailed.prototype);
        return _this;
    }
    return ServicesFetchAllFailed;
}(baseError_1.BaseError));
exports.ServicesFetchAllFailed = ServicesFetchAllFailed;
var ServiceFetchFailed = (function (_super) {
    tslib_1.__extends(ServiceFetchFailed, _super);
    function ServiceFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the service'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceFetchFailed';
        Object.setPrototypeOf(_this, ServiceFetchFailed.prototype);
        return _this;
    }
    return ServiceFetchFailed;
}(baseError_1.BaseError));
exports.ServiceFetchFailed = ServiceFetchFailed;
var ServiceCreationFailed = (function (_super) {
    tslib_1.__extends(ServiceCreationFailed, _super);
    function ServiceCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the service'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceCreationFailed';
        Object.setPrototypeOf(_this, ServiceCreationFailed.prototype);
        return _this;
    }
    return ServiceCreationFailed;
}(baseError_1.BaseError));
exports.ServiceCreationFailed = ServiceCreationFailed;
var ServicePutFailed = (function (_super) {
    tslib_1.__extends(ServicePutFailed, _super);
    function ServicePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the service'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServicePutFailed';
        Object.setPrototypeOf(_this, ServicePutFailed.prototype);
        return _this;
    }
    return ServicePutFailed;
}(baseError_1.BaseError));
exports.ServicePutFailed = ServicePutFailed;
var ServiceDeleteFailed = (function (_super) {
    tslib_1.__extends(ServiceDeleteFailed, _super);
    function ServiceDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the service'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceDeleteFailed';
        Object.setPrototypeOf(_this, ServiceDeleteFailed.prototype);
        return _this;
    }
    return ServiceDeleteFailed;
}(baseError_1.BaseError));
exports.ServiceDeleteFailed = ServiceDeleteFailed;
//# sourceMappingURL=services.js.map