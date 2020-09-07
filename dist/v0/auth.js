"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutFailed = exports.LogoutMissingToken = exports.Auth = exports.isOrgAuth = exports.isTokenAuth = exports.isKeyAuth = exports.isUsernameAuth = exports.AuthTypes = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var errors = tslib_1.__importStar(require("../errors"));
var client_1 = require("../client");
var AuthTypes;
(function (AuthTypes) {
    AuthTypes[AuthTypes["username"] = 1] = "username";
    AuthTypes[AuthTypes["key"] = 2] = "key";
    AuthTypes[AuthTypes["token"] = 3] = "token";
    AuthTypes[AuthTypes["org"] = 4] = "org";
    AuthTypes[AuthTypes["support"] = 5] = "support";
})(AuthTypes = exports.AuthTypes || (exports.AuthTypes = {}));
function isUsernameAuth(obj) {
    return 'password' in obj;
}
exports.isUsernameAuth = isUsernameAuth;
function isKeyAuth(obj) {
    return 'apiKey' in obj;
}
exports.isKeyAuth = isKeyAuth;
function isTokenAuth(obj) {
    return 'token' in obj;
}
exports.isTokenAuth = isTokenAuth;
function isOrgAuth(obj) {
    return 'organisation' in obj;
}
exports.isOrgAuth = isOrgAuth;
var Auth = (function () {
    function Auth(options) {
        this.authenticated = false;
        this.options = options;
        this.options.base = this.options.base || 'https://api.tillhub.com';
        if (!this.options.credentials)
            return;
        this.determineAuthType();
        if (this.options.user && this.options.type === AuthTypes.token) {
            this.setDefaultHeader(this.options.user, this.options.credentials.token);
        }
    }
    Auth.prototype.clearInstance = function () {
        this.authenticated = false;
        this.options.credentials = undefined;
        this.options.token = undefined;
        this.options.user = undefined;
        this.options.type = undefined;
    };
    Auth.prototype.determineAuthType = function () {
        if (isUsernameAuth(this.options.credentials))
            this.options.type = AuthTypes.username;
        if (isKeyAuth(this.options.credentials))
            this.options.type = AuthTypes.key;
        if (isTokenAuth(this.options.credentials))
            this.options.type = AuthTypes.token;
        if (isOrgAuth(this.options.credentials))
            this.options.type = AuthTypes.org;
    };
    Auth.prototype.authenticate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.options.type === AuthTypes.username) {
                    return [2, this.loginUsername(this.options.credentials)];
                }
                throw new errors.AuthenticationFailed('No auth data was provided');
            });
        });
    };
    Auth.prototype.loginUsername = function (authData) {
        if (authData === void 0) { authData = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var username, password, response, err_1, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options.credentials &&
                            this.options.credentials.username &&
                            this.options.credentials.password) {
                            username = this.options.credentials.username;
                            password = this.options.credentials.password;
                        }
                        else if (authData && authData.username && authData.password) {
                            username = authData.username;
                            password = authData.password;
                        }
                        else {
                            throw new errors.UninstantiatedClient();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, axios_1.default.post(this.options.base + "/api/v0/users/login", {
                                email: username,
                                password: password,
                                recaptcha_token: authData.recaptcha_token
                            })];
                    case 2:
                        response = _a.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name,
                                features: response.data.features || {},
                                scopes: response.data.user.scopes,
                                role: response.data.user.role,
                                orgName: response.data.user.display_name,
                                expiresAt: response.data.expires_at
                            }];
                    case 3:
                        err_1 = _a.sent();
                        error = new errors.AuthenticationFailed();
                        err_1.error = err_1;
                        err_1.body = err_1.response && err_1.response.data ? err_1.response.data : null;
                        throw error;
                    case 4: return [2];
                }
            });
        });
    };
    Auth.prototype.requestPasswordReset = function (target) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.options.base + "/api/v0/users/login/reset", {
                                email: target.email
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2, {
                                msg: data.msg
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.PasswordResetRequestFailed(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.setNewPassword = function (nonce) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.options.base + "/api/v0/users/login/reset", {
                                password: nonce.password,
                                password_reset_id: nonce.password_reset_id
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2, {
                                msg: data.msg
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new errors.PasswordSetRequestFailed(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.setDefaultHeader = function (user, token) {
        var clientOptions = {
            headers: {
                Authorization: "Bearer " + token,
                'X-Client-ID': user
            }
        };
        this.token = token;
        this.user = user;
        this.authenticated = true;
        client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    Auth.prototype.logout = function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token && !this.token) {
                            throw new LogoutMissingToken();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, axios_1.default.get(this.options.base + "/api/v0/users/logout", {
                                headers: {
                                    Authorization: "Bearer " + (token || this.token)
                                }
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        return [2, {
                                msg: data.msg
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new LogoutFailed(undefined, { error: err_4 });
                    case 4: return [2];
                }
            });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
var LogoutMissingToken = (function (_super) {
    tslib_1.__extends(LogoutMissingToken, _super);
    function LogoutMissingToken(message, properties) {
        if (message === void 0) { message = 'Could not log out due to missing token.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LogoutMissingToken';
        Object.setPrototypeOf(_this, LogoutMissingToken.prototype);
        return _this;
    }
    return LogoutMissingToken;
}(errors.BaseError));
exports.LogoutMissingToken = LogoutMissingToken;
var LogoutFailed = (function (_super) {
    tslib_1.__extends(LogoutFailed, _super);
    function LogoutFailed(message, properties) {
        if (message === void 0) { message = 'Could not log out.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'LogoutFailed';
        Object.setPrototypeOf(_this, LogoutFailed.prototype);
        return _this;
    }
    return LogoutFailed;
}(errors.BaseError));
exports.LogoutFailed = LogoutFailed;
//# sourceMappingURL=auth.js.map