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
exports.VouchersUsersFailed = exports.VouchersLogsCountFailed = exports.VouchersLogsFetchFailed = exports.VoucherDeleteFailed = exports.VoucherLogsMetaFailed = exports.VouchersMetaFailed = exports.VouchersCountFailed = exports.VoucherCodeConflict = exports.VoucherCreationFailed = exports.VoucherPatchFailed = exports.VoucherPutFailed = exports.VoucherFetchFailed = exports.VoucherLogsFetchFailed = exports.VouchersFetchFailed = exports.VoucherTypeError = exports.VoucherLogs = exports.Vouchers = void 0;
var just_diff_1 = require("just-diff");
var qs_1 = __importDefault(require("qs"));
var just_safe_get_1 = __importDefault(require("just-safe-get"));
var errors_1 = require("../errors");
var base_1 = require("../base");
var Vouchers = /** @class */ (function (_super) {
    __extends(Vouchers, _super);
    function Vouchers(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Vouchers.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.logs = new VoucherLogs(options, http);
        _this.endpoint = Vouchers.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Vouchers.prototype.getAll = function (optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (optionsOrQuery && optionsOrQuery.uri) {
                            uri = optionsOrQuery.uri;
                        }
                        else {
                            queryString = '';
                            if (optionsOrQuery && (optionsOrQuery.query || optionsOrQuery.limit)) {
                                queryString = qs_1.default.stringify(__assign({ limit: optionsOrQuery.limit }, optionsOrQuery.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2 /*return*/, reject(new VouchersFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new VouchersFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.meta = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        queryString = qs_1.default.stringify(q);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new VouchersMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new VouchersMetaFailed('could not get voucher metadata unexpectedly'))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new VouchersMetaFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.delete = function (voucherId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + voucherId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new VoucherDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new VoucherDeleteFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new VouchersCountFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new VouchersCountFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.get = function (voucherId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + voucherId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new VoucherFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new VoucherFetchFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.getLogs = function (voucherId, optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, response_2, error_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (optionsOrQuery && optionsOrQuery.uri) {
                            uri = optionsOrQuery.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + voucherId + "/logs";
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _a.sent();
                        if (response_2.status !== 200) {
                            return [2 /*return*/, reject(new VoucherLogsFetchFailed(undefined, { status: response_2.status }))];
                        }
                        if (response_2.data.cursor && response_2.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_2.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count },
                                next: next
                            })];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, reject(new VoucherLogsFetchFailed(undefined, { error: error_6 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.put = function (voucherId, voucher) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + voucherId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, voucher)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, reject(new VoucherPutFailed(undefined, { error: error_7 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.patch = function (source, target) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, patch, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!source.id || !target.id || source.id !== target.id) {
                            return [2 /*return*/, reject(new VoucherTypeError('source and target Record<string, unknown> require ID to be set and be equal to each other'))];
                        }
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + source.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        patch = just_diff_1.diff(source, target, just_diff_1.jsonPatchPathConverter);
                        return [4 /*yield*/, this.http.getClient()({
                                method: 'PATCH',
                                url: uri,
                                headers: {
                                    'content-type': 'application/json-patch+json'
                                },
                                data: patch
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count, patch: patch }
                            })];
                    case 3:
                        error_8 = _a.sent();
                        return [2 /*return*/, reject(new VoucherPatchFailed(undefined, { error: error_8 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.create = function (voucher) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_9, responseStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, voucher)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        responseStatus = just_safe_get_1.default(error_9, 'response.status');
                        if (responseStatus === 409) {
                            return [2 /*return*/, reject(new VoucherCodeConflict(undefined, { error: error_9 }))];
                        }
                        else {
                            return [2 /*return*/, reject(new VoucherCreationFailed(undefined, { error: error_9 }))];
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new VoucherCreationFailed(just_safe_get_1.default(response, 'error.message'), { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                }
            });
        }); });
    };
    Vouchers.prototype.getAllUsers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/users";
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new VouchersUsersFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 2:
                        error_10 = _a.sent();
                        return [2 /*return*/, reject(new VouchersUsersFailed(undefined, { error: error_10 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.baseEndpoint = '/api/v0/vouchers';
    return Vouchers;
}(base_1.ThBaseHandler));
exports.Vouchers = Vouchers;
var VoucherLogs = /** @class */ (function (_super) {
    __extends(VoucherLogs, _super);
    function VoucherLogs(options, http) {
        var _this = _super.call(this, http, {
            endpoint: VoucherLogs.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = VoucherLogs.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    VoucherLogs.prototype.getAll = function (optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_3, error_11;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (optionsOrQuery && optionsOrQuery.uri) {
                            uri = optionsOrQuery.uri;
                        }
                        else {
                            queryString = '';
                            if (optionsOrQuery && (optionsOrQuery.query || optionsOrQuery.limit)) {
                                queryString = qs_1.default.stringify(__assign({ limit: optionsOrQuery.limit }, optionsOrQuery.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/logs" + (queryString ? "?" + queryString : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_3 = _a.sent();
                        if (response_3.status !== 200) {
                            return [2 /*return*/, reject(new VouchersLogsFetchFailed(undefined, { status: response_3.status }))];
                        }
                        if (response_3.data.cursor && response_3.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_3.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_3.data.results,
                                metadata: { cursor: response_3.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_11 = _a.sent();
                        return [2 /*return*/, reject(new VouchersLogsFetchFailed(undefined, { error: error_11 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    VoucherLogs.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/logs/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new VoucherLogsMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new VouchersMetaFailed('could not get voucher metadata unexpectedly'))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_12 = _a.sent();
                        return [2 /*return*/, reject(new VoucherLogsMetaFailed(undefined, { error: error_12 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    VoucherLogs.baseEndpoint = '/api/v0/vouchers';
    return VoucherLogs;
}(base_1.ThBaseHandler));
exports.VoucherLogs = VoucherLogs;
var VoucherTypeError = /** @class */ (function (_super) {
    __extends(VoucherTypeError, _super);
    function VoucherTypeError(message, properties) {
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersFetchFailed';
        Object.setPrototypeOf(_this, VoucherTypeError.prototype);
        return _this;
    }
    return VoucherTypeError;
}(errors_1.BaseError));
exports.VoucherTypeError = VoucherTypeError;
var VouchersFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersFetchFailed, _super);
    function VouchersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersFetchFailed';
        Object.setPrototypeOf(_this, VouchersFetchFailed.prototype);
        return _this;
    }
    return VouchersFetchFailed;
}(errors_1.BaseError));
exports.VouchersFetchFailed = VouchersFetchFailed;
var VoucherLogsFetchFailed = /** @class */ (function (_super) {
    __extends(VoucherLogsFetchFailed, _super);
    function VoucherLogsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the voucher logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherLogsFetchFailed';
        Object.setPrototypeOf(_this, VoucherLogsFetchFailed.prototype);
        return _this;
    }
    return VoucherLogsFetchFailed;
}(errors_1.BaseError));
exports.VoucherLogsFetchFailed = VoucherLogsFetchFailed;
var VoucherFetchFailed = /** @class */ (function (_super) {
    __extends(VoucherFetchFailed, _super);
    function VoucherFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherFetchFailed';
        Object.setPrototypeOf(_this, VoucherFetchFailed.prototype);
        return _this;
    }
    return VoucherFetchFailed;
}(errors_1.BaseError));
exports.VoucherFetchFailed = VoucherFetchFailed;
var VoucherPutFailed = /** @class */ (function (_super) {
    __extends(VoucherPutFailed, _super);
    function VoucherPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherPutFailed';
        Object.setPrototypeOf(_this, VoucherPutFailed.prototype);
        return _this;
    }
    return VoucherPutFailed;
}(errors_1.BaseError));
exports.VoucherPutFailed = VoucherPutFailed;
var VoucherPatchFailed = /** @class */ (function (_super) {
    __extends(VoucherPatchFailed, _super);
    function VoucherPatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherPatchFailed';
        Object.setPrototypeOf(_this, VoucherPatchFailed.prototype);
        return _this;
    }
    return VoucherPatchFailed;
}(errors_1.BaseError));
exports.VoucherPatchFailed = VoucherPatchFailed;
var VoucherCreationFailed = /** @class */ (function (_super) {
    __extends(VoucherCreationFailed, _super);
    function VoucherCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherPostFailed';
        Object.setPrototypeOf(_this, VoucherCreationFailed.prototype);
        return _this;
    }
    return VoucherCreationFailed;
}(errors_1.BaseError));
exports.VoucherCreationFailed = VoucherCreationFailed;
var VoucherCodeConflict = /** @class */ (function (_super) {
    __extends(VoucherCodeConflict, _super);
    function VoucherCodeConflict(message, properties) {
        if (message === void 0) { message = 'This voucher code is already in use. Please use another code.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherCodeConflict';
        Object.setPrototypeOf(_this, VoucherCodeConflict.prototype);
        return _this;
    }
    return VoucherCodeConflict;
}(errors_1.BaseError));
exports.VoucherCodeConflict = VoucherCodeConflict;
var VouchersCountFailed = /** @class */ (function (_super) {
    __extends(VouchersCountFailed, _super);
    function VouchersCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the vouchers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersCountFailed';
        Object.setPrototypeOf(_this, VouchersCountFailed.prototype);
        return _this;
    }
    return VouchersCountFailed;
}(errors_1.BaseError));
exports.VouchersCountFailed = VouchersCountFailed;
var VouchersMetaFailed = /** @class */ (function (_super) {
    __extends(VouchersMetaFailed, _super);
    function VouchersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get voucher metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersMetaFailed';
        Object.setPrototypeOf(_this, VouchersMetaFailed.prototype);
        return _this;
    }
    return VouchersMetaFailed;
}(errors_1.BaseError));
exports.VouchersMetaFailed = VouchersMetaFailed;
var VoucherLogsMetaFailed = /** @class */ (function (_super) {
    __extends(VoucherLogsMetaFailed, _super);
    function VoucherLogsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get voucher logs metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherLogsMetaFailed';
        Object.setPrototypeOf(_this, VoucherLogsMetaFailed.prototype);
        return _this;
    }
    return VoucherLogsMetaFailed;
}(errors_1.BaseError));
exports.VoucherLogsMetaFailed = VoucherLogsMetaFailed;
var VoucherDeleteFailed = /** @class */ (function (_super) {
    __extends(VoucherDeleteFailed, _super);
    function VoucherDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the voucher'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VoucherDeleteFailed';
        Object.setPrototypeOf(_this, VoucherDeleteFailed.prototype);
        return _this;
    }
    return VoucherDeleteFailed;
}(errors_1.BaseError));
exports.VoucherDeleteFailed = VoucherDeleteFailed;
var VouchersLogsFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersLogsFetchFailed, _super);
    function VouchersLogsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersLogsFetchFailed';
        Object.setPrototypeOf(_this, VouchersLogsFetchFailed.prototype);
        return _this;
    }
    return VouchersLogsFetchFailed;
}(errors_1.BaseError));
exports.VouchersLogsFetchFailed = VouchersLogsFetchFailed;
var VouchersLogsCountFailed = /** @class */ (function (_super) {
    __extends(VouchersLogsCountFailed, _super);
    function VouchersLogsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the vouchers logs'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersLogsCountFailed';
        Object.setPrototypeOf(_this, VouchersLogsCountFailed.prototype);
        return _this;
    }
    return VouchersLogsCountFailed;
}(errors_1.BaseError));
exports.VouchersLogsCountFailed = VouchersLogsCountFailed;
var VouchersUsersFailed = /** @class */ (function (_super) {
    __extends(VouchersUsersFailed, _super);
    function VouchersUsersFailed(message, properties) {
        if (message === void 0) { message = 'Could not get authorized voucher users'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersUsersFailed';
        Object.setPrototypeOf(_this, VouchersUsersFailed.prototype);
        return _this;
    }
    return VouchersUsersFailed;
}(errors_1.BaseError));
exports.VouchersUsersFailed = VouchersUsersFailed;
//# sourceMappingURL=vouchers.js.map