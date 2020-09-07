"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoices = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var Invoices = (function (_super) {
    tslib_1.__extends(Invoices, _super);
    function Invoices(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Invoices.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Invoices.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Invoices.prototype.getAll = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var query, uri, next, queryString, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = JSON.parse(JSON.stringify(q));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        }
                        queryString = qs_1.default.stringify(query);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new errors.InvoicesFetchAllFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Invoices.prototype.getMeta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
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
                        if (response.status !== 200)
                            reject(new errors.InvoicesGetMetaFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new errors.InvoicesGetMetaFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Invoices.prototype.getOne = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var invoiceId, query, uri, queryString, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invoiceId = requestObject.invoiceId, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + invoiceId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2, reject(new errors.InvoicesFetchOneFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Invoices.prototype.create = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, query, uri, queryString, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2, reject(new errors.InvoicesCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Invoices.prototype.update = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, query, invoiceId, uri, queryString, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, query = requestObject.query, invoiceId = requestObject.invoiceId;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + invoiceId;
                        if (query && query.embed) {
                            queryString = query.embed
                                .map(function (item) {
                                return "embed[]=" + item;
                            })
                                .join('&');
                            uri = uri + "?" + queryString;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_5 = _a.sent();
                        return [2, reject(new errors.InvoicesUpdateFailed(err_5.message))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Invoices.prototype.deleteOne = function (invoiceId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + invoiceId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_6 = _a.sent();
                        return [2, reject(new errors.InvoicesDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Invoices.baseEndpoint = '/api/v0/invoices';
    return Invoices;
}(base_1.ThBaseHandler));
exports.Invoices = Invoices;
//# sourceMappingURL=invoices.js.map