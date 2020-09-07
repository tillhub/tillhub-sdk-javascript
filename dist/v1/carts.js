"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsCreateFailed = exports.CartsFetchFailed = exports.CartsMetaFailed = exports.CartsUpdateFailed = exports.CartsDeleteFailed = exports.CartsSearchFailed = exports.CartFetchFailed = exports.Carts = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Carts = (function (_super) {
    tslib_1.__extends(Carts, _super);
    function Carts(options, http) {
        var _this = _super.call(this, http, { endpoint: Carts.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Carts.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Carts.prototype.create = function (cart, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, cart)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new CartsCreateFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2, reject(new CartsCreateFailed(undefined, { error: error_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Carts.prototype.getAll = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, response_1, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (options && options.uri) {
                            uri = options.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (options && options.query ? "?" + qs_1.default.stringify(options.query) : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new CartsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2, reject(new CartsFetchFailed(undefined, { error: error_2 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Carts.prototype.get = function (cartId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new CartFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new CartFetchFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Carts.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new CartsMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2, reject(new CartsMetaFailed('could not get cart metadata unexpectedly', {
                                    status: response.status
                                }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new CartsMetaFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Carts.prototype.put = function (cartId, cart) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, cart)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new CartsUpdateFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new CartsUpdateFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Carts.prototype.delete = function (cartId, deleteOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (deleteOptions) {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId + "?" + qs_1.default.stringify(deleteOptions);
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + cartId;
                        }
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new CartsDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 2:
                        error_6 = _a.sent();
                        return [2, reject(new CartsDeleteFailed(undefined, { error: error_6 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Carts.prototype.search = function (searchTerm) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/search?q=" + searchTerm;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new CartsSearchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        return [2, reject(new CartsSearchFailed(undefined, { error: error_7 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Carts.baseEndpoint = '/api/v1/carts';
    return Carts;
}(base_1.ThBaseHandler));
exports.Carts = Carts;
var CartFetchFailed = (function (_super) {
    tslib_1.__extends(CartFetchFailed, _super);
    function CartFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartFetchFailed';
        Object.setPrototypeOf(_this, CartFetchFailed.prototype);
        return _this;
    }
    return CartFetchFailed;
}(errors_1.BaseError));
exports.CartFetchFailed = CartFetchFailed;
var CartsSearchFailed = (function (_super) {
    tslib_1.__extends(CartsSearchFailed, _super);
    function CartsSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could complete carts search'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsSearchFailed';
        Object.setPrototypeOf(_this, CartsSearchFailed.prototype);
        return _this;
    }
    return CartsSearchFailed;
}(errors_1.BaseError));
exports.CartsSearchFailed = CartsSearchFailed;
var CartsDeleteFailed = (function (_super) {
    tslib_1.__extends(CartsDeleteFailed, _super);
    function CartsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could delete cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsDeleteFailed';
        Object.setPrototypeOf(_this, CartsDeleteFailed.prototype);
        return _this;
    }
    return CartsDeleteFailed;
}(errors_1.BaseError));
exports.CartsDeleteFailed = CartsDeleteFailed;
var CartsUpdateFailed = (function (_super) {
    tslib_1.__extends(CartsUpdateFailed, _super);
    function CartsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could update cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsUpdateFailed';
        Object.setPrototypeOf(_this, CartsUpdateFailed.prototype);
        return _this;
    }
    return CartsUpdateFailed;
}(errors_1.BaseError));
exports.CartsUpdateFailed = CartsUpdateFailed;
var CartsMetaFailed = (function (_super) {
    tslib_1.__extends(CartsMetaFailed, _super);
    function CartsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could fetch carts metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsMetaFailed';
        Object.setPrototypeOf(_this, CartsMetaFailed.prototype);
        return _this;
    }
    return CartsMetaFailed;
}(errors_1.BaseError));
exports.CartsMetaFailed = CartsMetaFailed;
var CartsFetchFailed = (function (_super) {
    tslib_1.__extends(CartsFetchFailed, _super);
    function CartsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could fetch carts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsFetchFailed';
        Object.setPrototypeOf(_this, CartsFetchFailed.prototype);
        return _this;
    }
    return CartsFetchFailed;
}(errors_1.BaseError));
exports.CartsFetchFailed = CartsFetchFailed;
var CartsCreateFailed = (function (_super) {
    tslib_1.__extends(CartsCreateFailed, _super);
    function CartsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could create cart'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CartsCreateFailed';
        Object.setPrototypeOf(_this, CartsCreateFailed.prototype);
        return _this;
    }
    return CartsCreateFailed;
}(errors_1.BaseError));
exports.CartsCreateFailed = CartsCreateFailed;
//# sourceMappingURL=carts.js.map