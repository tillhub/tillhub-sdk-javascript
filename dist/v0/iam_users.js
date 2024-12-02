"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamUserDeleteFailed = exports.IamUserCreationFailed = exports.IamUserPutFailed = exports.IamUserFetchFailed = exports.IamUsersMetaFailed = exports.IamUsersFetchFailed = exports.IamUsers = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var IamUsers = (function (_super) {
    tslib_1.__extends(IamUsers, _super);
    function IamUsers(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: IamUsers.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = IamUsers.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    IamUsers.prototype.getAll = function (query) {
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
                            throw new IamUsersFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.after }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new IamUsersFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    IamUsers.prototype.meta = function (query) {
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
                            throw new IamUsersMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new IamUsersMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    IamUsers.prototype.get = function (iamUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + iamUserId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new IamUserFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new IamUserFetchFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    IamUsers.prototype.put = function (iamUserId, iamUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + iamUserId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, iamUser)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new IamUserPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new IamUserPutFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    IamUsers.prototype.create = function (iamUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, iamUser)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new IamUserCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new IamUserCreationFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    IamUsers.prototype.delete = function (iamUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + iamUserId);
                        uri = this.uriHelper.generateUriWithQuery(base);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new IamUserDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new IamUserDeleteFailed(error_6.message, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    IamUsers.baseEndpoint = '/api/v0/iam-users';
    return IamUsers;
}(base_1.ThBaseHandler));
exports.IamUsers = IamUsers;
var IamUsersFetchFailed = (function (_super) {
    tslib_1.__extends(IamUsersFetchFailed, _super);
    function IamUsersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch iam user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamUsersFetchFailed';
        Object.setPrototypeOf(_this, IamUsersFetchFailed.prototype);
        return _this;
    }
    return IamUsersFetchFailed;
}(baseError_1.BaseError));
exports.IamUsersFetchFailed = IamUsersFetchFailed;
var IamUsersMetaFailed = (function (_super) {
    tslib_1.__extends(IamUsersMetaFailed, _super);
    function IamUsersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta iam user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamUsersMetaFailed';
        Object.setPrototypeOf(_this, IamUsersFetchFailed.prototype);
        return _this;
    }
    return IamUsersMetaFailed;
}(baseError_1.BaseError));
exports.IamUsersMetaFailed = IamUsersMetaFailed;
var IamUserFetchFailed = (function (_super) {
    tslib_1.__extends(IamUserFetchFailed, _super);
    function IamUserFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch iam user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamUserFetchFailed';
        Object.setPrototypeOf(_this, IamUserFetchFailed.prototype);
        return _this;
    }
    return IamUserFetchFailed;
}(baseError_1.BaseError));
exports.IamUserFetchFailed = IamUserFetchFailed;
var IamUserPutFailed = (function (_super) {
    tslib_1.__extends(IamUserPutFailed, _super);
    function IamUserPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter iam user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamUserPutFailed';
        Object.setPrototypeOf(_this, IamUserPutFailed.prototype);
        return _this;
    }
    return IamUserPutFailed;
}(baseError_1.BaseError));
exports.IamUserPutFailed = IamUserPutFailed;
var IamUserCreationFailed = (function (_super) {
    tslib_1.__extends(IamUserCreationFailed, _super);
    function IamUserCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create iam user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamUserCreationFailed';
        Object.setPrototypeOf(_this, IamUserCreationFailed.prototype);
        return _this;
    }
    return IamUserCreationFailed;
}(baseError_1.BaseError));
exports.IamUserCreationFailed = IamUserCreationFailed;
var IamUserDeleteFailed = (function (_super) {
    tslib_1.__extends(IamUserDeleteFailed, _super);
    function IamUserDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamUserDeleteFailed';
        Object.setPrototypeOf(_this, IamUserDeleteFailed.prototype);
        return _this;
    }
    return IamUserDeleteFailed;
}(baseError_1.BaseError));
exports.IamUserDeleteFailed = IamUserDeleteFailed;
//# sourceMappingURL=iam_users.js.map