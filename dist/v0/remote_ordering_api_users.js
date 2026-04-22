"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteOrderingApiUserDeleteFailed = exports.RemoteOrderingApiUserUpdateFailed = exports.RemoteOrderingApiUserCreateFailed = exports.RemoteOrderingApiUserFetchFailed = exports.RemoteOrderingApiUsers = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var RemoteOrderingApiUsers = (function (_super) {
    tslib_1.__extends(RemoteOrderingApiUsers, _super);
    function RemoteOrderingApiUsers(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: RemoteOrderingApiUsers.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = RemoteOrderingApiUsers.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    RemoteOrderingApiUsers.prototype.get = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, rows, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/service-accounts');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            throw new RemoteOrderingApiUserFetchFailed(undefined, {
                                status: response.status
                            });
                        }
                        rows = Array.isArray(response.data.results) ? response.data.results : [];
                        return [2, {
                                data: rows,
                                msg: response.data.msg,
                                metadata: {
                                    count: (_a = response.data.count) !== null && _a !== void 0 ? _a : rows.length
                                }
                            }];
                    case 3:
                        error_1 = _b.sent();
                        if (error_1 instanceof RemoteOrderingApiUserFetchFailed)
                            throw error_1;
                        throw new RemoteOrderingApiUserFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingApiUsers.prototype.create = function (payload) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, body, response, row, error_2;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/service-accounts');
                        uri = this.uriHelper.generateUriWithQuery(base);
                        body = {
                            partner: payload.partner,
                            password: payload.password
                        };
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _d.sent();
                        if (response.status !== 200 && response.status !== 201) {
                            throw new RemoteOrderingApiUserCreateFailed(undefined, {
                                status: response.status
                            });
                        }
                        row = (_a = response.data.results) === null || _a === void 0 ? void 0 : _a[0];
                        return [2, {
                                data: row !== null && row !== void 0 ? row : null,
                                msg: response.data.msg,
                                metadata: {
                                    count: (_b = response.data.count) !== null && _b !== void 0 ? _b : (_c = response.data.results) === null || _c === void 0 ? void 0 : _c.length
                                }
                            }];
                    case 3:
                        error_2 = _d.sent();
                        if (error_2 instanceof RemoteOrderingApiUserCreateFailed)
                            throw error_2;
                        throw new RemoteOrderingApiUserCreateFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingApiUsers.prototype.delete = function (serviceAccountId) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var id, base, uri, response, row, error_3;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        id = typeof serviceAccountId === 'string' ? serviceAccountId.trim() : '';
                        if (!id) {
                            throw new RemoteOrderingApiUserDeleteFailed('serviceAccountId is required to delete a remote ordering API user', {});
                        }
                        base = this.uriHelper.generateBaseUri('/service-accounts');
                        uri = this.uriHelper.generateUriWithQuery(base + "/" + encodeURIComponent(id));
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _e.sent();
                        if (response.status !== 200 && response.status !== 204) {
                            throw new RemoteOrderingApiUserDeleteFailed(undefined, {
                                status: response.status
                            });
                        }
                        row = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.results) === null || _b === void 0 ? void 0 : _b[0];
                        return [2, {
                                data: row !== null && row !== void 0 ? row : null,
                                msg: (_c = response.data) === null || _c === void 0 ? void 0 : _c.msg,
                                metadata: {
                                    count: (_d = response.data) === null || _d === void 0 ? void 0 : _d.count
                                }
                            }];
                    case 3:
                        error_3 = _e.sent();
                        if (error_3 instanceof RemoteOrderingApiUserDeleteFailed)
                            throw error_3;
                        throw new RemoteOrderingApiUserDeleteFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    RemoteOrderingApiUsers.baseEndpoint = '/api/v0/remote-ordering-inner';
    return RemoteOrderingApiUsers;
}(base_1.ThBaseHandler));
exports.RemoteOrderingApiUsers = RemoteOrderingApiUsers;
var RemoteOrderingApiUserFetchFailed = (function (_super) {
    tslib_1.__extends(RemoteOrderingApiUserFetchFailed, _super);
    function RemoteOrderingApiUserFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch remote ordering API user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RemoteOrderingApiUserFetchFailed';
        Object.setPrototypeOf(_this, RemoteOrderingApiUserFetchFailed.prototype);
        return _this;
    }
    return RemoteOrderingApiUserFetchFailed;
}(baseError_1.BaseError));
exports.RemoteOrderingApiUserFetchFailed = RemoteOrderingApiUserFetchFailed;
var RemoteOrderingApiUserCreateFailed = (function (_super) {
    tslib_1.__extends(RemoteOrderingApiUserCreateFailed, _super);
    function RemoteOrderingApiUserCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create remote ordering API user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RemoteOrderingApiUserCreateFailed';
        Object.setPrototypeOf(_this, RemoteOrderingApiUserCreateFailed.prototype);
        return _this;
    }
    return RemoteOrderingApiUserCreateFailed;
}(baseError_1.BaseError));
exports.RemoteOrderingApiUserCreateFailed = RemoteOrderingApiUserCreateFailed;
var RemoteOrderingApiUserUpdateFailed = (function (_super) {
    tslib_1.__extends(RemoteOrderingApiUserUpdateFailed, _super);
    function RemoteOrderingApiUserUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update remote ordering API user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RemoteOrderingApiUserUpdateFailed';
        Object.setPrototypeOf(_this, RemoteOrderingApiUserUpdateFailed.prototype);
        return _this;
    }
    return RemoteOrderingApiUserUpdateFailed;
}(baseError_1.BaseError));
exports.RemoteOrderingApiUserUpdateFailed = RemoteOrderingApiUserUpdateFailed;
var RemoteOrderingApiUserDeleteFailed = (function (_super) {
    tslib_1.__extends(RemoteOrderingApiUserDeleteFailed, _super);
    function RemoteOrderingApiUserDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete remote ordering API user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RemoteOrderingApiUserDeleteFailed';
        Object.setPrototypeOf(_this, RemoteOrderingApiUserDeleteFailed.prototype);
        return _this;
    }
    return RemoteOrderingApiUserDeleteFailed;
}(baseError_1.BaseError));
exports.RemoteOrderingApiUserDeleteFailed = RemoteOrderingApiUserDeleteFailed;
//# sourceMappingURL=remote_ordering_api_users.js.map