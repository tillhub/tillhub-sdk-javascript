"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafesLogBook = exports.Safes = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors/safes"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Safes = /** @class */ (function (_super) {
    tslib_1.__extends(Safes, _super);
    function Safes(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: Safes.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Safes.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Safes.prototype.getAll = function (query) {
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
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new errors.SafesFetchAllFailed(undefined, { error: error_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Safes.prototype.get = function (safeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + safeId);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.SafesFetchOneFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.SafesFetchOneFailed(undefined, { error: error_2 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Safes.prototype.meta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/meta');
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.SafesGetMetaFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.SafesGetMetaFailed(undefined, { error: error_3 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Safes.prototype.create = function (safe) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4 /*yield*/, this.http.getClient().post(uri, safe)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new errors.SafesCreationFailed(undefined, { error: error_4 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Safes.prototype.put = function (safeId, safe) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + safeId);
                        return [4 /*yield*/, this.http.getClient().put(uri, safe)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.SafesPutFailed(undefined, { status: response.status });
                        }
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new errors.SafesPutFailed(undefined, { error: error_5 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Safes.prototype.book = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/book');
                        return [4 /*yield*/, this.http.getClient().post(uri, body)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response.data,
                                msg: response.data.msg
                            }];
                    case 2:
                        error_6 = _a.sent();
                        throw new errors.SafesBookFailed(error_6.msg, { error: error_6 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Safes.baseEndpoint = '/api/v0/safes';
    return Safes;
}(base_1.ThBaseHandler));
exports.Safes = Safes;
var SafesLogBook = /** @class */ (function (_super) {
    tslib_1.__extends(SafesLogBook, _super);
    function SafesLogBook(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: SafesLogBook.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = SafesLogBook.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    SafesLogBook.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_2, error_7;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/logs');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _b.sent();
                        if ((_a = response_2.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_2.data.cursor.next });
                            };
                        }
                        return [2 /*return*/, {
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count, cursor: response_2.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_7 = _b.sent();
                        throw new errors.SafesLogBookFetchAllFailed(undefined, { error: error_7 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SafesLogBook.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/logs/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.SafesLogBookGetMetaFailed();
                        return [2 /*return*/, {
                                data: response.data.results[0],
                                metadata: { count: response.data.results[0].count }
                            }];
                    case 2:
                        error_8 = _a.sent();
                        throw new errors.SafesLogBookGetMetaFailed(undefined, { error: error_8 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SafesLogBook.baseEndpoint = '/api/v0/safes';
    return SafesLogBook;
}(base_1.ThBaseHandler));
exports.SafesLogBook = SafesLogBook;
//# sourceMappingURL=safes.js.map