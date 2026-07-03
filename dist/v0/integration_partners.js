"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationPartnerRestoreFailed = exports.IntegrationPartnerDeleteFailed = exports.IntegrationPartnerUpdateFailed = exports.IntegrationPartnerCreateFailed = exports.IntegrationPartnerFetchFailed = exports.IntegrationPartnersFetchFailed = exports.IntegrationPartnersFailed = exports.IntegrationPartners = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var IntegrationPartners = (function (_super) {
    tslib_1.__extends(IntegrationPartners, _super);
    function IntegrationPartners(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: IntegrationPartners.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = IntegrationPartners.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    IntegrationPartners.prototype.partnerPath = function (integrationPartnerId) {
        var id = typeof integrationPartnerId === 'string' ? integrationPartnerId.trim() : '';
        if (!id) {
            throw new IntegrationPartnersFailed('integrationPartnerId is required for integration partner requests', {});
        }
        return "/" + encodeURIComponent(id);
    };
    IntegrationPartners.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, rows, next, cursorNext_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _g.sent();
                        if (response.status !== 200) {
                            throw new IntegrationPartnersFetchFailed(undefined, {
                                status: response.status
                            });
                        }
                        rows = Array.isArray(response.data.results) ? response.data.results : [];
                        next = void 0;
                        cursorNext_1 = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.cursors) === null || _b === void 0 ? void 0 : _b.after) !== null && _c !== void 0 ? _c : (_e = (_d = response.data) === null || _d === void 0 ? void 0 : _d.cursor) === null || _e === void 0 ? void 0 : _e.next;
                        if (cursorNext_1) {
                            next = function () {
                                return _this.getAll({ uri: cursorNext_1 });
                            };
                        }
                        return [2, {
                                data: rows,
                                msg: response.data.msg,
                                metadata: {
                                    count: (_f = response.data.count) !== null && _f !== void 0 ? _f : rows.length
                                },
                                next: next
                            }];
                    case 3:
                        error_1 = _g.sent();
                        if (error_1 instanceof IntegrationPartnersFetchFailed)
                            throw error_1;
                        throw new IntegrationPartnersFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    IntegrationPartners.prototype.listAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var aggregated, page, _i, _a, row, _b, _c, row;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        aggregated = [];
                        return [4, this.getAll(query)];
                    case 1:
                        page = _d.sent();
                        for (_i = 0, _a = page.data; _i < _a.length; _i++) {
                            row = _a[_i];
                            aggregated.push(row);
                        }
                        _d.label = 2;
                    case 2:
                        if (!page.next) return [3, 4];
                        return [4, page.next()];
                    case 3:
                        page = _d.sent();
                        for (_b = 0, _c = page.data; _b < _c.length; _b++) {
                            row = _c[_b];
                            aggregated.push(row);
                        }
                        return [3, 2];
                    case 4: return [2, aggregated];
                }
            });
        });
    };
    IntegrationPartners.prototype.get = function (integrationPartnerId) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri(this.partnerPath(integrationPartnerId));
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200) {
                            throw new IntegrationPartnerFetchFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: ((_b = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null),
                                msg: response.data.msg,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 3:
                        error_2 = _c.sent();
                        if (error_2 instanceof IntegrationPartnerFetchFailed)
                            throw error_2;
                        throw new IntegrationPartnerFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    IntegrationPartners.prototype.create = function (body) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200 && response.status !== 201) {
                            throw new IntegrationPartnerCreateFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: ((_b = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null),
                                msg: response.data.msg,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 3:
                        error_3 = _c.sent();
                        if (error_3 instanceof IntegrationPartnerCreateFailed)
                            throw error_3;
                        throw new IntegrationPartnerCreateFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    IntegrationPartners.prototype.update = function (integrationPartnerId, body) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri(this.partnerPath(integrationPartnerId));
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, body)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200) {
                            throw new IntegrationPartnerUpdateFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: ((_b = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null),
                                msg: response.data.msg,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 3:
                        error_4 = _c.sent();
                        if (error_4 instanceof IntegrationPartnerUpdateFailed)
                            throw error_4;
                        throw new IntegrationPartnerUpdateFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    IntegrationPartners.prototype.delete = function (integrationPartnerId) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri(this.partnerPath(integrationPartnerId));
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _f.sent();
                        if (response.status !== 200 && response.status !== 204) {
                            throw new IntegrationPartnerDeleteFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: ((_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null),
                                msg: (_d = response.data) === null || _d === void 0 ? void 0 : _d.msg,
                                metadata: {
                                    count: (_e = response.data) === null || _e === void 0 ? void 0 : _e.count
                                }
                            }];
                    case 3:
                        error_5 = _f.sent();
                        if (error_5 instanceof IntegrationPartnerDeleteFailed)
                            throw error_5;
                        throw new IntegrationPartnerDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    IntegrationPartners.prototype.restore = function (integrationPartnerId) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri(this.partnerPath(integrationPartnerId) + "/restore");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200) {
                            throw new IntegrationPartnerRestoreFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: ((_b = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null),
                                msg: response.data.msg,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 3:
                        error_6 = _c.sent();
                        if (error_6 instanceof IntegrationPartnerRestoreFailed)
                            throw error_6;
                        throw new IntegrationPartnerRestoreFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    IntegrationPartners.baseEndpoint = '/api/v0/integration-partners';
    return IntegrationPartners;
}(base_1.ThBaseHandler));
exports.IntegrationPartners = IntegrationPartners;
var IntegrationPartnersFailed = (function (_super) {
    tslib_1.__extends(IntegrationPartnersFailed, _super);
    function IntegrationPartnersFailed(message, properties) {
        if (message === void 0) { message = 'Integration partner request failed'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationPartnersFailed';
        Object.setPrototypeOf(_this, IntegrationPartnersFailed.prototype);
        return _this;
    }
    return IntegrationPartnersFailed;
}(baseError_1.BaseError));
exports.IntegrationPartnersFailed = IntegrationPartnersFailed;
var IntegrationPartnersFetchFailed = (function (_super) {
    tslib_1.__extends(IntegrationPartnersFetchFailed, _super);
    function IntegrationPartnersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch integration partners'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationPartnersFetchFailed';
        Object.setPrototypeOf(_this, IntegrationPartnersFetchFailed.prototype);
        return _this;
    }
    return IntegrationPartnersFetchFailed;
}(baseError_1.BaseError));
exports.IntegrationPartnersFetchFailed = IntegrationPartnersFetchFailed;
var IntegrationPartnerFetchFailed = (function (_super) {
    tslib_1.__extends(IntegrationPartnerFetchFailed, _super);
    function IntegrationPartnerFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch integration partner'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationPartnerFetchFailed';
        Object.setPrototypeOf(_this, IntegrationPartnerFetchFailed.prototype);
        return _this;
    }
    return IntegrationPartnerFetchFailed;
}(baseError_1.BaseError));
exports.IntegrationPartnerFetchFailed = IntegrationPartnerFetchFailed;
var IntegrationPartnerCreateFailed = (function (_super) {
    tslib_1.__extends(IntegrationPartnerCreateFailed, _super);
    function IntegrationPartnerCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create integration partner'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationPartnerCreateFailed';
        Object.setPrototypeOf(_this, IntegrationPartnerCreateFailed.prototype);
        return _this;
    }
    return IntegrationPartnerCreateFailed;
}(baseError_1.BaseError));
exports.IntegrationPartnerCreateFailed = IntegrationPartnerCreateFailed;
var IntegrationPartnerUpdateFailed = (function (_super) {
    tslib_1.__extends(IntegrationPartnerUpdateFailed, _super);
    function IntegrationPartnerUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update integration partner'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationPartnerUpdateFailed';
        Object.setPrototypeOf(_this, IntegrationPartnerUpdateFailed.prototype);
        return _this;
    }
    return IntegrationPartnerUpdateFailed;
}(baseError_1.BaseError));
exports.IntegrationPartnerUpdateFailed = IntegrationPartnerUpdateFailed;
var IntegrationPartnerDeleteFailed = (function (_super) {
    tslib_1.__extends(IntegrationPartnerDeleteFailed, _super);
    function IntegrationPartnerDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete integration partner'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationPartnerDeleteFailed';
        Object.setPrototypeOf(_this, IntegrationPartnerDeleteFailed.prototype);
        return _this;
    }
    return IntegrationPartnerDeleteFailed;
}(baseError_1.BaseError));
exports.IntegrationPartnerDeleteFailed = IntegrationPartnerDeleteFailed;
var IntegrationPartnerRestoreFailed = (function (_super) {
    tslib_1.__extends(IntegrationPartnerRestoreFailed, _super);
    function IntegrationPartnerRestoreFailed(message, properties) {
        if (message === void 0) { message = 'Could not restore integration partner'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IntegrationPartnerRestoreFailed';
        Object.setPrototypeOf(_this, IntegrationPartnerRestoreFailed.prototype);
        return _this;
    }
    return IntegrationPartnerRestoreFailed;
}(baseError_1.BaseError));
exports.IntegrationPartnerRestoreFailed = IntegrationPartnerRestoreFailed;
//# sourceMappingURL=integration_partners.js.map