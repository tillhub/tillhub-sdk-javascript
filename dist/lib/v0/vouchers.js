"use strict";
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
var just_diff_1 = require("just-diff");
var qs_1 = __importDefault(require("qs"));
var errors = __importStar(require("../errors"));
var Vouchers = /** @class */ (function () {
    function Vouchers(options, http) {
        this.options = options;
        this.http = http;
        this.logs = new VoucherLogs(options, http);
        this.endpoint = '/api/v0/vouchers';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Vouchers.prototype.getAll = function (optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response, error_1;
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
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.VouchersFetchFailed(undefined, { status: response.status }))];
                        }
                        if (response.data.cursor && response.data.cursor.next) {
                            next = this.getAll({ uri: response.data.cursor.next });
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { cursor: response.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.VouchersFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
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
                            return [2 /*return*/, reject(new errors.VouchersMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new errors.VouchersMetaFailed('could not get voucher metadata unexpectedly'))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.VouchersMetaFailed(undefined, { error: error_2 }))];
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
                            return [2 /*return*/, reject(new errors.VoucherDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.VoucherDeleteFailed(undefined, { error: error_3 }))];
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
                            return [2 /*return*/, reject(new errors.VouchersCountFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new errors.VouchersCountFailed(undefined, { error: error_4 }))];
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
                        response.status !== 200 && reject(new errors.VoucherFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new errors.VoucherFetchFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.getLogs = function (voucherId, optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, response, error_6;
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
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.VoucherLogsFetchFailed(undefined, { status: response.status }))];
                        }
                        if (response.data.cursor && response.data.cursor.next) {
                            next = this.getAll({ uri: response.data.cursor.next });
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count },
                                next: next
                            })];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, reject(new errors.VoucherLogsFetchFailed(undefined, { error: error_6 }))];
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
                        return [2 /*return*/, reject(new errors.VoucherPutFailed(undefined, { error: error_7 }))];
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
                            return [2 /*return*/, reject(new errors.VoucherTypeError('source and target object require ID to be set and be equal to each other'))];
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
                        return [2 /*return*/, reject(new errors.VoucherPatchFailed(undefined, { error: error_8 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Vouchers.prototype.create = function (voucher) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_9;
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
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_9 = _a.sent();
                        return [2 /*return*/, reject(new errors.VoucherCreationFailed(undefined, { error: error_9 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return Vouchers;
}());
exports.Vouchers = Vouchers;
var VoucherLogs = /** @class */ (function () {
    function VoucherLogs(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/vouchers';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    VoucherLogs.prototype.getAll = function (optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response, error_10;
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
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new errors.VouchersLogsFetchFailed(undefined, { status: response.status }))];
                        }
                        if (response.data.cursor && response.data.cursor.next) {
                            next = this.getAll({ uri: response.data.cursor.next });
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { cursor: response.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_10 = _a.sent();
                        return [2 /*return*/, reject(new errors.VouchersLogsFetchFailed(undefined, { error: error_10 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    VoucherLogs.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_11;
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
                            return [2 /*return*/, reject(new errors.VoucherLogsMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new errors.VouchersMetaFailed('could not get voucher metadata unexpectedly'))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_11 = _a.sent();
                        return [2 /*return*/, reject(new errors.VoucherLogsMetaFailed(undefined, { error: error_11 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return VoucherLogs;
}());
exports.VoucherLogs = VoucherLogs;
//# sourceMappingURL=vouchers.js.map