"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAddonGroups = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors/productAddonGroups"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ProductAddonGroups = (function (_super) {
    tslib_1.__extends(ProductAddonGroups, _super);
    function ProductAddonGroups(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: ProductAddonGroups.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ProductAddonGroups.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ProductAddonGroups.prototype.getAll = function (query) {
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
                        throw new errors.ProductAddonGroupsFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddonGroups.prototype.get = function (productAddonGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + productAddonGroupId);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ProductAddonGroupFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.ProductAddonGroupFetchOneFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddonGroups.prototype.meta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/meta');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.ProductAddonGroupsGetMetaFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.ProductAddonGroupsGetMetaFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddonGroups.prototype.create = function (productAddonGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, productAddonGroup)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new errors.ProductAddonGroupCreationFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddonGroups.prototype.put = function (productAddonGroupId, productAddonGroup) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + productAddonGroupId);
                        return [4, this.http.getClient().put(uri, productAddonGroup)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ProductAddonGroupPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new errors.ProductAddonGroupPutFailed(error_5.message, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddonGroups.prototype.delete = function (productAddonGroupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productAddonGroupId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.ProductAddonGroupDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new errors.ProductAddonGroupDeleteFailed();
                    case 4: return [2];
                }
            });
        });
    };
    ProductAddonGroups.baseEndpoint = '/api/v0/product_addon_groups';
    return ProductAddonGroups;
}(base_1.ThBaseHandler));
exports.ProductAddonGroups = ProductAddonGroups;
//# sourceMappingURL=product_addon_groups.js.map