"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryDeleteFailed = exports.ServiceCategoryPutFailed = exports.ServiceCategoryCreationFailed = exports.ServiceCategoryFetchFailed = exports.ServiceCategoriesFetchAllFailed = exports.ServiceCategories = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var ServiceCategories = (function (_super) {
    tslib_1.__extends(ServiceCategories, _super);
    function ServiceCategories(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: ServiceCategories.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ServiceCategories.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ServiceCategories.prototype.getAll = function (query) {
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
                        throw new ServiceCategoriesFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ServiceCategories.prototype.get = function (serviceCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceCategoryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ServiceCategoryFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new ServiceCategoryFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceCategories.prototype.create = function (serviceCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, serviceCategory)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new ServiceCategoryCreationFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceCategories.prototype.put = function (serviceCategoryId, serviceCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceCategoryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, serviceCategory)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new ServiceCategoryPutFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceCategories.prototype.delete = function (serviceCategoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + serviceCategoryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ServiceCategoryDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new ServiceCategoryDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceCategories.baseEndpoint = '/api/v1/service-categories';
    return ServiceCategories;
}(base_1.ThBaseHandler));
exports.ServiceCategories = ServiceCategories;
var ServiceCategoriesFetchAllFailed = (function (_super) {
    tslib_1.__extends(ServiceCategoriesFetchAllFailed, _super);
    function ServiceCategoriesFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all service categories'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceCategoriesFetchAllFailed';
        Object.setPrototypeOf(_this, ServiceCategoriesFetchAllFailed.prototype);
        return _this;
    }
    return ServiceCategoriesFetchAllFailed;
}(baseError_1.BaseError));
exports.ServiceCategoriesFetchAllFailed = ServiceCategoriesFetchAllFailed;
var ServiceCategoryFetchFailed = (function (_super) {
    tslib_1.__extends(ServiceCategoryFetchFailed, _super);
    function ServiceCategoryFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the service category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceCategoryFetchFailed';
        Object.setPrototypeOf(_this, ServiceCategoryFetchFailed.prototype);
        return _this;
    }
    return ServiceCategoryFetchFailed;
}(baseError_1.BaseError));
exports.ServiceCategoryFetchFailed = ServiceCategoryFetchFailed;
var ServiceCategoryCreationFailed = (function (_super) {
    tslib_1.__extends(ServiceCategoryCreationFailed, _super);
    function ServiceCategoryCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the service category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceCategoryCreationFailed';
        Object.setPrototypeOf(_this, ServiceCategoryCreationFailed.prototype);
        return _this;
    }
    return ServiceCategoryCreationFailed;
}(baseError_1.BaseError));
exports.ServiceCategoryCreationFailed = ServiceCategoryCreationFailed;
var ServiceCategoryPutFailed = (function (_super) {
    tslib_1.__extends(ServiceCategoryPutFailed, _super);
    function ServiceCategoryPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the service category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceCategoryPutFailed';
        Object.setPrototypeOf(_this, ServiceCategoryPutFailed.prototype);
        return _this;
    }
    return ServiceCategoryPutFailed;
}(baseError_1.BaseError));
exports.ServiceCategoryPutFailed = ServiceCategoryPutFailed;
var ServiceCategoryDeleteFailed = (function (_super) {
    tslib_1.__extends(ServiceCategoryDeleteFailed, _super);
    function ServiceCategoryDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the service category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceCategoryDeleteFailed';
        Object.setPrototypeOf(_this, ServiceCategoryDeleteFailed.prototype);
        return _this;
    }
    return ServiceCategoryDeleteFailed;
}(baseError_1.BaseError));
exports.ServiceCategoryDeleteFailed = ServiceCategoryDeleteFailed;
//# sourceMappingURL=service_categories.js.map