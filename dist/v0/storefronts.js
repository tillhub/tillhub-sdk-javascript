"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontsProfileFetchFailed = exports.StorefrontsDeleteFailed = exports.StorefrontsCreationFailed = exports.StorefrontsPutFailed = exports.StorefrontsFetchOneFailed = exports.StorefrontsFetchFailed = exports.Storefronts = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var Storefronts = (function (_super) {
    tslib_1.__extends(Storefronts, _super);
    function Storefronts(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Storefronts.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Storefronts.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Storefronts.prototype.getAll = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new StorefrontsFetchFailed(undefined, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Storefronts.prototype.get = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new StorefrontsFetchOneFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.put = function (storefrontId, storefront) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new StorefrontsPutFailed(undefined, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.create = function (storefront) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new StorefrontsCreationFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.delete = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new StorefrontsDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_1 = _a.sent();
                        throw new StorefrontsDeleteFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.prototype.profile = function (storefrontId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + storefrontId + "/profile");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new StorefrontsProfileFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new StorefrontsProfileFetchFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Storefronts.baseEndpoint = '/api/v0/storefronts';
    return Storefronts;
}(base_1.ThBaseHandler));
exports.Storefronts = Storefronts;
var StorefrontsFetchFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchFailed, _super);
    function StorefrontsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchFailed.prototype);
        return _this;
    }
    return StorefrontsFetchFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchFailed = StorefrontsFetchFailed;
var StorefrontsFetchOneFailed = (function (_super) {
    tslib_1.__extends(StorefrontsFetchOneFailed, _super);
    function StorefrontsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchOneFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchOneFailed.prototype);
        return _this;
    }
    return StorefrontsFetchOneFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchOneFailed = StorefrontsFetchOneFailed;
var StorefrontsPutFailed = (function (_super) {
    tslib_1.__extends(StorefrontsPutFailed, _super);
    function StorefrontsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsPutFailed';
        Object.setPrototypeOf(_this, StorefrontsPutFailed.prototype);
        return _this;
    }
    return StorefrontsPutFailed;
}(errors_1.BaseError));
exports.StorefrontsPutFailed = StorefrontsPutFailed;
var StorefrontsCreationFailed = (function (_super) {
    tslib_1.__extends(StorefrontsCreationFailed, _super);
    function StorefrontsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsCreationFailed';
        Object.setPrototypeOf(_this, StorefrontsCreationFailed.prototype);
        return _this;
    }
    return StorefrontsCreationFailed;
}(errors_1.BaseError));
exports.StorefrontsCreationFailed = StorefrontsCreationFailed;
var StorefrontsDeleteFailed = (function (_super) {
    tslib_1.__extends(StorefrontsDeleteFailed, _super);
    function StorefrontsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsDeleteFailed';
        Object.setPrototypeOf(_this, StorefrontsDeleteFailed.prototype);
        return _this;
    }
    return StorefrontsDeleteFailed;
}(errors_1.BaseError));
exports.StorefrontsDeleteFailed = StorefrontsDeleteFailed;
var StorefrontsProfileFetchFailed = (function (_super) {
    tslib_1.__extends(StorefrontsProfileFetchFailed, _super);
    function StorefrontsProfileFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the storefront profile data'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsProfileFetchFailed';
        Object.setPrototypeOf(_this, StorefrontsProfileFetchFailed.prototype);
        return _this;
    }
    return StorefrontsProfileFetchFailed;
}(errors_1.BaseError));
exports.StorefrontsProfileFetchFailed = StorefrontsProfileFetchFailed;
//# sourceMappingURL=storefronts.js.map