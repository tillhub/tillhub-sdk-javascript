"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricebookEntryDeleteFailed = exports.PricebookEntryCreationFailed = exports.PricebookEntryPutFailed = exports.PricebookEntryFetchFailed = exports.PricebookEntriesFetchFailed = exports.PricebookEntries = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var PricebookEntries = (function () {
    function PricebookEntries(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    PricebookEntries.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/prices/book/entry');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new PricebookEntriesFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    PricebookEntries.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/prices/book/entry/meta');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            reject(new PricebookEntriesMetaFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2, reject(new PricebookEntriesMetaFailed(undefined, { error: error_2 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    PricebookEntries.prototype.get = function (pricebookEntryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/prices/book/entry/" + pricebookEntryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new PricebookEntryFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new PricebookEntryFetchFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    PricebookEntries.prototype.put = function (pricebookEntryId, pricebookEntry) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/prices/book/entry/" + pricebookEntryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, pricebookEntry)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new PricebookEntryPutFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    PricebookEntries.prototype.create = function (pricebookEntry) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/prices/book/entry');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, pricebookEntry)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new PricebookEntryCreationFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    PricebookEntries.prototype.delete = function (pricebookEntryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/prices/book/entry/" + pricebookEntryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new PricebookEntryDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new PricebookEntryDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    return PricebookEntries;
}());
exports.PricebookEntries = PricebookEntries;
var PricebookEntriesFetchFailed = (function (_super) {
    tslib_1.__extends(PricebookEntriesFetchFailed, _super);
    function PricebookEntriesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch pricebook entries'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookEntriesFetchFailed';
        Object.setPrototypeOf(_this, PricebookEntriesFetchFailed.prototype);
        return _this;
    }
    return PricebookEntriesFetchFailed;
}(errors_1.BaseError));
exports.PricebookEntriesFetchFailed = PricebookEntriesFetchFailed;
var PricebookEntriesMetaFailed = (function (_super) {
    tslib_1.__extends(PricebookEntriesMetaFailed, _super);
    function PricebookEntriesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch pricebook entries meta call'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookEntriesMetaFailed';
        Object.setPrototypeOf(_this, PricebookEntriesMetaFailed.prototype);
        return _this;
    }
    return PricebookEntriesMetaFailed;
}(errors_1.BaseError));
var PricebookEntryFetchFailed = (function (_super) {
    tslib_1.__extends(PricebookEntryFetchFailed, _super);
    function PricebookEntryFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch pricebook entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookEntryFetchFailed';
        Object.setPrototypeOf(_this, PricebookEntryFetchFailed.prototype);
        return _this;
    }
    return PricebookEntryFetchFailed;
}(errors_1.BaseError));
exports.PricebookEntryFetchFailed = PricebookEntryFetchFailed;
var PricebookEntryPutFailed = (function (_super) {
    tslib_1.__extends(PricebookEntryPutFailed, _super);
    function PricebookEntryPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter pricebook entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookEntryPutFailed';
        Object.setPrototypeOf(_this, PricebookEntryPutFailed.prototype);
        return _this;
    }
    return PricebookEntryPutFailed;
}(errors_1.BaseError));
exports.PricebookEntryPutFailed = PricebookEntryPutFailed;
var PricebookEntryCreationFailed = (function (_super) {
    tslib_1.__extends(PricebookEntryCreationFailed, _super);
    function PricebookEntryCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create pricebook entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookEntryCreationFailed';
        Object.setPrototypeOf(_this, PricebookEntryCreationFailed.prototype);
        return _this;
    }
    return PricebookEntryCreationFailed;
}(errors_1.BaseError));
exports.PricebookEntryCreationFailed = PricebookEntryCreationFailed;
var PricebookEntryDeleteFailed = (function (_super) {
    tslib_1.__extends(PricebookEntryDeleteFailed, _super);
    function PricebookEntryDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete pricebook entry'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PricebookEntryDeleteFailed';
        Object.setPrototypeOf(_this, PricebookEntryDeleteFailed.prototype);
        return _this;
    }
    return PricebookEntryDeleteFailed;
}(errors_1.BaseError));
exports.PricebookEntryDeleteFailed = PricebookEntryDeleteFailed;
//# sourceMappingURL=pricebook-entries.js.map