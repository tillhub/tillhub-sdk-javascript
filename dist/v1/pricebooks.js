"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricebookDeleteFailed = exports.PricebookCreationFailed = exports.PricebookPutFailed = exports.PricebookFetchFailed = exports.PricebooksFetchFailed = exports.Pricebooks = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var Pricebooks = (function () {
    function Pricebooks(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Pricebooks.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/prices/book');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
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
                        throw new PricebooksFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Pricebooks.prototype.meta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/prices/book/meta');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new PricebooksMetaFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new PricebooksMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Pricebooks.prototype.get = function (pricebookId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/prices/book/" + pricebookId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new PricebookFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new PricebookFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Pricebooks.prototype.put = function (pricebookId, pricebook) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/prices/book/" + pricebookId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, pricebook)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new PricebookPutFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Pricebooks.prototype.create = function (pricebook) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/prices/book');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, pricebook)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new PricebookCreationFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Pricebooks.prototype.delete = function (pricebookId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/prices/book/" + pricebookId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new PricebookDeleteFailed();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new PricebookDeleteFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    return Pricebooks;
}());
exports.Pricebooks = Pricebooks;
var PricebooksFetchFailed = (function (_super) {
    tslib_1.__extends(PricebooksFetchFailed, _super);
    function PricebooksFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch pricebooks'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebooksFetchFailed';
        Object.setPrototypeOf(_this, PricebooksFetchFailed.prototype);
        return _this;
    }
    return PricebooksFetchFailed;
}(errors_1.BaseError));
exports.PricebooksFetchFailed = PricebooksFetchFailed;
var PricebooksMetaFailed = (function (_super) {
    tslib_1.__extends(PricebooksMetaFailed, _super);
    function PricebooksMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch pricebooks meta call'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebooksMetaFailed';
        Object.setPrototypeOf(_this, PricebooksMetaFailed.prototype);
        return _this;
    }
    return PricebooksMetaFailed;
}(errors_1.BaseError));
var PricebookFetchFailed = (function (_super) {
    tslib_1.__extends(PricebookFetchFailed, _super);
    function PricebookFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch pricebook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookFetchFailed';
        Object.setPrototypeOf(_this, PricebookFetchFailed.prototype);
        return _this;
    }
    return PricebookFetchFailed;
}(errors_1.BaseError));
exports.PricebookFetchFailed = PricebookFetchFailed;
var PricebookPutFailed = (function (_super) {
    tslib_1.__extends(PricebookPutFailed, _super);
    function PricebookPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter pricebook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookPutFailed';
        Object.setPrototypeOf(_this, PricebookPutFailed.prototype);
        return _this;
    }
    return PricebookPutFailed;
}(errors_1.BaseError));
exports.PricebookPutFailed = PricebookPutFailed;
var PricebookCreationFailed = (function (_super) {
    tslib_1.__extends(PricebookCreationFailed, _super);
    function PricebookCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create pricebook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookCreationFailed';
        Object.setPrototypeOf(_this, PricebookCreationFailed.prototype);
        return _this;
    }
    return PricebookCreationFailed;
}(errors_1.BaseError));
exports.PricebookCreationFailed = PricebookCreationFailed;
var PricebookDeleteFailed = (function (_super) {
    tslib_1.__extends(PricebookDeleteFailed, _super);
    function PricebookDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete pricebook'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookDeleteFailed';
        Object.setPrototypeOf(_this, PricebookDeleteFailed.prototype);
        return _this;
    }
    return PricebookDeleteFailed;
}(errors_1.BaseError));
exports.PricebookDeleteFailed = PricebookDeleteFailed;
//# sourceMappingURL=pricebooks.js.map