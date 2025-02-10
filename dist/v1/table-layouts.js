"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableLayoutToggleActiveFailed = exports.TableLayoutDuplicateFailed = exports.TableLayoutDeleteFailed = exports.TableLayoutCreateFailed = exports.TableLayoutPutFailed = exports.TableLayoutFetchFailed = exports.TableLayoutsMetaFailed = exports.TableLayoutsFetchFailed = exports.TableLayouts = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../base");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var TableLayouts = (function (_super) {
    tslib_1.__extends(TableLayouts, _super);
    function TableLayouts(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: TableLayouts.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = TableLayouts.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    TableLayouts.prototype.getAll = function (query) {
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
                        throw new TableLayoutsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    TableLayouts.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new TableLayoutsMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new TableLayoutsMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    TableLayouts.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TableLayoutFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new TableLayoutFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    TableLayouts.prototype.put = function (id, tableLayout) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, tableLayout)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new TableLayoutPutFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    TableLayouts.prototype.create = function (tableLayout) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, tableLayout)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new TableLayoutCreateFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    TableLayouts.prototype.delete = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TableLayoutDeleteFailed();
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new TableLayoutDeleteFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    TableLayouts.prototype.duplicate = function (id, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + id + "/duplicate");
                        return [4, this.http.getClient().post(uri, options)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new TableLayoutDuplicateFailed();
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 2:
                        error_7 = _a.sent();
                        throw new TableLayoutDuplicateFailed(error_7.message, { error: error_7 });
                    case 3: return [2];
                }
            });
        });
    };
    TableLayouts.prototype.toggleActive = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + id + "/active");
                        return [4, this.http.getClient().patch(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new TableLayoutToggleActiveFailed();
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 2:
                        error_8 = _a.sent();
                        throw new TableLayoutToggleActiveFailed(error_8.message, { error: error_8 });
                    case 3: return [2];
                }
            });
        });
    };
    TableLayouts.baseEndpoint = '/api/v1/table_layouts';
    return TableLayouts;
}(base_1.ThBaseHandler));
exports.TableLayouts = TableLayouts;
var TableLayoutsFetchFailed = (function (_super) {
    tslib_1.__extends(TableLayoutsFetchFailed, _super);
    function TableLayoutsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch table layouts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutsFetchFailed';
        Object.setPrototypeOf(_this, TableLayoutsFetchFailed.prototype);
        return _this;
    }
    return TableLayoutsFetchFailed;
}(errors_1.BaseError));
exports.TableLayoutsFetchFailed = TableLayoutsFetchFailed;
var TableLayoutsMetaFailed = (function (_super) {
    tslib_1.__extends(TableLayoutsMetaFailed, _super);
    function TableLayoutsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get table layouts metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutsMetaFailed';
        Object.setPrototypeOf(_this, TableLayoutsMetaFailed.prototype);
        return _this;
    }
    return TableLayoutsMetaFailed;
}(errors_1.BaseError));
exports.TableLayoutsMetaFailed = TableLayoutsMetaFailed;
var TableLayoutFetchFailed = (function (_super) {
    tslib_1.__extends(TableLayoutFetchFailed, _super);
    function TableLayoutFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch table layout'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutFetchFailed';
        Object.setPrototypeOf(_this, TableLayoutFetchFailed.prototype);
        return _this;
    }
    return TableLayoutFetchFailed;
}(errors_1.BaseError));
exports.TableLayoutFetchFailed = TableLayoutFetchFailed;
var TableLayoutPutFailed = (function (_super) {
    tslib_1.__extends(TableLayoutPutFailed, _super);
    function TableLayoutPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter table layout'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutPutFailed';
        Object.setPrototypeOf(_this, TableLayoutPutFailed.prototype);
        return _this;
    }
    return TableLayoutPutFailed;
}(errors_1.BaseError));
exports.TableLayoutPutFailed = TableLayoutPutFailed;
var TableLayoutCreateFailed = (function (_super) {
    tslib_1.__extends(TableLayoutCreateFailed, _super);
    function TableLayoutCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create table layout'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutCreateFailed';
        Object.setPrototypeOf(_this, TableLayoutCreateFailed.prototype);
        return _this;
    }
    return TableLayoutCreateFailed;
}(errors_1.BaseError));
exports.TableLayoutCreateFailed = TableLayoutCreateFailed;
var TableLayoutDeleteFailed = (function (_super) {
    tslib_1.__extends(TableLayoutDeleteFailed, _super);
    function TableLayoutDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete table layout'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutDeleteFailed';
        Object.setPrototypeOf(_this, TableLayoutDeleteFailed.prototype);
        return _this;
    }
    return TableLayoutDeleteFailed;
}(errors_1.BaseError));
exports.TableLayoutDeleteFailed = TableLayoutDeleteFailed;
var TableLayoutDuplicateFailed = (function (_super) {
    tslib_1.__extends(TableLayoutDuplicateFailed, _super);
    function TableLayoutDuplicateFailed(message, properties) {
        if (message === void 0) { message = 'Could not duplicate table layout'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutDuplicateFailed';
        Object.setPrototypeOf(_this, TableLayoutDuplicateFailed.prototype);
        return _this;
    }
    return TableLayoutDuplicateFailed;
}(errors_1.BaseError));
exports.TableLayoutDuplicateFailed = TableLayoutDuplicateFailed;
var TableLayoutToggleActiveFailed = (function (_super) {
    tslib_1.__extends(TableLayoutToggleActiveFailed, _super);
    function TableLayoutToggleActiveFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter table layout'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TableLayoutToggleActiveFailed';
        Object.setPrototypeOf(_this, TableLayoutToggleActiveFailed.prototype);
        return _this;
    }
    return TableLayoutToggleActiveFailed;
}(errors_1.BaseError));
exports.TableLayoutToggleActiveFailed = TableLayoutToggleActiveFailed;
//# sourceMappingURL=table-layouts.js.map