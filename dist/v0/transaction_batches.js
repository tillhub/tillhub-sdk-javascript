"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBatchDownloadInputFailed = exports.TransactionBatchDownloadFailed = exports.TransactionBatchesMetaFailed = exports.TransactionBatchesFetchFailed = exports.TransactionBatchUploadFailed = exports.TransactionBatches = exports.FileStatus = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var FileStatus;
(function (FileStatus) {
    FileStatus["UPLOADING"] = "UPLOADING";
    FileStatus["UPLOADED"] = "UPLOADED";
    FileStatus["PROCESSING"] = "PROCESSING";
    FileStatus["UPLOAD_FAILED"] = "UPLOAD_FAILED";
    FileStatus["PROCESSING_FAILED"] = "PROCESSING_FAILED";
    FileStatus["PROCESSING_DONE"] = "PROCESSING_DONE";
})(FileStatus = exports.FileStatus || (exports.FileStatus = {}));
var TransactionBatches = (function () {
    function TransactionBatches(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/transaction-batches';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    TransactionBatches.prototype.getAll = function (query) {
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
                            throw new TransactionBatchesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () {
                                return _this.getAll(tslib_1.__assign(tslib_1.__assign({}, query), { uri: response_1.data.cursors.after }));
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new TransactionBatchesFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    TransactionBatches.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/meta", query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionBatchesMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new TransactionBatchesMetaFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    TransactionBatches.prototype.download = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + id + "/download");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri, {
                                responseType: 'blob'
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionBatchDownloadFailed(undefined, { status: response.status });
                        }
                        return [2, response.data];
                    case 3:
                        error_3 = _a.sent();
                        throw new TransactionBatchDownloadFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    TransactionBatches.prototype.downloadInput = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + id + "/download-input");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri, {
                                responseType: 'blob'
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionBatchDownloadInputFailed(undefined, { status: response.status });
                        }
                        return [2, response.data];
                    case 3:
                        error_4 = _a.sent();
                        throw new TransactionBatchDownloadInputFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    TransactionBatches.prototype.upload = function (payload) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var formData, uri, response, error_5, msg;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('publicKey', payload.publicKey);
                        formData.append('unzerId', payload.unzerId);
                        formData.append('createdBy', payload.createdBy);
                        formData.append('source', payload.source);
                        formData.append('file', payload.file);
                        uri = this.uriHelper.generateBaseUri('/upload');
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, formData, {
                                timeout: 60000,
                                headers: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 2:
                        response = _f.sent();
                        return [2, {
                                data: (_a = response.data.results) !== null && _a !== void 0 ? _a : response.data,
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _f.sent();
                        msg = typeof (error_5 === null || error_5 === void 0 ? void 0 : error_5.message) === 'string'
                            ? error_5.message
                            : ((_d = (_c = (_b = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : 'Could not upload transaction batch');
                        throw new TransactionBatchUploadFailed(msg, { status: (_e = error_5 === null || error_5 === void 0 ? void 0 : error_5.response) === null || _e === void 0 ? void 0 : _e.status });
                    case 4: return [2];
                }
            });
        });
    };
    return TransactionBatches;
}());
exports.TransactionBatches = TransactionBatches;
var TransactionBatchUploadFailed = (function (_super) {
    tslib_1.__extends(TransactionBatchUploadFailed, _super);
    function TransactionBatchUploadFailed(message, properties) {
        if (message === void 0) { message = 'Could not upload transaction batch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionBatchUploadFailed';
        Object.setPrototypeOf(_this, TransactionBatchUploadFailed.prototype);
        return _this;
    }
    return TransactionBatchUploadFailed;
}(baseError_1.BaseError));
exports.TransactionBatchUploadFailed = TransactionBatchUploadFailed;
var TransactionBatchesFetchFailed = (function (_super) {
    tslib_1.__extends(TransactionBatchesFetchFailed, _super);
    function TransactionBatchesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction batches'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionBatchesFetchFailed';
        Object.setPrototypeOf(_this, TransactionBatchesFetchFailed.prototype);
        return _this;
    }
    return TransactionBatchesFetchFailed;
}(baseError_1.BaseError));
exports.TransactionBatchesFetchFailed = TransactionBatchesFetchFailed;
var TransactionBatchesMetaFailed = (function (_super) {
    tslib_1.__extends(TransactionBatchesMetaFailed, _super);
    function TransactionBatchesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction batches meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionBatchesMetaFailed';
        Object.setPrototypeOf(_this, TransactionBatchesMetaFailed.prototype);
        return _this;
    }
    return TransactionBatchesMetaFailed;
}(baseError_1.BaseError));
exports.TransactionBatchesMetaFailed = TransactionBatchesMetaFailed;
var TransactionBatchDownloadFailed = (function (_super) {
    tslib_1.__extends(TransactionBatchDownloadFailed, _super);
    function TransactionBatchDownloadFailed(message, properties) {
        if (message === void 0) { message = 'Could not download transaction batch file'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionBatchDownloadFailed';
        Object.setPrototypeOf(_this, TransactionBatchDownloadFailed.prototype);
        return _this;
    }
    return TransactionBatchDownloadFailed;
}(baseError_1.BaseError));
exports.TransactionBatchDownloadFailed = TransactionBatchDownloadFailed;
var TransactionBatchDownloadInputFailed = (function (_super) {
    tslib_1.__extends(TransactionBatchDownloadInputFailed, _super);
    function TransactionBatchDownloadInputFailed(message, properties) {
        if (message === void 0) { message = 'Could not download transaction batch input file'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionBatchDownloadInputFailed';
        Object.setPrototypeOf(_this, TransactionBatchDownloadInputFailed.prototype);
        return _this;
    }
    return TransactionBatchDownloadInputFailed;
}(baseError_1.BaseError));
exports.TransactionBatchDownloadInputFailed = TransactionBatchDownloadInputFailed;
//# sourceMappingURL=transaction_batches.js.map