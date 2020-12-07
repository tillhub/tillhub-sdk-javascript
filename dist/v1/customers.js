"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var customers_1 = require("../v0/customers");
var Customers = (function (_super) {
    tslib_1.__extends(Customers, _super);
    function Customers(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Customers.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Customers.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Customers.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new customers_1.CustomersFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 3:
                        err_1 = _b.sent();
                        throw new customers_1.CustomersFetchFailed(undefined, { error: err_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.get = function (customerId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + customerId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomerFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new customers_1.CustomerFetchFailed(undefined, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.createNote = function (customerId, note) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + customerId + "/notes");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, note)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomerNoteCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new customers_1.CustomerNoteCreationFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.put = function (customerId, customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + customerId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, customer)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomerPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new customers_1.CustomerPutFailed(undefined, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.create = function (customer, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, customer)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomerCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new customers_1.CustomerCreationFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomersMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new customers_1.CustomersMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new customers_1.CustomersMetaFailed(undefined, { error: err_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.delete = function (customerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + customerId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomerDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new customers_1.CustomerDeleteFailed(undefined, { error: err_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.count = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/meta');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomersCountFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_4 = _a.sent();
                        console.log('TCL: ~ Customers ~ count ~ err', err_4);
                        throw new customers_1.CustomersCountFailed(undefined, { error: err_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.search = function (searchTerm) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, user, uri, response, error_5;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
                        user = (_b = this.options.user) !== null && _b !== void 0 ? _b : '';
                        uri = base + "/api/v2/customers/" + user + "/search?q=" + searchTerm;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200)
                            throw new customers_1.CustomersSearchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _c.sent();
                        throw new customers_1.CustomersSearchFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.baseEndpoint = '/api/v1/customers';
    return Customers;
}(base_1.ThBaseHandler));
exports.Customers = Customers;
//# sourceMappingURL=customers.js.map