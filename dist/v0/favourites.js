"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteUpdateFailed = exports.FavouriteDeleteFailed = exports.FavouriteCreateFailed = exports.FavouriteFetchFailed = exports.FavouritesFetchFailed = exports.Favourites = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Favourites = (function (_super) {
    tslib_1.__extends(Favourites, _super);
    function Favourites(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Favourites.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Favourites.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Favourites.prototype.getAll = function (query) {
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
                        if (response_1.status !== 200)
                            throw new FavouritesFetchFailed();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new FavouritesFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Favourites.prototype.get = function (favouriteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + favouriteId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new FavouriteFetchFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                msg: response.data.msg
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new FavouriteFetchFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Favourites.prototype.create = function (favourite) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().post(uri, favourite)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new FavouriteCreateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new FavouriteCreateFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Favourites.prototype.update = function (favouriteId, favourite) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + favouriteId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().put(uri, favourite)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new FavouriteUpdateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new FavouriteUpdateFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Favourites.prototype.delete = function (favouriteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + favouriteId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new FavouriteDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new FavouriteDeleteFailed(error_5.message, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    Favourites.baseEndpoint = '/api/v0/favourites';
    return Favourites;
}(base_1.ThBaseHandler));
exports.Favourites = Favourites;
var FavouritesFetchFailed = (function (_super) {
    tslib_1.__extends(FavouritesFetchFailed, _super);
    function FavouritesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch favourites set'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouritesFetchFailed';
        Object.setPrototypeOf(_this, FavouritesFetchFailed.prototype);
        return _this;
    }
    return FavouritesFetchFailed;
}(baseError_1.BaseError));
exports.FavouritesFetchFailed = FavouritesFetchFailed;
var FavouriteFetchFailed = (function (_super) {
    tslib_1.__extends(FavouriteFetchFailed, _super);
    function FavouriteFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteFetchFailed';
        Object.setPrototypeOf(_this, FavouriteFetchFailed.prototype);
        return _this;
    }
    return FavouriteFetchFailed;
}(baseError_1.BaseError));
exports.FavouriteFetchFailed = FavouriteFetchFailed;
var FavouriteCreateFailed = (function (_super) {
    tslib_1.__extends(FavouriteCreateFailed, _super);
    function FavouriteCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteCreateFailed';
        Object.setPrototypeOf(_this, FavouriteCreateFailed.prototype);
        return _this;
    }
    return FavouriteCreateFailed;
}(baseError_1.BaseError));
exports.FavouriteCreateFailed = FavouriteCreateFailed;
var FavouriteDeleteFailed = (function (_super) {
    tslib_1.__extends(FavouriteDeleteFailed, _super);
    function FavouriteDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteDeleteFailed';
        Object.setPrototypeOf(_this, FavouriteDeleteFailed.prototype);
        return _this;
    }
    return FavouriteDeleteFailed;
}(baseError_1.BaseError));
exports.FavouriteDeleteFailed = FavouriteDeleteFailed;
var FavouriteUpdateFailed = (function (_super) {
    tslib_1.__extends(FavouriteUpdateFailed, _super);
    function FavouriteUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update favourite'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'FavouriteUpdateFailed';
        Object.setPrototypeOf(_this, FavouriteUpdateFailed.prototype);
        return _this;
    }
    return FavouriteUpdateFailed;
}(baseError_1.BaseError));
exports.FavouriteUpdateFailed = FavouriteUpdateFailed;
//# sourceMappingURL=favourites.js.map