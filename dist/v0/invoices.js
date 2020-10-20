"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoices = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var Invoices = (function (_super) {
    tslib_1.__extends(Invoices, _super);
    function Invoices(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Invoices.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Invoices.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Invoices.prototype.generateUriQueryEmbed = function (base, query) {
        var _a = query !== null && query !== void 0 ? query : {}, embed = _a.embed, restQuery = tslib_1.__rest(_a, ["embed"]);
        var uri = this.uriHelper.generateUriWithQuery(base, restQuery);
        if (query === null || query === void 0 ? void 0 : query.embed) {
            var queryString = query.embed
                .map(function (item) {
                return "embed[]=" + item;
            })
                .join('&');
            var connector = uri.includes('?') ? '&' : '?';
            uri = "" + uri + connector + queryString;
        }
        return uri;
    };
    Invoices.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
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
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new errors.InvoicesFetchAllFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Invoices.prototype.getMeta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_2;
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
                        if (response.status !== 200)
                            throw new errors.InvoicesGetMetaFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw new errors.InvoicesGetMetaFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Invoices.prototype.getOne = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var invoiceId, query, base, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invoiceId = requestObject.invoiceId, query = requestObject.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/" + invoiceId);
                        uri = this.generateUriQueryEmbed(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new errors.InvoicesFetchOneFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Invoices.prototype.create = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, query, base, uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.generateUriQueryEmbed(base, query);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new errors.InvoicesCreateFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Invoices.prototype.update = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, query, invoiceId, base, uri, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, invoiceId = requestObject.invoiceId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/" + invoiceId);
                        uri = this.generateUriQueryEmbed(base, query);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_5 = _a.sent();
                        throw new errors.InvoicesUpdateFailed(err_5.message);
                    case 4: return [2];
                }
            });
        });
    };
    Invoices.prototype.deleteOne = function (invoiceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + invoiceId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 2:
                        err_6 = _a.sent();
                        throw new errors.InvoicesDeleteFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Invoices.baseEndpoint = '/api/v0/invoices';
    return Invoices;
}(base_1.ThBaseHandler));
exports.Invoices = Invoices;
//# sourceMappingURL=invoices.js.map