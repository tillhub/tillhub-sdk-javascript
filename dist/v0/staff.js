"use strict";
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
var qs_1 = __importDefault(require("qs"));
var errors = __importStar(require("../errors"));
var Staff = /** @class */ (function () {
    function Staff(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/staff';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Staff.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.StaffFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.StaffFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.create = function (staffMember) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, staffMember)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.StaffMemberCreateFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.StaffMemberCreateFailed(undefined, { error: error_1 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.getOne = function (staffId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + staffId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.StaffFetchOneFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.StaffFetchOneFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.put = function (staffId, staff) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + staffId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, staff)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.StaffPutFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.StaffPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.delete = function (staffId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + staffId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.StaffDeleteFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({ msg: response.data.msg })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new errors.StaffDeleteFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.getPin = function (providedPin) {
        var _this = this;
        var queryString = qs_1.default.stringify(providedPin, { addQueryPrefix: true });
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/pin" + queryString;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.StaffPinGetFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        if (error_5.response.status === 409) {
                            return [2 /*return*/, reject(new errors.StaffPinGetFailed(undefined, {
                                    status: error_5.response.status,
                                    name: error_5.response.data.name
                                }))];
                        }
                        return [2 /*return*/, reject(new errors.StaffPinGetFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return Staff;
}());
exports.Staff = Staff;
//# sourceMappingURL=staff.js.map