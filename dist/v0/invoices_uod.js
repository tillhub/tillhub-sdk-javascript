"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsDownloadFailed = exports.UodInvoicesGetMetaFailed = exports.UodInvoicesFetchFailed = exports.UodInvoices = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var UodInvoices = (function (_super) {
    tslib_1.__extends(UodInvoices, _super);
    function UodInvoices(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: UodInvoices.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = UodInvoices.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    UodInvoices.prototype.getAll = function (query) {
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
                            throw new UodInvoicesFetchFailed(undefined, { status: response_1.status });
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
                        throw new UodInvoicesFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    UodInvoices.prototype.meta = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
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
                            throw new UodInvoicesGetMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: ((_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.count) || 0 }
                            }];
                    case 3:
                        error_2 = _b.sent();
                        throw new UodInvoicesGetMetaFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    UodInvoices.prototype.download = function (documentId, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/download/" + documentId + "/type/" + type);
                        return [4, this.http.getClient().get(uri, {
                                responseType: 'arraybuffer'
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DocumentsDownloadFailed(undefined, { status: response.status });
                        }
                        if (response.status === 200) {
                            return [2, response];
                        }
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw new DocumentsDownloadFailed(error_3 === null || error_3 === void 0 ? void 0 : error_3.message);
                    case 3: return [2];
                }
            });
        });
    };
    UodInvoices.baseEndpoint = '/api/v0/documents/unzer-one-invoices';
    return UodInvoices;
}(base_1.ThBaseHandler));
exports.UodInvoices = UodInvoices;
var UodInvoicesFetchFailed = (function (_super) {
    tslib_1.__extends(UodInvoicesFetchFailed, _super);
    function UodInvoicesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch invoices'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UodInvoicesFetchFailed';
        Object.setPrototypeOf(_this, UodInvoicesFetchFailed.prototype);
        return _this;
    }
    return UodInvoicesFetchFailed;
}(errors_1.BaseError));
exports.UodInvoicesFetchFailed = UodInvoicesFetchFailed;
var UodInvoicesGetMetaFailed = (function (_super) {
    tslib_1.__extends(UodInvoicesGetMetaFailed, _super);
    function UodInvoicesGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for invoices'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UodInvoicesGetMetaFailed';
        Object.setPrototypeOf(_this, UodInvoicesGetMetaFailed.prototype);
        return _this;
    }
    return UodInvoicesGetMetaFailed;
}(errors_1.BaseError));
exports.UodInvoicesGetMetaFailed = UodInvoicesGetMetaFailed;
var DocumentsDownloadFailed = (function (_super) {
    tslib_1.__extends(DocumentsDownloadFailed, _super);
    function DocumentsDownloadFailed(message, properties) {
        if (message === void 0) { message = 'Could not download file'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DocumentsDownloadFailed';
        Object.setPrototypeOf(_this, DocumentsDownloadFailed.prototype);
        return _this;
    }
    return DocumentsDownloadFailed;
}(errors_1.BaseError));
exports.DocumentsDownloadFailed = DocumentsDownloadFailed;
//# sourceMappingURL=invoices_uod.js.map