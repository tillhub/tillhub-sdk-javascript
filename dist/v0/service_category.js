"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryPutFailed = exports.ServiceCategoryCreationFailed = exports.ServiceCategory = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var ServiceCategory = (function (_super) {
    tslib_1.__extends(ServiceCategory, _super);
    function ServiceCategory(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: ServiceCategory.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ServiceCategory.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ServiceCategory.prototype.create = function (serviceCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
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
                        error_1 = _a.sent();
                        throw new ServiceCategoryCreationFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceCategory.prototype.put = function (serviceCategoryId, serviceCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
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
                        error_2 = _a.sent();
                        throw new ServiceCategoryPutFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    ServiceCategory.baseEndpoint = '/api/v0/service_categories';
    return ServiceCategory;
}(base_1.ThBaseHandler));
exports.ServiceCategory = ServiceCategory;
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
//# sourceMappingURL=service_category.js.map