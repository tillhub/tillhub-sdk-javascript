"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionsTemplatesDeleteFailed = exports.UserPermissionsTemplatesCreationFailed = exports.UserPermissionsTemplatesUpdateFailed = exports.UserPermissionsTemplatesFetchOneFailed = exports.UserPermissionsTemplatesFetchFailed = exports.UserPermissionsTemplates = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var UserPermissionsTemplates = (function (_super) {
    tslib_1.__extends(UserPermissionsTemplates, _super);
    function UserPermissionsTemplates(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: UserPermissionsTemplates.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = UserPermissionsTemplates.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    UserPermissionsTemplates.prototype.create = function (template) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, template)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UserPermissionsTemplatesCreationFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new UserPermissionsTemplatesCreationFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    UserPermissionsTemplates.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUri, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UserPermissionsTemplatesFetchFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new UserPermissionsTemplatesFetchFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    UserPermissionsTemplates.prototype.get = function (templateId, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUri, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri("/" + templateId);
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UserPermissionsTemplatesFetchOneFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: 1 }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new UserPermissionsTemplatesFetchOneFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    UserPermissionsTemplates.prototype.update = function (templateId, template) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        return [4, this.http.getClient().put(uri, template)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UserPermissionsTemplatesUpdateFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new UserPermissionsTemplatesUpdateFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    UserPermissionsTemplates.prototype.delete = function (templateId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new UserPermissionsTemplatesDeleteFailed(undefined, {
                                status: response.status
                            });
                        }
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new UserPermissionsTemplatesDeleteFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    UserPermissionsTemplates.baseEndpoint = '/api/v0/user_permission_templates';
    return UserPermissionsTemplates;
}(base_1.ThBaseHandler));
exports.UserPermissionsTemplates = UserPermissionsTemplates;
var UserPermissionsTemplatesFetchFailed = (function (_super) {
    tslib_1.__extends(UserPermissionsTemplatesFetchFailed, _super);
    function UserPermissionsTemplatesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all user permissions templates'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPermissionsTemplatesFetchFailed';
        return _this;
    }
    return UserPermissionsTemplatesFetchFailed;
}(errors_1.BaseError));
exports.UserPermissionsTemplatesFetchFailed = UserPermissionsTemplatesFetchFailed;
var UserPermissionsTemplatesFetchOneFailed = (function (_super) {
    tslib_1.__extends(UserPermissionsTemplatesFetchOneFailed, _super);
    function UserPermissionsTemplatesFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one user permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPermissionsTemplatesFetchOneFailed';
        return _this;
    }
    return UserPermissionsTemplatesFetchOneFailed;
}(errors_1.BaseError));
exports.UserPermissionsTemplatesFetchOneFailed = UserPermissionsTemplatesFetchOneFailed;
var UserPermissionsTemplatesUpdateFailed = (function (_super) {
    tslib_1.__extends(UserPermissionsTemplatesUpdateFailed, _super);
    function UserPermissionsTemplatesUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update user permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPermissionsTemplatesUpdateFailed';
        return _this;
    }
    return UserPermissionsTemplatesUpdateFailed;
}(errors_1.BaseError));
exports.UserPermissionsTemplatesUpdateFailed = UserPermissionsTemplatesUpdateFailed;
var UserPermissionsTemplatesCreationFailed = (function (_super) {
    tslib_1.__extends(UserPermissionsTemplatesCreationFailed, _super);
    function UserPermissionsTemplatesCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create user permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPermissionsTemplatesCreationFailed';
        return _this;
    }
    return UserPermissionsTemplatesCreationFailed;
}(errors_1.BaseError));
exports.UserPermissionsTemplatesCreationFailed = UserPermissionsTemplatesCreationFailed;
var UserPermissionsTemplatesDeleteFailed = (function (_super) {
    tslib_1.__extends(UserPermissionsTemplatesDeleteFailed, _super);
    function UserPermissionsTemplatesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete user permissions template'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPermissionsTemplatesDeleteFailed';
        return _this;
    }
    return UserPermissionsTemplatesDeleteFailed;
}(errors_1.BaseError));
exports.UserPermissionsTemplatesDeleteFailed = UserPermissionsTemplatesDeleteFailed;
//# sourceMappingURL=user_permissions_templates.js.map