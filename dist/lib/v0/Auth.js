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
import axios from 'axios';
import * as errors from '../Errors';
import { Client } from '../Client';
export var AuthTypes;
(function (AuthTypes) {
    AuthTypes[AuthTypes["username"] = 1] = "username";
    AuthTypes[AuthTypes["token"] = 2] = "token";
})(AuthTypes || (AuthTypes = {}));
export function isUsernameAuth(object) {
    return 'password' in object;
}
export function isTokenAuth(object) {
    return 'apiKey' in object;
}
/**
 * @class "v0.Auth"
 */
var Auth = /** @class */ (function () {
    function Auth(options) {
        this.authenticated = false;
        this.options = options;
        this.options.base = this.options.base || 'https://api.tillhub.com';
        if (!this.options.credentials)
            return;
        this.determineAuthType();
    }
    Auth.prototype.determineAuthType = function () {
        if (isUsernameAuth(this.options.credentials))
            this.options.type = AuthTypes.username;
        if (isTokenAuth(this.options.credentials))
            this.options.type = AuthTypes.username;
    };
    Auth.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.options.type === AuthTypes.username) {
                    return [2 /*return*/, this.loginUsername(this.options.credentials)];
                }
                return [2 /*return*/, [new errors.AuthenticationFailed('No auth data was provided'), null]];
            });
        });
    };
    Auth.prototype.loginUsername = function (authData) {
        if (authData === void 0) { authData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var username, password, response, err_1;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, axios.post(this.options.base + "/api/v0/users/login", {
                                email: username,
                                password: password
                            })];
                    case 2:
                        response = _a.sent();
                        this.setDefaultHeader(response.data.user.legacy_id || response.data.user.id, response.data.token);
                        return [2 /*return*/, [
                                null,
                                {
                                    token: response.data.token,
                                    user: response.data.user.legacy_id || response.data.user.id
                                }
                            ]];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, [
                                new errors.AuthenticationFailed(),
                                err_1.ressponse && err_1.response.data ? err_1.response.data : null
                            ]];
                    case 4: return [2 /*return*/];
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
        Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    return Auth;
}());
export { Auth };
//# sourceMappingURL=Auth.js.map