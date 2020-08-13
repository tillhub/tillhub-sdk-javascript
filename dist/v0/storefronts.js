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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontsDeleteFailed = exports.StorefrontsCreationFailed = exports.StorefrontsPutFailed = exports.StorefrontsFetchOneFailed = exports.StorefrontsFetchFailed = exports.Storefronts = void 0;
var qs_1 = __importDefault(require("qs"));
var errors_1 = require("../errors");
var base_1 = require("../base");
var Storefronts = /** @class */ (function (_super) {
    __extends(Storefronts, _super);
    function Storefronts(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Storefronts.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Storefronts.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Storefronts.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new StorefrontsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new StorefrontsFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Storefronts.prototype.get = function (storefrontId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + storefrontId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StorefrontsFetchOneFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new StorefrontsFetchOneFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Storefronts.prototype.put = function (storefrontId, storefront) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + storefrontId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new StorefrontsPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Storefronts.prototype.create = function (storefront) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, storefront)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new StorefrontsCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Storefronts.prototype.delete = function (storefrontId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + storefrontId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StorefrontsDeleteFailed());
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new StorefrontsDeleteFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Storefronts.baseEndpoint = '/api/v0/storefronts';
    return Storefronts;
}(base_1.ThBaseHandler));
exports.Storefronts = Storefronts;
var StorefrontsFetchFailed = /** @class */ (function (_super) {
    __extends(StorefrontsFetchFailed, _super);
    function StorefrontsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchFailed.prototype);
        return _this;
    }
    return StorefrontsFetchFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchFailed = StorefrontsFetchFailed;
var StorefrontsFetchOneFailed = /** @class */ (function (_super) {
    __extends(StorefrontsFetchOneFailed, _super);
    function StorefrontsFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch one storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsFetchOneFailed';
        Object.setPrototypeOf(_this, StorefrontsFetchOneFailed.prototype);
        return _this;
    }
    return StorefrontsFetchOneFailed;
}(errors_1.BaseError));
exports.StorefrontsFetchOneFailed = StorefrontsFetchOneFailed;
var StorefrontsPutFailed = /** @class */ (function (_super) {
    __extends(StorefrontsPutFailed, _super);
    function StorefrontsPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update storefront'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsPutFailed';
        Object.setPrototypeOf(_this, StorefrontsPutFailed.prototype);
        return _this;
    }
    return StorefrontsPutFailed;
}(errors_1.BaseError));
exports.StorefrontsPutFailed = StorefrontsPutFailed;
var StorefrontsCreationFailed = /** @class */ (function (_super) {
    __extends(StorefrontsCreationFailed, _super);
    function StorefrontsCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsCreationFailed';
        Object.setPrototypeOf(_this, StorefrontsCreationFailed.prototype);
        return _this;
    }
    return StorefrontsCreationFailed;
}(errors_1.BaseError));
exports.StorefrontsCreationFailed = StorefrontsCreationFailed;
var StorefrontsDeleteFailed = /** @class */ (function (_super) {
    __extends(StorefrontsDeleteFailed, _super);
    function StorefrontsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete storefronts'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StorefrontsDeleteFailed';
        Object.setPrototypeOf(_this, StorefrontsDeleteFailed.prototype);
        return _this;
    }
    return StorefrontsDeleteFailed;
}(errors_1.BaseError));
exports.StorefrontsDeleteFailed = StorefrontsDeleteFailed;
//# sourceMappingURL=storefronts.js.map