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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrespondenceCreationFailed = exports.CorrespondencePutFailed = exports.CorrespondenceFetchFailed = exports.CorrespondencesFetchFailed = exports.Correspondences = void 0;
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Correspondences = /** @class */ (function (_super) {
    __extends(Correspondences, _super);
    function Correspondences(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Correspondences.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Correspondences.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Correspondences.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2 /*return*/, reject(new CorrespondencesFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new CorrespondencesFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Correspondences.prototype.get = function (correspondenceId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + correspondenceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new CorrespondenceFetchFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new CorrespondenceFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Correspondences.prototype.put = function (correspondenceId, correspondence) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + correspondenceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, correspondence)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new CorrespondencePutFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Correspondences.prototype.create = function (correspondence) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, correspondence)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new CorrespondenceCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Correspondences.baseEndpoint = '/api/v0/correspondences';
    return Correspondences;
}(base_1.ThBaseHandler));
exports.Correspondences = Correspondences;
var CorrespondencesFetchFailed = /** @class */ (function (_super) {
    __extends(CorrespondencesFetchFailed, _super);
    function CorrespondencesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch Correspondences'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondencesFetchFailed';
        Object.setPrototypeOf(_this, CorrespondencesFetchFailed.prototype);
        return _this;
    }
    return CorrespondencesFetchFailed;
}(errors_1.BaseError));
exports.CorrespondencesFetchFailed = CorrespondencesFetchFailed;
var CorrespondenceFetchFailed = /** @class */ (function (_super) {
    __extends(CorrespondenceFetchFailed, _super);
    function CorrespondenceFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch correspondence'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondenceFetchFailed';
        Object.setPrototypeOf(_this, CorrespondenceFetchFailed.prototype);
        return _this;
    }
    return CorrespondenceFetchFailed;
}(errors_1.BaseError));
exports.CorrespondenceFetchFailed = CorrespondenceFetchFailed;
var CorrespondencePutFailed = /** @class */ (function (_super) {
    __extends(CorrespondencePutFailed, _super);
    function CorrespondencePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter correspondence'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondencePutFailed';
        Object.setPrototypeOf(_this, CorrespondencePutFailed.prototype);
        return _this;
    }
    return CorrespondencePutFailed;
}(errors_1.BaseError));
exports.CorrespondencePutFailed = CorrespondencePutFailed;
var CorrespondenceCreationFailed = /** @class */ (function (_super) {
    __extends(CorrespondenceCreationFailed, _super);
    function CorrespondenceCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create correspondence'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondenceCreationFailed';
        Object.setPrototypeOf(_this, CorrespondenceCreationFailed.prototype);
        return _this;
    }
    return CorrespondenceCreationFailed;
}(errors_1.BaseError));
exports.CorrespondenceCreationFailed = CorrespondenceCreationFailed;
//# sourceMappingURL=correspondences.js.map