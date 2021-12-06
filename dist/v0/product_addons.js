"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAddons = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors/productAddons"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ProductAddons = (function (_super) {
    tslib_1.__extends(ProductAddons, _super);
    function ProductAddons(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: ProductAddons.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ProductAddons.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ProductAddons.prototype.getAll = function (query) {
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
                        throw new errors.ProductAddonsFetchAllFailed(undefined, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddons.prototype.get = function (productAddonId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + productAddonId);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ProductAddonFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.ProductAddonFetchOneFailed(undefined, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddons.prototype.meta = function () {
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
                            throw new errors.ProductAddonsGetMetaFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.ProductAddonsGetMetaFailed(undefined, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddons.prototype.create = function (productAddon) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, productAddon)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new errors.ProductAddonCreationFailed(undefined, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddons.prototype.put = function (productAddonId, productAddon) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + productAddonId);
                        return [4, this.http.getClient().put(uri, productAddon)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ProductAddonPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new errors.ProductAddonPutFailed(undefined, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    ProductAddons.prototype.delete = function (productAddonId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productAddonId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.ProductAddonDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new errors.ProductAddonDeleteFailed();
                    case 4: return [2];
                }
            });
        });
    };
    ProductAddons.baseEndpoint = '/api/v0/product_addons';
    return ProductAddons;
}(base_1.ThBaseHandler));
exports.ProductAddons = ProductAddons;
//# sourceMappingURL=product_addons.js.map