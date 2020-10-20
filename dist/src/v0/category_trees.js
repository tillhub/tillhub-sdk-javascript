"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTreesDeleteFailed = exports.CategoryTreeCreationFailed = exports.CategoryTreePutFailed = exports.CategoryTreeFetchFailed = exports.CategoryTreesFetchFailed = exports.CategoryTrees = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var CategoryTrees = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryTrees, _super);
    function CategoryTrees(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: CategoryTrees.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = CategoryTrees.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    CategoryTrees.prototype.getAll = function (query) {
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
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new CategoryTreesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new CategoryTreesFetchFailed(undefined, { error: error_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryTrees.prototype.get = function (categoryTreeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + categoryTreeId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new CategoryTreeFetchFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new CategoryTreeFetchFailed(undefined, { error: error_2 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryTrees.prototype.put = function (categoryTreeId, categoryTree) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + categoryTreeId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, categoryTree)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new CategoryTreePutFailed(undefined, { error: error_3 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryTrees.prototype.create = function (categoryTree) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, categoryTree)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new CategoryTreeCreationFailed(undefined, { error: error_4 });
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryTrees.prototype.delete = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new CategoryTreesDeleteFailed();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new CategoryTreesDeleteFailed();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryTrees.baseEndpoint = '/api/v0/category_trees';
    return CategoryTrees;
}(base_1.ThBaseHandler));
exports.CategoryTrees = CategoryTrees;
var CategoryTreesFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryTreesFetchFailed, _super);
    function CategoryTreesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch category trees'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryTreesFetchFailed';
        Object.setPrototypeOf(_this, CategoryTreesFetchFailed.prototype);
        return _this;
    }
    return CategoryTreesFetchFailed;
}(errors_1.BaseError));
exports.CategoryTreesFetchFailed = CategoryTreesFetchFailed;
var CategoryTreeFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryTreeFetchFailed, _super);
    function CategoryTreeFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch category tree'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryTreeFetchFailed';
        Object.setPrototypeOf(_this, CategoryTreeFetchFailed.prototype);
        return _this;
    }
    return CategoryTreeFetchFailed;
}(errors_1.BaseError));
exports.CategoryTreeFetchFailed = CategoryTreeFetchFailed;
var CategoryTreePutFailed = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryTreePutFailed, _super);
    function CategoryTreePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter category tree'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryTreePutFailed';
        Object.setPrototypeOf(_this, CategoryTreePutFailed.prototype);
        return _this;
    }
    return CategoryTreePutFailed;
}(errors_1.BaseError));
exports.CategoryTreePutFailed = CategoryTreePutFailed;
var CategoryTreeCreationFailed = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryTreeCreationFailed, _super);
    function CategoryTreeCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create category tree'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryTreeCreationFailed';
        Object.setPrototypeOf(_this, CategoryTreeCreationFailed.prototype);
        return _this;
    }
    return CategoryTreeCreationFailed;
}(errors_1.BaseError));
exports.CategoryTreeCreationFailed = CategoryTreeCreationFailed;
var CategoryTreesDeleteFailed = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryTreesDeleteFailed, _super);
    function CategoryTreesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete category tree'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryTreesDeleteFailed';
        Object.setPrototypeOf(_this, CategoryTreesDeleteFailed.prototype);
        return _this;
    }
    return CategoryTreesDeleteFailed;
}(errors_1.BaseError));
exports.CategoryTreesDeleteFailed = CategoryTreesDeleteFailed;
//# sourceMappingURL=category_trees.js.map