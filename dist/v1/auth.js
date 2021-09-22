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
        var _a;
        var _this = _super.call(this, options) || this;
        _this.authenticated = false;
        _this.options = options;
        _this.options.base = (_a = _this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
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
                switch (_a.label) {
                    case 0:
                        if (!(this.options.type === auth_1.AuthTypes.username)) return [3, 2];
                        return [4, this.loginUsername(this.options.credentials)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        if (!(this.options.type === auth_1.AuthTypes.token)) return [3, 4];
                        return [4, this.loginServiceAccount(this.options.credentials)];
                    case 3: return [2, _a.sent()];
                    case 4:
                        if (!(this.options.type === auth_1.AuthTypes.org)) return [3, 6];
                        return [4, this.loginWithOrganisation(this.options.credentials)];
                    case 5: return [2, _a.sent()];
                    case 6:
                        if (!(this.options.type === auth_1.AuthTypes.support)) return [3, 8];
                        return [4, this.loginAsSupport(this.options.credentials)];
                    case 7: return [2, _a.sent()];
                    case 8: throw new errors.AuthenticationFailed('No auth data was provided');
                }
            });
        });
    };
    Auth.prototype.loginServiceAccount = function (authData) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, err_1, error;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.getEndpoint('/api/v1/users/auth/key'), {
                                id: authData.id,
                                api_key: authData.apiKey
                            })];
                    case 1:
                        response = _c.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name
                            }];
                    case 2:
                        err_1 = _c.sent();
                        error = new errors.AuthenticationFailed();
                        err_1.error = err_1;
                        err_1.body = (_b = (_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
                        throw error;
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.loginWithOrganisation = function (authData) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, subUser, _c, _d, role, _e, scopes, err_2, error;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.getEndpoint('/api/v1/users/auth/organisation/login'), {
                                organisation: authData.organisation,
                                username: authData.username,
                                password: authData.password,
                                recaptcha_token: authData.recaptcha_token
                            })];
                    case 1:
                        response = _f.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        subUser = response.data.sub_user;
                        _c = subUser || {}, _d = _c.role, role = _d === void 0 ? null : _d, _e = _c.scopes, scopes = _e === void 0 ? [] : _e;
                        return [2, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name,
                                errors: response.data.errors,
                                features: response.data.features,
                                expiresAt: response.data.expires_at,
                                role: role,
                                scopes: scopes,
                                subUser: subUser || null
                            }];
                    case 2:
                        err_2 = _f.sent();
                        error = new errors.AuthenticationFailed();
                        err_2.error = err_2;
                        err_2.body = (_b = (_a = err_2.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
                        throw error;
                    case 3: return [2];
                }
            });
        });
    };
    Auth.prototype.loginAsSupport = function (authData) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, err_3, error;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4, axios_1.default.post(this.getEndpoint('/api/v1/users/auth/support/login'), {
                                token: authData.token,
                                client_account: authData.client_account,
                                recaptcha_token: authData.recaptcha_token
                            })];
                    case 1:
                        response = _c.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name,
                                scopes: response.data.user.scopes,
                                expiresAt: response.data.expires_at,
                                role: response.data.user.role,
                                is_support: true
                            }];
                    case 2:
                        err_3 = _c.sent();
                        error = new errors.AuthenticationFailed();
                        err_3.error = err_3;
                        err_3.body = (_b = (_a = err_3.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
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