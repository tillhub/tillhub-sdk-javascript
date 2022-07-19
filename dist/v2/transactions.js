"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsImagesDeleteFailed = exports.TransactionsImageDeleteFailed = exports.TransactionsImageUpdateFailed = exports.TransactionsImageCreateFailed = exports.TransactionsGetImagesFailed = exports.Transactions = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var Transactions = (function () {
    function Transactions(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v2/transactions';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Transactions.prototype.getImages = function (transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsGetImagesFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0])
                            throw new TransactionsGetImagesFailed();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new TransactionsGetImagesFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.createImage = function (transactionId, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images");
                        return [4, this.http.getClient().post(uri, image)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsImageCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new TransactionsImageCreateFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.updateImage = function (transactionId, imageIndex, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images/" + imageIndex);
                        return [4, this.http.getClient().put(uri, image)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsImageUpdateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new TransactionsImageUpdateFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.deleteImage = function (transactionId, imageIndex) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images/" + imageIndex);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsImageDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new TransactionsImageDeleteFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.deleteAllImages = function (transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images");
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsImagesDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new TransactionsImagesDeleteFailed(error_5.message, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    return Transactions;
}());
exports.Transactions = Transactions;
var TransactionsGetImagesFailed = (function (_super) {
    tslib_1.__extends(TransactionsGetImagesFailed, _super);
    function TransactionsGetImagesFailed(message, properties) {
        if (message === void 0) { message = 'Could not get the transaction images'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsGetImagesFailed';
        Object.setPrototypeOf(_this, TransactionsGetImagesFailed.prototype);
        return _this;
    }
    return TransactionsGetImagesFailed;
}(baseError_1.BaseError));
exports.TransactionsGetImagesFailed = TransactionsGetImagesFailed;
var TransactionsImageCreateFailed = (function (_super) {
    tslib_1.__extends(TransactionsImageCreateFailed, _super);
    function TransactionsImageCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create transaction image'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsImageCreateFailed';
        Object.setPrototypeOf(_this, TransactionsImageCreateFailed.prototype);
        return _this;
    }
    return TransactionsImageCreateFailed;
}(baseError_1.BaseError));
exports.TransactionsImageCreateFailed = TransactionsImageCreateFailed;
var TransactionsImageUpdateFailed = (function (_super) {
    tslib_1.__extends(TransactionsImageUpdateFailed, _super);
    function TransactionsImageUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update transaction image'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsImageUpdateFailed';
        Object.setPrototypeOf(_this, TransactionsImageUpdateFailed.prototype);
        return _this;
    }
    return TransactionsImageUpdateFailed;
}(baseError_1.BaseError));
exports.TransactionsImageUpdateFailed = TransactionsImageUpdateFailed;
var TransactionsImageDeleteFailed = (function (_super) {
    tslib_1.__extends(TransactionsImageDeleteFailed, _super);
    function TransactionsImageDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete transaction image'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsImageDeleteFailed';
        Object.setPrototypeOf(_this, TransactionsImageDeleteFailed.prototype);
        return _this;
    }
    return TransactionsImageDeleteFailed;
}(baseError_1.BaseError));
exports.TransactionsImageDeleteFailed = TransactionsImageDeleteFailed;
var TransactionsImagesDeleteFailed = (function (_super) {
    tslib_1.__extends(TransactionsImagesDeleteFailed, _super);
    function TransactionsImagesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete all transaction images'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsImagesDeleteFailed';
        Object.setPrototypeOf(_this, TransactionsImageDeleteFailed.prototype);
        return _this;
    }
    return TransactionsImagesDeleteFailed;
}(baseError_1.BaseError));
exports.TransactionsImagesDeleteFailed = TransactionsImagesDeleteFailed;
//# sourceMappingURL=transactions.js.map