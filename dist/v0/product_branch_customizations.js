"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBranchCustomizations = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors/productBranchCustomizations"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ProductBranchCustomizations = (function (_super) {
    tslib_1.__extends(ProductBranchCustomizations, _super);
    function ProductBranchCustomizations(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: ProductBranchCustomizations.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ProductBranchCustomizations.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ProductBranchCustomizations.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/branch/customizations');
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
                        throw new errors.ProductBranchCustomizationsFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductBranchCustomizations.prototype.create = function (productBranchCustomization) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/branch/customizations');
                        return [4, this.http.getClient().post(uri, productBranchCustomization)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.ProductBranchCustomizationCreationFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductBranchCustomizations.prototype.put = function (productBranchCustomizationId, productBranchCustomization) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/branch/customizations/" + productBranchCustomizationId);
                        return [4, this.http.getClient().put(uri, productBranchCustomization)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ProductBranchCustomizationPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.ProductBranchCustomizationPutFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductBranchCustomizations.prototype.delete = function (productBranchCustomizationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/branch/customizations/" + productBranchCustomizationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.ProductBranchCustomizationDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new errors.ProductBranchCustomizationDeleteFailed();
                    case 4: return [2];
                }
            });
        });
    };
    ProductBranchCustomizations.baseEndpoint = '/api/v1/products';
    return ProductBranchCustomizations;
}(base_1.ThBaseHandler));
exports.ProductBranchCustomizations = ProductBranchCustomizations;
//# sourceMappingURL=product_branch_customizations.js.map