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
Object.defineProperty(exports, "__esModule", { value: true });
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users(options, http) {
        var _this = _super.call(this, http, { endpoint: Users.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        if (options.configurationId) {
            _this.configurationId = options.configurationId;
        }
        _this.endpoint = Users.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Users.prototype.getAll = function (query) {
        var _this = this;
        if (!this.configurationId)
            throw new TypeError('fetching users requires configuration ID to be set.');
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/" + this.configurationId + "/users");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new UsersFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new UsersFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Users.prototype.get = function (userId) {
        var _this = this;
        if (!this.configurationId)
            throw new TypeError('fetching users requires configuration ID to be set.');
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + this.configurationId + "/users/" + userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new UsersFetchFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new UserFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Users.prototype.put = function (userId, user) {
        var _this = this;
        if (!this.configurationId)
            throw new TypeError('fetching users requires configuration ID to be set.');
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + this.configurationId + "/users/" + userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, user)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new UserPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Users.prototype.create = function (user) {
        var _this = this;
        if (!this.configurationId)
            throw new TypeError('fetching users requires configuration ID to be set.');
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + this.configurationId + "/users";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, user)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new UserCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Users.prototype.delete = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + this.configurationId + "/users/" + userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new UserDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new UserDeleteFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Users.prototype.createToken = function (userId) {
        var _this = this;
        if (!this.configurationId)
            throw new TypeError('fetching users requires configuration ID to be set.');
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + this.configurationId + "/users/" + userId + "/api/key";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, reject(new UserTokenCreationFailed(undefined, { error: error_6 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Users.baseEndpoint = "/api/v0/configurations";
    return Users;
}(base_1.ThBaseHandler));
exports.Users = Users;
var UsersFetchFailed = /** @class */ (function (_super) {
    __extends(UsersFetchFailed, _super);
    function UsersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UsersFetchFailed';
        return _this;
    }
    return UsersFetchFailed;
}(baseError_1.BaseError));
exports.UsersFetchFailed = UsersFetchFailed;
var UserFetchFailed = /** @class */ (function (_super) {
    __extends(UserFetchFailed, _super);
    function UserFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserFetchFailed';
        return _this;
    }
    return UserFetchFailed;
}(baseError_1.BaseError));
exports.UserFetchFailed = UserFetchFailed;
var UserPutFailed = /** @class */ (function (_super) {
    __extends(UserPutFailed, _super);
    function UserPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserPutFailed';
        return _this;
    }
    return UserPutFailed;
}(baseError_1.BaseError));
exports.UserPutFailed = UserPutFailed;
var UserCreationFailed = /** @class */ (function (_super) {
    __extends(UserCreationFailed, _super);
    function UserCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserCreationFailed';
        return _this;
    }
    return UserCreationFailed;
}(baseError_1.BaseError));
exports.UserCreationFailed = UserCreationFailed;
var UserDeleteFailed = /** @class */ (function (_super) {
    __extends(UserDeleteFailed, _super);
    function UserDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserDeleteFailed';
        return _this;
    }
    return UserDeleteFailed;
}(baseError_1.BaseError));
exports.UserDeleteFailed = UserDeleteFailed;
var UserTokenCreationFailed = /** @class */ (function (_super) {
    __extends(UserTokenCreationFailed, _super);
    function UserTokenCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create token'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'UserTokenCreationFailed';
        return _this;
    }
    return UserTokenCreationFailed;
}(baseError_1.BaseError));
exports.UserTokenCreationFailed = UserTokenCreationFailed;
//# sourceMappingURL=users.js.map