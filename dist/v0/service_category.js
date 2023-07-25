"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryCreationFailed = exports.ServiceCategory = void 0;
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
    ServiceCategory.prototype.getAll = function (query) {
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
                        throw new ServiceCategoriesFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ServiceCategory.prototype.create = function (serviceCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
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
                        error_2 = _a.sent();
                        throw new ServiceCategoryCreationFailed(error_2.message, { error: error_2 });
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
//# sourceMappingURL=service_category.js.map