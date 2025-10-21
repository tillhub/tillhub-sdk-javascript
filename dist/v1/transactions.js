"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionQuestionnaireExportFailed = exports.Signing = exports.TransactionsLegacy = exports.Transactions = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var baseError_1 = require("../errors/baseError");
var Transactions = (function (_super) {
    tslib_1.__extends(Transactions, _super);
    function Transactions(options, http) {
        var _a, _b, _c;
        var _this = _super.call(this, http, {
            endpoint: Transactions.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_b = options.timeout) !== null && _b !== void 0 ? _b : _this.http.getClient().defaults.timeout;
        _this.endpoint = Transactions.baseEndpoint;
        _this.options.base = (_c = _this.options.base) !== null && _c !== void 0 ? _c : 'https://api.tillhub.com';
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
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new TransactionFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new TransactionsGetMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new TransactionsGetMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.getImages = function (transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsGetImageFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0])
                            throw new TransactionsGetImageFailed();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new TransactionsGetImageFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.putImage = function (transactionId, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + transactionId + "/images");
                        return [4, this.http.getClient().put(uri, image)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionsImagePutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new TransactionsImagePutFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.createImage = function (transactionId, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
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
                        error_5 = _a.sent();
                        throw new TransactionsImageCreateFailed(error_5.message, { error: error_5 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.prototype.exportQuestionnaire = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/exports/questionnaire');
                        uri = this.uriHelper.generateUriWithQuery(base, tslib_1.__assign({ format: 'csv' }, query));
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TransactionQuestionnaireExportFailed(undefined, { status: response.status });
                        }
                        return [2, response.data.results];
                    case 2:
                        error_6 = _a.sent();
                        throw new TransactionQuestionnaireExportFailed(error_6.message, { error: error_6 });
                    case 3: return [2];
                }
            });
        });
    };
    Transactions.baseEndpoint = '/api/v1/transactions';
    return Transactions;
}(base_1.ThBaseHandler));
exports.Transactions = Transactions;
var TransactionsLegacy = (function () {
    function TransactionsLegacy(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.signing = new Signing(options, http);
        this.endpoint = '/api/v1/transactions';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    TransactionsLegacy.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_2, error_7;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/legacy');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _b.sent();
                        if ((_a = response_2.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_2.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count, cursor: response_2.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_7 = _b.sent();
                        throw new TransactionFetchFailed(error_7.message, { error: error_7 });
                    case 3: return [2];
                }
            });
        });
    };
    TransactionsLegacy.prototype.pdfUri = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, transactionId, template, base, uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = requestObject.query, transactionId = requestObject.transactionId, template = requestObject.template;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/" + transactionId + "/legacy/" + template + "/pdf");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().post(uri, null, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 3:
                        error_8 = _a.sent();
                        throw new TransactionPdfFailed(error_8.message);
                    case 4: return [2];
                }
            });
        });
    };
    TransactionsLegacy.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/meta/legacy');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new TransactionsGetMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_9 = _a.sent();
                        throw new TransactionsGetMetaFailed(error_9.message, { error: error_9 });
                    case 3: return [2];
                }
            });
        });
    };
    return TransactionsLegacy;
}());
exports.TransactionsLegacy = TransactionsLegacy;
var Signing = (function () {
    function Signing(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v1/transactions';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Signing.prototype.initialise = function (singingResourceType, singingResource, signingSystem, signingConfiguration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/initialise");
                        return [4, this.http.getClient().post(uri, signingConfiguration, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_10 = _a.sent();
                        throw new TransactionSigningInitialisationFailed(error_10.message, { error: error_10 });
                    case 3: return [2];
                }
            });
        });
    };
    Signing.prototype.yearly = function (singingResourceType, singingResource, signingSystem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/yearly");
                        return [4, this.http.getClient().post(uri, undefined, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_11 = _a.sent();
                        throw new TransactionSigningYearlyReceiptFailed(error_11.message, { error: error_11 });
                    case 3: return [2];
                }
            });
        });
    };
    Signing.prototype.monthly = function (singingResourceType, singingResource, signingSystem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/monthly");
                        return [4, this.http.getClient().post(uri, undefined, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_12 = _a.sent();
                        throw new TransactionSigningMonthlyReceiptFailed(error_12.message, { error: error_12 });
                    case 3: return [2];
                }
            });
        });
    };
    Signing.prototype.zero = function (singingResourceType, singingResource, signingSystem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_13;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/zero");
                        return [4, this.http.getClient().post(uri, undefined, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_13 = _a.sent();
                        throw new TransactionSigningZeroReceiptFailed(error_13.message, { error: error_13 });
                    case 3: return [2];
                }
            });
        });
    };
    return Signing;
}());
exports.Signing = Signing;
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
}(baseError_1.BaseError));
var TransactionPdfFailed = (function (_super) {
    tslib_1.__extends(TransactionPdfFailed, _super);
    function TransactionPdfFailed(message, properties) {
        if (message === void 0) { message = 'Could not create pdf'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionPdfFailed';
        Object.setPrototypeOf(_this, TransactionPdfFailed.prototype);
        return _this;
    }
    return TransactionPdfFailed;
}(baseError_1.BaseError));
var TransactionSigningInitialisationFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningInitialisationFailed, _super);
    function TransactionSigningInitialisationFailed(message, properties) {
        if (message === void 0) { message = 'Could not initialise signing system'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningInitialisationFailed';
        Object.setPrototypeOf(_this, TransactionSigningInitialisationFailed.prototype);
        return _this;
    }
    return TransactionSigningInitialisationFailed;
}(baseError_1.BaseError));
var TransactionSigningYearlyReceiptFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningYearlyReceiptFailed, _super);
    function TransactionSigningYearlyReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate yearly receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningYearlyReceiptFailed';
        Object.setPrototypeOf(_this, TransactionSigningYearlyReceiptFailed.prototype);
        return _this;
    }
    return TransactionSigningYearlyReceiptFailed;
}(baseError_1.BaseError));
var TransactionSigningMonthlyReceiptFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningMonthlyReceiptFailed, _super);
    function TransactionSigningMonthlyReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate monthly receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningMonthlyReceiptFailed';
        Object.setPrototypeOf(_this, TransactionSigningMonthlyReceiptFailed.prototype);
        return _this;
    }
    return TransactionSigningMonthlyReceiptFailed;
}(baseError_1.BaseError));
var TransactionSigningZeroReceiptFailed = (function (_super) {
    tslib_1.__extends(TransactionSigningZeroReceiptFailed, _super);
    function TransactionSigningZeroReceiptFailed(message, properties) {
        if (message === void 0) { message = 'Could not generate zero receipt'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionSigningZeroReceiptFailed';
        Object.setPrototypeOf(_this, TransactionSigningZeroReceiptFailed.prototype);
        return _this;
    }
    return TransactionSigningZeroReceiptFailed;
}(baseError_1.BaseError));
var TransactionsGetMetaFailed = (function (_super) {
    tslib_1.__extends(TransactionsGetMetaFailed, _super);
    function TransactionsGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get transactions meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsGetMetaFailed';
        Object.setPrototypeOf(_this, TransactionsGetMetaFailed.prototype);
        return _this;
    }
    return TransactionsGetMetaFailed;
}(baseError_1.BaseError));
var TransactionsGetImageFailed = (function (_super) {
    tslib_1.__extends(TransactionsGetImageFailed, _super);
    function TransactionsGetImageFailed(message, properties) {
        if (message === void 0) { message = 'Could not get transactions image'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsGetImageFailed';
        Object.setPrototypeOf(_this, TransactionsGetImageFailed.prototype);
        return _this;
    }
    return TransactionsGetImageFailed;
}(baseError_1.BaseError));
var TransactionsImagePutFailed = (function (_super) {
    tslib_1.__extends(TransactionsImagePutFailed, _super);
    function TransactionsImagePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update transactions image'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsImagePutFailed';
        Object.setPrototypeOf(_this, TransactionsImagePutFailed.prototype);
        return _this;
    }
    return TransactionsImagePutFailed;
}(baseError_1.BaseError));
var TransactionsImageCreateFailed = (function (_super) {
    tslib_1.__extends(TransactionsImageCreateFailed, _super);
    function TransactionsImageCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create transactions image'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionsImageCreateFailed';
        Object.setPrototypeOf(_this, TransactionsImageCreateFailed.prototype);
        return _this;
    }
    return TransactionsImageCreateFailed;
}(baseError_1.BaseError));
var TransactionQuestionnaireExportFailed = (function (_super) {
    tslib_1.__extends(TransactionQuestionnaireExportFailed, _super);
    function TransactionQuestionnaireExportFailed(message, properties) {
        if (message === void 0) { message = 'Could not export questionnaire'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TransactionQuestionnaireExportFailed';
        Object.setPrototypeOf(_this, TransactionQuestionnaireExportFailed.prototype);
        return _this;
    }
    return TransactionQuestionnaireExportFailed;
}(baseError_1.BaseError));
exports.TransactionQuestionnaireExportFailed = TransactionQuestionnaireExportFailed;
//# sourceMappingURL=transactions.js.map