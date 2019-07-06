"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var errors = __importStar(require("../errors"));
var v0 = __importStar(require("../v0"));
var auth_1 = require("../v0/auth");
/**
 * @extends "v0.Auth"
 */
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options.type === auth_1.AuthTypes.username) {
                    return [2 /*return*/, this.loginUsername(this.options.credentials)];
                }
                if (this.options.type === auth_1.AuthTypes.token) {
                    return [2 /*return*/, this.loginServiceAccount(this.options.credentials)];
                }
                if (this.options.type === auth_1.AuthTypes.org) {
                    return [2 /*return*/, this.loginWithOrganisation(this.options.credentials)];
                }
                if (this.options.type === auth_1.AuthTypes.support) {
                    return [2 /*return*/, this.loginAsSupport(this.options.credentials)];
                }
                throw new errors.AuthenticationFailed('No auth data was provided');
            });
        });
    };
    Auth.prototype.loginServiceAccount = function (authData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.options.base + "/api/v1/users/auth/key", {
                                id: authData.id,
                                api_key: authData.apiKey
                            })];
                    case 1:
                        response = _a.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2 /*return*/, {
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
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.loginWithOrganisation = function (authData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, subUser, _a, _b, role, _c, scopes, err_2, error;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.options.base + "/api/v1/users/auth/organisation/login", {
                                organisation: authData.organisation,
                                username: authData.username,
                                password: authData.password
                            })];
                    case 1:
                        response = _d.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        subUser = response.data.sub_user;
                        _a = (subUser || {}), _b = _a.role, role = _b === void 0 ? null : _b, _c = _a.scopes, scopes = _c === void 0 ? [] : _c;
                        return [2 /*return*/, {
                                token: response.data.token,
                                user: response.data.user.legacy_id || response.data.user.id,
                                name: response.data.user.name,
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
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.loginAsSupport = function (authData) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_3, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.options.base + "/api/v1/users/auth/support/login", {
                                token: authData.token,
                                client_account: authData.client_account
                            })];
                    case 1:
                        response = _a.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2 /*return*/, {
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
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}(v0.Auth));
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map