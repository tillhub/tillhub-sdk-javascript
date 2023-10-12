"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsDownloadFailed = exports.DocumentsSendFailed = exports.DocumentsMetaFailed = exports.DocumentsGetFailed = exports.Documents = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Documents = (function (_super) {
    tslib_1.__extends(Documents, _super);
    function Documents(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Documents.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Documents.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Documents.prototype.getAll = function (query) {
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
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new DocumentsGetFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new DocumentsGetFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Documents.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new DocumentsMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new DocumentsMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new DocumentsMetaFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Documents.prototype.send = function (documentId, sendQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + documentId + "/send");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().post(uri, sendQuery)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new DocumentsSendFailed(error_3.message);
                    case 3: return [2];
                }
            });
        });
    };
    Documents.prototype.download = function (documentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, pdfObj, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + documentId + "/download");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        pdfObj = response.data.results[0];
                        return [2, {
                                data: pdfObj.base64Content,
                                contentType: pdfObj.contentType,
                                filename: pdfObj.fileName
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new DocumentsDownloadFailed(error_4.message);
                    case 3: return [2];
                }
            });
        });
    };
    Documents.baseEndpoint = '/api/v0/documents';
    return Documents;
}(base_1.ThBaseHandler));
exports.Documents = Documents;
var DocumentsGetFailed = (function (_super) {
    tslib_1.__extends(DocumentsGetFailed, _super);
    function DocumentsGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not get document'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DocumentsGetFailed';
        Object.setPrototypeOf(_this, DocumentsGetFailed.prototype);
        return _this;
    }
    return DocumentsGetFailed;
}(errors_1.BaseError));
exports.DocumentsGetFailed = DocumentsGetFailed;
var DocumentsMetaFailed = (function (_super) {
    tslib_1.__extends(DocumentsMetaFailed, _super);
    function DocumentsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get documents metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DocumentsMetaFailed';
        Object.setPrototypeOf(_this, DocumentsMetaFailed.prototype);
        return _this;
    }
    return DocumentsMetaFailed;
}(errors_1.BaseError));
exports.DocumentsMetaFailed = DocumentsMetaFailed;
var DocumentsSendFailed = (function (_super) {
    tslib_1.__extends(DocumentsSendFailed, _super);
    function DocumentsSendFailed(message, properties) {
        if (message === void 0) { message = 'Could not send email'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DocumentsSendFailed';
        Object.setPrototypeOf(_this, DocumentsSendFailed.prototype);
        return _this;
    }
    return DocumentsSendFailed;
}(errors_1.BaseError));
exports.DocumentsSendFailed = DocumentsSendFailed;
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
//# sourceMappingURL=documents.js.map