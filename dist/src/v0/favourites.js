"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favourites = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var Favourites = /** @class */ (function (_super) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.FavouritesFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_1 = _a.sent();
                        throw new errors.FavouritesFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Favourites.prototype.get = function (favouriteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + favouriteId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.FavouriteFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                msg: response.data.msg
                            }];
                    case 2:
                        e_2 = _a.sent();
                        throw new errors.FavouriteFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Favourites.prototype.create = function (favourite) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4 /*yield*/, this.http.getClient().post(uri, favourite)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.FavouriteCreateFailed();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_3 = _a.sent();
                        throw new errors.FavouriteCreateFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Favourites.prototype.update = function (favouriteId, favourite) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + favouriteId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4 /*yield*/, this.http.getClient().put(uri, favourite)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.FavouriteUpdateFailed();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_4 = _a.sent();
                        throw new errors.FavouriteUpdateFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Favourites.prototype.delete = function (favouriteId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + favouriteId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.FavouriteDeleteFailed();
                        return [2 /*return*/, {
                                msg: response.data.msg
                            }];
                    case 2:
                        e_5 = _a.sent();
                        throw new errors.FavouriteDeleteFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Favourites.baseEndpoint = '/api/v0/favourites';
    return Favourites;
}(base_1.ThBaseHandler));
exports.Favourites = Favourites;
//# sourceMappingURL=favourites.js.map