"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDeleteFailed = exports.CustomersSearchFailed = exports.CustomersCountFailed = exports.CustomersMetaFailed = exports.CustomerCreationFailed = exports.CustomerNoteCreationFailed = exports.CustomerPutFailed = exports.CustomerFetchFailed = exports.CustomersFetchFailed = exports.Customers = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
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
                            throw new CustomersFetchFailed(undefined, { status: response_1.status });
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
                        throw new CustomersFetchFailed(undefined, { error: err_1 });
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
                            throw new CustomerFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new CustomerFetchFailed(undefined, { error: error_1 });
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
                            throw new CustomerNoteCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new CustomerNoteCreationFailed(undefined, { error: error_2 });
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
                            throw new CustomerPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new CustomerPutFailed(undefined, { error: error_3 });
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
                            throw new CustomerCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new CustomerCreationFailed(undefined, { error: error_4 });
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
                            throw new CustomersMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new CustomersMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new CustomersMetaFailed(undefined, { error: err_2 });
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
                            throw new CustomerDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new CustomerDeleteFailed(undefined, { error: err_3 });
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
                            throw new CustomersCountFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new CustomersCountFailed(undefined, { error: err_4 });
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
                            throw new CustomersSearchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _c.sent();
                        throw new CustomersSearchFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.baseEndpoint = '/api/v0/customers';
    return Customers;
}(base_1.ThBaseHandler));
exports.Customers = Customers;
var CustomersFetchFailed = (function (_super) {
    tslib_1.__extends(CustomersFetchFailed, _super);
    function CustomersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersFetchFailed';
        Object.setPrototypeOf(_this, CustomersFetchFailed.prototype);
        return _this;
    }
    return CustomersFetchFailed;
}(errors_1.BaseError));
exports.CustomersFetchFailed = CustomersFetchFailed;
var CustomerFetchFailed = (function (_super) {
    tslib_1.__extends(CustomerFetchFailed, _super);
    function CustomerFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerFetchFailed';
        Object.setPrototypeOf(_this, CustomerFetchFailed.prototype);
        return _this;
    }
    return CustomerFetchFailed;
}(errors_1.BaseError));
exports.CustomerFetchFailed = CustomerFetchFailed;
var CustomerPutFailed = (function (_super) {
    tslib_1.__extends(CustomerPutFailed, _super);
    function CustomerPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerPutFailed';
        Object.setPrototypeOf(_this, CustomerPutFailed.prototype);
        return _this;
    }
    return CustomerPutFailed;
}(errors_1.BaseError));
exports.CustomerPutFailed = CustomerPutFailed;
var CustomerNoteCreationFailed = (function (_super) {
    tslib_1.__extends(CustomerNoteCreationFailed, _super);
    function CustomerNoteCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create customer note'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerNoteCreationFailed';
        Object.setPrototypeOf(_this, CustomerNoteCreationFailed.prototype);
        return _this;
    }
    return CustomerNoteCreationFailed;
}(errors_1.BaseError));
exports.CustomerNoteCreationFailed = CustomerNoteCreationFailed;
var CustomerCreationFailed = (function (_super) {
    tslib_1.__extends(CustomerCreationFailed, _super);
    function CustomerCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerCreationFailed';
        Object.setPrototypeOf(_this, CustomerCreationFailed.prototype);
        return _this;
    }
    return CustomerCreationFailed;
}(errors_1.BaseError));
exports.CustomerCreationFailed = CustomerCreationFailed;
var CustomersMetaFailed = (function (_super) {
    tslib_1.__extends(CustomersMetaFailed, _super);
    function CustomersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get customers metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersMetaFailed';
        Object.setPrototypeOf(_this, CustomersMetaFailed.prototype);
        return _this;
    }
    return CustomersMetaFailed;
}(errors_1.BaseError));
exports.CustomersMetaFailed = CustomersMetaFailed;
var CustomersCountFailed = (function (_super) {
    tslib_1.__extends(CustomersCountFailed, _super);
    function CustomersCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count customers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersCountFailed';
        Object.setPrototypeOf(_this, CustomersCountFailed.prototype);
        return _this;
    }
    return CustomersCountFailed;
}(errors_1.BaseError));
exports.CustomersCountFailed = CustomersCountFailed;
var CustomersSearchFailed = (function (_super) {
    tslib_1.__extends(CustomersSearchFailed, _super);
    function CustomersSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersSearchFailed';
        Object.setPrototypeOf(_this, CustomersSearchFailed.prototype);
        return _this;
    }
    return CustomersSearchFailed;
}(errors_1.BaseError));
exports.CustomersSearchFailed = CustomersSearchFailed;
var CustomerDeleteFailed = (function (_super) {
    tslib_1.__extends(CustomerDeleteFailed, _super);
    function CustomerDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerDeleteFailed';
        Object.setPrototypeOf(_this, CustomerDeleteFailed.prototype);
        return _this;
    }
    return CustomerDeleteFailed;
}(errors_1.BaseError));
exports.CustomerDeleteFailed = CustomerDeleteFailed;
//# sourceMappingURL=customers.js.map