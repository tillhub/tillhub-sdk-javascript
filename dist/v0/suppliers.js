"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersExportFailed = exports.SupplierDeleteFailed = exports.SuppliersSearchFailed = exports.SuppliersCountFailed = exports.SuppliersMetaFailed = exports.SuppliersBulkCreateFailed = exports.SupplierCreationFailed = exports.SupplierNoteCreationFailed = exports.SupplierPutFailed = exports.SupplierFetchFailed = exports.SuppliersFetchFailed = exports.Suppliers = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Suppliers = (function (_super) {
    tslib_1.__extends(Suppliers, _super);
    function Suppliers(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Suppliers.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Suppliers.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Suppliers.prototype.getAll = function (query) {
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
                            throw new SuppliersFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new SuppliersFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.prototype.get = function (supplierId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + supplierId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SupplierFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new SupplierFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.prototype.put = function (supplierId, supplier) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + supplierId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, supplier)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SupplierPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new SupplierPutFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.prototype.create = function (supplier, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, supplier)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SupplierCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new SupplierCreationFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.prototype.bulkCreate = function (suppliers, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/import');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, suppliers)];
                    case 2:
                        response = _a.sent();
                        if (![200, 409].includes(response.status)) {
                            throw new SuppliersBulkCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: {
                                    created_suppliers: response.data.created_suppliers,
                                    invalid_suppliers: response.data.invalid_suppliers,
                                    updated_suppliers: response.data.updated_suppliers
                                },
                                metadata: {
                                    count: response.data.count
                                },
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new SuppliersBulkCreateFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new SuppliersMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new SuppliersMetaFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.prototype.delete = function (supplierId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + supplierId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SupplierDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw new SupplierDeleteFailed(error_7.message, { error: error_7 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/export');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersExportFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg
                            }];
                    case 3:
                        error_8 = _a.sent();
                        throw new SuppliersExportFailed(error_8.message, { error: error_8 });
                    case 4: return [2];
                }
            });
        });
    };
    Suppliers.baseEndpoint = '/api/v0/business-partners';
    return Suppliers;
}(base_1.ThBaseHandler));
exports.Suppliers = Suppliers;
var SuppliersFetchFailed = (function (_super) {
    tslib_1.__extends(SuppliersFetchFailed, _super);
    function SuppliersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch suppliers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersFetchFailed';
        Object.setPrototypeOf(_this, SuppliersFetchFailed.prototype);
        return _this;
    }
    return SuppliersFetchFailed;
}(errors_1.BaseError));
exports.SuppliersFetchFailed = SuppliersFetchFailed;
var SupplierFetchFailed = (function (_super) {
    tslib_1.__extends(SupplierFetchFailed, _super);
    function SupplierFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch supplier'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SupplierFetchFailed';
        Object.setPrototypeOf(_this, SupplierFetchFailed.prototype);
        return _this;
    }
    return SupplierFetchFailed;
}(errors_1.BaseError));
exports.SupplierFetchFailed = SupplierFetchFailed;
var SupplierPutFailed = (function (_super) {
    tslib_1.__extends(SupplierPutFailed, _super);
    function SupplierPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter supplier'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SupplierPutFailed';
        Object.setPrototypeOf(_this, SupplierPutFailed.prototype);
        return _this;
    }
    return SupplierPutFailed;
}(errors_1.BaseError));
exports.SupplierPutFailed = SupplierPutFailed;
var SupplierNoteCreationFailed = (function (_super) {
    tslib_1.__extends(SupplierNoteCreationFailed, _super);
    function SupplierNoteCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create supplier note'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SupplierNoteCreationFailed';
        Object.setPrototypeOf(_this, SupplierNoteCreationFailed.prototype);
        return _this;
    }
    return SupplierNoteCreationFailed;
}(errors_1.BaseError));
exports.SupplierNoteCreationFailed = SupplierNoteCreationFailed;
var SupplierCreationFailed = (function (_super) {
    tslib_1.__extends(SupplierCreationFailed, _super);
    function SupplierCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create supplier'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SupplierCreationFailed';
        Object.setPrototypeOf(_this, SupplierCreationFailed.prototype);
        return _this;
    }
    return SupplierCreationFailed;
}(errors_1.BaseError));
exports.SupplierCreationFailed = SupplierCreationFailed;
var SuppliersBulkCreateFailed = (function (_super) {
    tslib_1.__extends(SuppliersBulkCreateFailed, _super);
    function SuppliersBulkCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk create the suppliers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersBulkCreateFailed';
        Object.setPrototypeOf(_this, SuppliersBulkCreateFailed.prototype);
        return _this;
    }
    return SuppliersBulkCreateFailed;
}(errors_1.BaseError));
exports.SuppliersBulkCreateFailed = SuppliersBulkCreateFailed;
var SuppliersMetaFailed = (function (_super) {
    tslib_1.__extends(SuppliersMetaFailed, _super);
    function SuppliersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get suppliers metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersMetaFailed';
        Object.setPrototypeOf(_this, SuppliersMetaFailed.prototype);
        return _this;
    }
    return SuppliersMetaFailed;
}(errors_1.BaseError));
exports.SuppliersMetaFailed = SuppliersMetaFailed;
var SuppliersCountFailed = (function (_super) {
    tslib_1.__extends(SuppliersCountFailed, _super);
    function SuppliersCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count suppliers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersCountFailed';
        Object.setPrototypeOf(_this, SuppliersCountFailed.prototype);
        return _this;
    }
    return SuppliersCountFailed;
}(errors_1.BaseError));
exports.SuppliersCountFailed = SuppliersCountFailed;
var SuppliersSearchFailed = (function (_super) {
    tslib_1.__extends(SuppliersSearchFailed, _super);
    function SuppliersSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for supplier'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersSearchFailed';
        Object.setPrototypeOf(_this, SuppliersSearchFailed.prototype);
        return _this;
    }
    return SuppliersSearchFailed;
}(errors_1.BaseError));
exports.SuppliersSearchFailed = SuppliersSearchFailed;
var SupplierDeleteFailed = (function (_super) {
    tslib_1.__extends(SupplierDeleteFailed, _super);
    function SupplierDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the supplier'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SupplierDeleteFailed';
        Object.setPrototypeOf(_this, SupplierDeleteFailed.prototype);
        return _this;
    }
    return SupplierDeleteFailed;
}(errors_1.BaseError));
exports.SupplierDeleteFailed = SupplierDeleteFailed;
var SuppliersExportFailed = (function (_super) {
    tslib_1.__extends(SuppliersExportFailed, _super);
    function SuppliersExportFailed(message, properties) {
        if (message === void 0) { message = 'Could not export suppliers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersExportFailed';
        Object.setPrototypeOf(_this, SuppliersExportFailed.prototype);
        return _this;
    }
    return SuppliersExportFailed;
}(errors_1.BaseError));
exports.SuppliersExportFailed = SuppliersExportFailed;
//# sourceMappingURL=suppliers.js.map