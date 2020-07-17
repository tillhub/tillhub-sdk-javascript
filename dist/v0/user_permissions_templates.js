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
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var errors_1 = require("../errors");
var UserPermissionsTemplates = /** @class */ (function (_super) {
    __extends(UserPermissionsTemplates, _super);
    function UserPermissionsTemplates(options, http) {
        var _this = _super.call(this, http, {
            endpoint: UserPermissionsTemplates.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = UserPermissionsTemplates.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    UserPermissionsTemplates.prototype.create = function (template) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4 /*yield*/, this.http.getClient().post(uri, template)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new UserPermissionsTemplatesCreationFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new UserPermissionsTemplatesCreationFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    UserPermissionsTemplates.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var baseUri, uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new UserPermissionsTemplatesFetchFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new UserPermissionsTemplatesFetchFailed(undefined, { error: error_2 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    UserPermissionsTemplates.prototype.get = function (templateId, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var baseUri, uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUri = this.uriHelper.generateBaseUri("/" + templateId);
                        uri = this.uriHelper.generateUriWithQuery(baseUri, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new UserPermissionsTemplatesFetchOneFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: 1 }
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new UserPermissionsTemplatesFetchOneFailed(undefined, { error: error_3 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    UserPermissionsTemplates.prototype.update = function (templateId, template) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        return [4 /*yield*/, this.http.getClient().put(uri, template)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new UserPermissionsTemplatesUpdateFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new UserPermissionsTemplatesUpdateFailed(undefined, { error: error_4 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    UserPermissionsTemplates.prototype.delete = function (templateId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + templateId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new UserPermissionsTemplatesDeleteFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new UserPermissionsTemplatesDeleteFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    UserPermissionsTemplates.baseEndpoint = '/api/v0/user_permission_templates';
    return UserPermissionsTemplates;
}(base_1.ThBaseHandler));
exports.UserPermissionsTemplates = UserPermissionsTemplates;
var UserPermissionsTemplatesFetchFailed = /** @class */ (function (_super) {
    __extends(UserPermissionsTemplatesFetchFailed, _super);
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
var UserPermissionsTemplatesFetchOneFailed = /** @class */ (function (_super) {
    __extends(UserPermissionsTemplatesFetchOneFailed, _super);
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
var UserPermissionsTemplatesUpdateFailed = /** @class */ (function (_super) {
    __extends(UserPermissionsTemplatesUpdateFailed, _super);
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
var UserPermissionsTemplatesCreationFailed = /** @class */ (function (_super) {
    __extends(UserPermissionsTemplatesCreationFailed, _super);
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
var UserPermissionsTemplatesDeleteFailed = /** @class */ (function (_super) {
    __extends(UserPermissionsTemplatesDeleteFailed, _super);
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