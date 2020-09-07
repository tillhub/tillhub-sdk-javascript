"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var errors = tslib_1.__importStar(require("../errors"));
var v0 = tslib_1.__importStar(require("../v0"));
var auth_1 = require("../v0/auth");
var Auth = (function (_super) {
    tslib_1.__extends(Auth, _super);
    function Auth(options) {
        var _this = _super.call(this, options) || this;
        _this.authenticated = false;
        _this.options = options;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        if (!_this.options.credentials)
            return _this;
        _this.determineAuthType();
        if (_this.options.user && _this.options.type === auth_1.AuthTypes.token) {
            _this.setDefaultHeader(_this.options.user, _this.options.credentials.token);
        }
        return _this;
    }
    Auth.prototype.authenticate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.options.type === auth_1.AuthTypes.username) {
                    return [2, this.loginUsername(this.options.credentials)];
                }
                if (this.options.type === auth_1.AuthTypes.token) {
                    return [2, this.loginServiceAccount(this.options.credentials)];
                }
                if (this.options.type === auth_1.AuthTypes.org) {
                    return [2, this.loginWithOrganisation(this.options.credentials)];
                }
                if (this.options.type === auth_1.AuthTypes.support) {
                    return [2, this.loginAsSupport(this.options.credentials)];
                }
                throw new errors.AuthenticationFailed('No auth data was provided');
            });
        });
    };
    Auth.prototype.loginServiceAccount = function (authData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, err_1, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.options.base + "/api/v1/users/auth/key", {
                                id: authData.id,
                                api_key: authData.apiKey
                            })];
                    case 1:
                        response = _a.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name
                            }];
                    case 2:
                        err_1 = _a.sent();
                        error = new errors.AuthenticationFailed();
                        err_1.error = err_1;
                        err_1.body = err_1.response && err_1.response.data ? err_1.response.data : null;
                        throw error;
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.loginWithOrganisation = function (authData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, subUser, _a, _b, role, _c, scopes, err_2, error;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.options.base + "/api/v1/users/auth/organisation/login", {
                                organisation: authData.organisation,
                                username: authData.username,
                                password: authData.password,
                                recaptcha_token: authData.recaptcha_token
                            })];
                    case 1:
                        response = _d.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        subUser = response.data.sub_user;
                        _a = subUser || {}, _b = _a.role, role = _b === void 0 ? null : _b, _c = _a.scopes, scopes = _c === void 0 ? [] : _c;
                        return [2, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name,
                                errors: response.data.errors,
                                features: response.data.features,
                                role: role,
                                scopes: scopes,
                                subUser: subUser || null
                            }];
                    case 2:
                        err_2 = _d.sent();
                        error = new errors.AuthenticationFailed();
                        err_2.error = err_2;
                        err_2.body = err_2.response && err_2.response.data ? err_2.response.data : null;
                        throw error;
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.loginAsSupport = function (authData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, err_3, error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.options.base + "/api/v1/users/auth/support/login", {
                                token: authData.token,
                                client_account: authData.client_account,
                                recaptcha_token: authData.recaptcha_token
                            })];
                    case 1:
                        response = _a.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name,
                                scopes: response.data.user.scopes,
                                role: response.data.user.role,
                                is_support: true
                            }];
                    case 2:
                        err_3 = _a.sent();
                        error = new errors.AuthenticationFailed();
                        err_3.error = err_3;
                        err_3.body = err_3.response && err_3.response.data ? err_3.response.data : null;
                        throw error;
                    case 3: return [2];
                }
            });
        });
    };
    return Auth;
}(v0.Auth));
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map