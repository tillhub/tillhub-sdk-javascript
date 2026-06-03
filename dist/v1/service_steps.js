"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStepDeleteFailed = exports.ServiceStepCreationFailed = exports.ServiceStepPutFailed = exports.ServiceStepFetchFailed = exports.ServiceStepsMetaFailed = exports.ServiceStepsFetchAllFailed = exports.ServiceSteps = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var ServiceSteps = (function (_super) {
    tslib_1.__extends(ServiceSteps, _super);
    function ServiceSteps(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: ServiceSteps.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ServiceSteps.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ServiceSteps.prototype.getAll = function (query) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new ServiceStepsFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ServiceSteps.prototype.meta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/meta');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ServiceStepsMetaFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new ServiceStepsMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    ServiceSteps.prototype.get = function (serviceStepId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceStepId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ServiceStepFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new ServiceStepFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceSteps.prototype.put = function (serviceStepId, serviceStep) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceStepId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, serviceStep)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new ServiceStepPutFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceSteps.prototype.create = function (serviceStep) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, serviceStep)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new ServiceStepCreationFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceSteps.prototype.delete = function (serviceStepId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceStepId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ServiceStepDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new ServiceStepDeleteFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceSteps.baseEndpoint = '/api/v1/service-steps';
    return ServiceSteps;
}(base_1.ThBaseHandler));
exports.ServiceSteps = ServiceSteps;
var ServiceStepsFetchAllFailed = (function (_super) {
    tslib_1.__extends(ServiceStepsFetchAllFailed, _super);
    function ServiceStepsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all service steps'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepsFetchAllFailed';
        Object.setPrototypeOf(_this, ServiceStepsFetchAllFailed.prototype);
        return _this;
    }
    return ServiceStepsFetchAllFailed;
}(baseError_1.BaseError));
exports.ServiceStepsFetchAllFailed = ServiceStepsFetchAllFailed;
var ServiceStepsMetaFailed = (function (_super) {
    tslib_1.__extends(ServiceStepsMetaFailed, _super);
    function ServiceStepsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch service steps meta call'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepsMetaFailed';
        Object.setPrototypeOf(_this, ServiceStepsMetaFailed.prototype);
        return _this;
    }
    return ServiceStepsMetaFailed;
}(baseError_1.BaseError));
exports.ServiceStepsMetaFailed = ServiceStepsMetaFailed;
var ServiceStepFetchFailed = (function (_super) {
    tslib_1.__extends(ServiceStepFetchFailed, _super);
    function ServiceStepFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the service step'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepFetchFailed';
        Object.setPrototypeOf(_this, ServiceStepFetchFailed.prototype);
        return _this;
    }
    return ServiceStepFetchFailed;
}(baseError_1.BaseError));
exports.ServiceStepFetchFailed = ServiceStepFetchFailed;
var ServiceStepPutFailed = (function (_super) {
    tslib_1.__extends(ServiceStepPutFailed, _super);
    function ServiceStepPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the service step'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepPutFailed';
        Object.setPrototypeOf(_this, ServiceStepPutFailed.prototype);
        return _this;
    }
    return ServiceStepPutFailed;
}(baseError_1.BaseError));
exports.ServiceStepPutFailed = ServiceStepPutFailed;
var ServiceStepCreationFailed = (function (_super) {
    tslib_1.__extends(ServiceStepCreationFailed, _super);
    function ServiceStepCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the service step'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepCreationFailed';
        Object.setPrototypeOf(_this, ServiceStepCreationFailed.prototype);
        return _this;
    }
    return ServiceStepCreationFailed;
}(baseError_1.BaseError));
exports.ServiceStepCreationFailed = ServiceStepCreationFailed;
var ServiceStepDeleteFailed = (function (_super) {
    tslib_1.__extends(ServiceStepDeleteFailed, _super);
    function ServiceStepDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the service step'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceStepDeleteFailed';
        Object.setPrototypeOf(_this, ServiceStepDeleteFailed.prototype);
        return _this;
    }
    return ServiceStepDeleteFailed;
}(baseError_1.BaseError));
exports.ServiceStepDeleteFailed = ServiceStepDeleteFailed;
//# sourceMappingURL=service_steps.js.map