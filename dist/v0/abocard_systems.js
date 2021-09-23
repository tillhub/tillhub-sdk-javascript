"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbocardUpdateFailed = exports.AbocardDeleteFailed = exports.AbocardCreateFailed = exports.AbocardFetchFailed = exports.AbocardsFetchFailed = exports.AbocardSystems = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var AbocardSystems = (function (_super) {
    tslib_1.__extends(AbocardSystems, _super);
    function AbocardSystems(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: AbocardSystems.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = AbocardSystems.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    AbocardSystems.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, e_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/abocard/systems');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200)
                            throw new AbocardsFetchFailed();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        e_1 = _b.sent();
                        throw new AbocardsFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AbocardSystems.prototype.get = function (abocardId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/abocard/systems/" + abocardId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AbocardFetchFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                msg: response.data.msg
                            }];
                    case 2:
                        e_2 = _a.sent();
                        throw new AbocardFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AbocardSystems.prototype.create = function (abocard) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/abocard/systems');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().post(uri, abocard)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AbocardCreateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_3 = _a.sent();
                        throw new AbocardCreateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AbocardSystems.prototype.update = function (abocardId, abocard) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/abocard/systems/" + abocardId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().put(uri, abocard)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AbocardUpdateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        e_4 = _a.sent();
                        throw new AbocardUpdateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AbocardSystems.prototype.delete = function (abocardId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/abocard/systems/" + abocardId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AbocardDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        e_5 = _a.sent();
                        throw new AbocardDeleteFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AbocardSystems.baseEndpoint = '/api/v0/loyalties';
    return AbocardSystems;
}(base_1.ThBaseHandler));
exports.AbocardSystems = AbocardSystems;
var AbocardsFetchFailed = (function (_super) {
    tslib_1.__extends(AbocardsFetchFailed, _super);
    function AbocardsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch abocards set'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AbocardsFetchFailed';
        Object.setPrototypeOf(_this, AbocardsFetchFailed.prototype);
        return _this;
    }
    return AbocardsFetchFailed;
}(baseError_1.BaseError));
exports.AbocardsFetchFailed = AbocardsFetchFailed;
var AbocardFetchFailed = (function (_super) {
    tslib_1.__extends(AbocardFetchFailed, _super);
    function AbocardFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch abocard'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AbocardFetchFailed';
        Object.setPrototypeOf(_this, AbocardFetchFailed.prototype);
        return _this;
    }
    return AbocardFetchFailed;
}(baseError_1.BaseError));
exports.AbocardFetchFailed = AbocardFetchFailed;
var AbocardCreateFailed = (function (_super) {
    tslib_1.__extends(AbocardCreateFailed, _super);
    function AbocardCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create abocard'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AbocardCreateFailed';
        Object.setPrototypeOf(_this, AbocardCreateFailed.prototype);
        return _this;
    }
    return AbocardCreateFailed;
}(baseError_1.BaseError));
exports.AbocardCreateFailed = AbocardCreateFailed;
var AbocardDeleteFailed = (function (_super) {
    tslib_1.__extends(AbocardDeleteFailed, _super);
    function AbocardDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete abocard'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AbocardDeleteFailed';
        Object.setPrototypeOf(_this, AbocardDeleteFailed.prototype);
        return _this;
    }
    return AbocardDeleteFailed;
}(baseError_1.BaseError));
exports.AbocardDeleteFailed = AbocardDeleteFailed;
var AbocardUpdateFailed = (function (_super) {
    tslib_1.__extends(AbocardUpdateFailed, _super);
    function AbocardUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update abocard'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AbocardUpdateFailed';
        Object.setPrototypeOf(_this, AbocardUpdateFailed.prototype);
        return _this;
    }
    return AbocardUpdateFailed;
}(baseError_1.BaseError));
exports.AbocardUpdateFailed = AbocardUpdateFailed;
//# sourceMappingURL=abocard_systems.js.map