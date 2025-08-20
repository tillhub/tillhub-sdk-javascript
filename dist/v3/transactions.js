"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargeTransactionFailed = exports.AuthorizeTransactionFailed = exports.CreateBasketFailed = exports.TransactionFetchFailed = exports.TransactionsExportFetchFailed = exports.TransactionsFetchFailed = exports.TransactionsGetMetaFailed = exports.Transactions = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Transactions = (function (_super) {
    tslib_1.__extends(Transactions, _super);
    function Transactions(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Transactions.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Transactions.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Transactions.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
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
                            throw new TransactionsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.after }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new TransactionsFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Transactions.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/export", query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsExportFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new TransactionsExportFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Transactions.prototype.meta = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/meta", query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200)
                            throw new TransactionsGetMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: ((_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.count) || 0 }
                            }];
                    case 3:
                        error_3 = _b.sent();
                        throw new TransactionsFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Transactions.prototype.createBasket = function (keypairId, basket) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/baskets");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { keypairId: keypairId, payload: basket })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new CreateBasketFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Transactions.prototype.authorize = function (keypairId, transaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/authorize");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { keypairId: keypairId, payload: transaction })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new AuthorizeTransactionFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Transactions.prototype.charge = function (keypairId, transaction) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/charge");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, { keypairId: keypairId, payload: transaction })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new ChargeTransactionFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Transactions.prototype.get = function (transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + transactionId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw new TransactionFetchFailed(error_7.message, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    Transactions.baseEndpoint = '/api/v3/transactions';
    return Transactions;
}(base_1.ThBaseHandler));
exports.Transactions = Transactions;
var TransactionsGetMetaFailed = (function (_super) {
    tslib_1.__extends(TransactionsGetMetaFailed, _super);
    function TransactionsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for transactions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsGetMetaFailed';
        Object.setPrototypeOf(_this, TransactionsGetMetaFailed.prototype);
        return _this;
    }
    return TransactionsGetMetaFailed;
}(errors_1.BaseError));
exports.TransactionsGetMetaFailed = TransactionsGetMetaFailed;
var TransactionsFetchFailed = (function (_super) {
    tslib_1.__extends(TransactionsFetchFailed, _super);
    function TransactionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch transactions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsFetchFailed';
        Object.setPrototypeOf(_this, TransactionsFetchFailed.prototype);
        return _this;
    }
    return TransactionsFetchFailed;
}(errors_1.BaseError));
exports.TransactionsFetchFailed = TransactionsFetchFailed;
var TransactionsExportFetchFailed = (function (_super) {
    tslib_1.__extends(TransactionsExportFetchFailed, _super);
    function TransactionsExportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not export transactions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsExportFetchFailed';
        Object.setPrototypeOf(_this, TransactionsExportFetchFailed.prototype);
        return _this;
    }
    return TransactionsExportFetchFailed;
}(errors_1.BaseError));
exports.TransactionsExportFetchFailed = TransactionsExportFetchFailed;
var TransactionFetchFailed = (function (_super) {
    tslib_1.__extends(TransactionFetchFailed, _super);
    function TransactionFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionFetchFailed';
        Object.setPrototypeOf(_this, TransactionFetchFailed.prototype);
        return _this;
    }
    return TransactionFetchFailed;
}(errors_1.BaseError));
exports.TransactionFetchFailed = TransactionFetchFailed;
var CreateBasketFailed = (function (_super) {
    tslib_1.__extends(CreateBasketFailed, _super);
    function CreateBasketFailed(message, properties) {
        if (message === void 0) { message = 'Could not create basket'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CreateBasketFailed';
        Object.setPrototypeOf(_this, CreateBasketFailed.prototype);
        return _this;
    }
    return CreateBasketFailed;
}(errors_1.BaseError));
exports.CreateBasketFailed = CreateBasketFailed;
var AuthorizeTransactionFailed = (function (_super) {
    tslib_1.__extends(AuthorizeTransactionFailed, _super);
    function AuthorizeTransactionFailed(message, properties) {
        if (message === void 0) { message = 'Could not authorize transaction'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AuthorizeTransactionFailed';
        Object.setPrototypeOf(_this, AuthorizeTransactionFailed.prototype);
        return _this;
    }
    return AuthorizeTransactionFailed;
}(errors_1.BaseError));
exports.AuthorizeTransactionFailed = AuthorizeTransactionFailed;
var ChargeTransactionFailed = (function (_super) {
    tslib_1.__extends(ChargeTransactionFailed, _super);
    function ChargeTransactionFailed(message, properties) {
        if (message === void 0) { message = 'Could not charge transaction'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ChargeTransactionFailed';
        Object.setPrototypeOf(_this, ChargeTransactionFailed.prototype);
        return _this;
    }
    return ChargeTransactionFailed;
}(errors_1.BaseError));
exports.ChargeTransactionFailed = ChargeTransactionFailed;
//# sourceMappingURL=transactions.js.map