"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteOrderingServiceAccountConfigsFailed = exports.RemoteOrderingServiceAccountConfigs = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var RemoteOrderingServiceAccountConfigs = (function (_super) {
    tslib_1.__extends(RemoteOrderingServiceAccountConfigs, _super);
    function RemoteOrderingServiceAccountConfigs(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: RemoteOrderingServiceAccountConfigs.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = RemoteOrderingServiceAccountConfigs.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    RemoteOrderingServiceAccountConfigs.prototype.basePath = function (serviceAccountId) {
        var id = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : '';
        if (!id) {
            throw new RemoteOrderingServiceAccountConfigsFailed('serviceAccountId is required for service account configuration requests', {});
        }
        return "/service-accounts-configuration/" + encodeURIComponent(id);
    };
    RemoteOrderingServiceAccountConfigs.prototype.list = function (serviceAccountId, query) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, rows, next, cursorNext_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri(this.basePath(serviceAccountId));
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _g.sent();
                        if (response.status !== 200) {
                            throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
                                status: response.status
                            });
                        }
                        rows = Array.isArray(response.data.results) ? response.data.results : [];
                        next = void 0;
                        cursorNext_1 = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.cursors) === null || _b === void 0 ? void 0 : _b.after) !== null && _c !== void 0 ? _c : (_e = (_d = response.data) === null || _d === void 0 ? void 0 : _d.cursor) === null || _e === void 0 ? void 0 : _e.next;
                        if (cursorNext_1) {
                            next = function () {
                                return _this.list(serviceAccountId, { uri: cursorNext_1 });
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
                        if (error_1 instanceof RemoteOrderingServiceAccountConfigsFailed)
                            throw error_1;
                        throw new RemoteOrderingServiceAccountConfigsFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingServiceAccountConfigs.prototype.listAll = function (serviceAccountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var aggregated, page, _i, _a, row, _b, _c, row;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        aggregated = [];
                        return [4, this.list(serviceAccountId)];
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
    RemoteOrderingServiceAccountConfigs.prototype.create = function (serviceAccountId, body) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri(this.basePath(serviceAccountId));
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200 && response.status !== 201) {
                            throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: (_b = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : { success: true },
                                msg: response.data.msg,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 3:
                        error_2 = _c.sent();
                        if (error_2 instanceof RemoteOrderingServiceAccountConfigsFailed)
                            throw error_2;
                        throw new RemoteOrderingServiceAccountConfigsFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingServiceAccountConfigs.prototype.update = function (serviceAccountId, configurationId, body) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var saId, configId, base, uri, response, error_3;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        saId = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : '';
                        configId = typeof configurationId === 'string' ? configurationId.trim() : '';
                        if (!configId) {
                            throw new RemoteOrderingServiceAccountConfigsFailed('configurationId is required to update a service account configuration', {});
                        }
                        base = this.uriHelper.generateBaseUri(this.basePath(saId) + "/configuration/" + encodeURIComponent(configId));
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200) {
                            throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: (_b = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : { success: true },
                                msg: response.data.msg,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 3:
                        error_3 = _c.sent();
                        if (error_3 instanceof RemoteOrderingServiceAccountConfigsFailed)
                            throw error_3;
                        throw new RemoteOrderingServiceAccountConfigsFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingServiceAccountConfigs.prototype.delete = function (serviceAccountId, configurationId) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var saId, configId, base, uri, response, error_4;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        saId = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : '';
                        configId = typeof configurationId === 'string' ? configurationId.trim() : '';
                        if (!configId) {
                            throw new RemoteOrderingServiceAccountConfigsFailed('configurationId is required to delete a service account configuration', {});
                        }
                        base = this.uriHelper.generateBaseUri(this.basePath(saId) + "/configuration/" + encodeURIComponent(configId));
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _f.sent();
                        if (response.status !== 200 && response.status !== 204) {
                            throw new RemoteOrderingServiceAccountConfigsFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : { success: true },
                                msg: (_d = response.data) === null || _d === void 0 ? void 0 : _d.msg,
                                metadata: {
                                    count: (_e = response.data) === null || _e === void 0 ? void 0 : _e.count
                                }
                            }];
                    case 3:
                        error_4 = _f.sent();
                        if (error_4 instanceof RemoteOrderingServiceAccountConfigsFailed)
                            throw error_4;
                        throw new RemoteOrderingServiceAccountConfigsFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingServiceAccountConfigs.baseEndpoint = '/api/v0/remote-ordering-inner';
    return RemoteOrderingServiceAccountConfigs;
}(base_1.ThBaseHandler));
exports.RemoteOrderingServiceAccountConfigs = RemoteOrderingServiceAccountConfigs;
var RemoteOrderingServiceAccountConfigsFailed = (function (_super) {
    tslib_1.__extends(RemoteOrderingServiceAccountConfigsFailed, _super);
    function RemoteOrderingServiceAccountConfigsFailed(message, properties) {
        if (message === void 0) { message = 'Remote ordering service account configuration request failed'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RemoteOrderingServiceAccountConfigsFailed';
        Object.setPrototypeOf(_this, RemoteOrderingServiceAccountConfigsFailed.prototype);
        return _this;
    }
    return RemoteOrderingServiceAccountConfigsFailed;
}(baseError_1.BaseError));
exports.RemoteOrderingServiceAccountConfigsFailed = RemoteOrderingServiceAccountConfigsFailed;
//# sourceMappingURL=remote_ordering_service_account_configs.js.map