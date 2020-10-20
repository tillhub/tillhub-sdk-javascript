"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenCreationFailed = exports.UserDeleteFailed = exports.UserCreationFailed = exports.UserPutFailed = exports.UserFetchFailed = exports.UsersFetchFailed = exports.Users = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Users = (function (_super) {
    tslib_1.__extends(Users, _super);
    function Users(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: Users.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        if (options.configurationId) {
            _this.configurationId = options.configurationId;
        }
        _this.endpoint = Users.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Users.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.configurationId) {
                            throw new TypeError('fetching users requires configuration ID to be set.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/" + this.configurationId + "/users");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UsersFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new UsersFetchFailed(undefined, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Users.prototype.get = function (userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.configurationId) {
                            throw new TypeError('fetching users requires configuration ID to be set.');
                        }
                        uri = this.uriHelper.generateBaseUri("/" + this.configurationId + "/users/" + userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UsersFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new UserFetchFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Users.prototype.put = function (userId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.configurationId) {
                            throw new TypeError('fetching users requires configuration ID to be set.');
                        }
                        uri = this.uriHelper.generateBaseUri("/" + this.configurationId + "/users/" + userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, user)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new UserPutFailed(undefined, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Users.prototype.create = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.configurationId) {
                            throw new TypeError('fetching users requires configuration ID to be set.');
                        }
                        uri = this.uriHelper.generateBaseUri("/" + this.configurationId + "/users");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, user)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new UserCreationFailed(undefined, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Users.prototype.delete = function (userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.configurationId) {
                            throw new TypeError('deleting user requires configuration ID to be set.');
                        }
                        uri = this.uriHelper.generateBaseUri("/" + this.configurationId + "/users/" + userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UserDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new UserDeleteFailed(undefined, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    Users.prototype.createToken = function (userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.configurationId) {
                            throw new TypeError('fetching users requires configuration ID to be set.');
                        }
                        uri = this.uriHelper.generateBaseUri("/" + this.configurationId + "/users/" + userId + "/api/key");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw new UserTokenCreationFailed(undefined, { error: error_6 });
                    case 4: return [2];
                }
            });
        });
    };
    Users.baseEndpoint = '/api/v0/configurations';
    return Users;
}(base_1.ThBaseHandler));
exports.Users = Users;
var UsersFetchFailed = (function (_super) {
    tslib_1.__extends(UsersFetchFailed, _super);
    function UsersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UsersFetchFailed';
        Object.setPrototypeOf(_this, UsersFetchFailed.prototype);
        return _this;
    }
    return UsersFetchFailed;
}(baseError_1.BaseError));
exports.UsersFetchFailed = UsersFetchFailed;
var UserFetchFailed = (function (_super) {
    tslib_1.__extends(UserFetchFailed, _super);
    function UserFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserFetchFailed';
        Object.setPrototypeOf(_this, UserFetchFailed.prototype);
        return _this;
    }
    return UserFetchFailed;
}(baseError_1.BaseError));
exports.UserFetchFailed = UserFetchFailed;
var UserPutFailed = (function (_super) {
    tslib_1.__extends(UserPutFailed, _super);
    function UserPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPutFailed';
        Object.setPrototypeOf(_this, UserPutFailed.prototype);
        return _this;
    }
    return UserPutFailed;
}(baseError_1.BaseError));
exports.UserPutFailed = UserPutFailed;
var UserCreationFailed = (function (_super) {
    tslib_1.__extends(UserCreationFailed, _super);
    function UserCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserCreationFailed';
        Object.setPrototypeOf(_this, UserCreationFailed.prototype);
        return _this;
    }
    return UserCreationFailed;
}(baseError_1.BaseError));
exports.UserCreationFailed = UserCreationFailed;
var UserDeleteFailed = (function (_super) {
    tslib_1.__extends(UserDeleteFailed, _super);
    function UserDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserDeleteFailed';
        Object.setPrototypeOf(_this, UserDeleteFailed.prototype);
        return _this;
    }
    return UserDeleteFailed;
}(baseError_1.BaseError));
exports.UserDeleteFailed = UserDeleteFailed;
var UserTokenCreationFailed = (function (_super) {
    tslib_1.__extends(UserTokenCreationFailed, _super);
    function UserTokenCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create token'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserTokenCreationFailed';
        Object.setPrototypeOf(_this, UserTokenCreationFailed.prototype);
        return _this;
    }
    return UserTokenCreationFailed;
}(baseError_1.BaseError));
exports.UserTokenCreationFailed = UserTokenCreationFailed;
//# sourceMappingURL=users.js.map