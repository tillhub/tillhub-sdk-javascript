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
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var just_typeof_1 = __importDefault(require("just-typeof"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Staff = /** @class */ (function (_super) {
    __extends(Staff, _super);
    function Staff(options, http) {
        var _this = _super.call(this, http, { endpoint: Staff.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Staff.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Staff.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, error_1;
            var _this = this;
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
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2 /*return*/, reject(new StaffFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new StaffFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.create = function (staffMember, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, staffMember)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StaffMemberCreateFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new StaffMemberCreateFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.getOne = function (staffId) {
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
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffFetchOneFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new StaffFetchOneFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    // the following is a ducplicate of getOne, in order to stay consistent with the method names in other handlers;
    // "get" is a method name expected by frontend components, e.g. remote-search-select
    Staff.prototype.get = function (staffId) {
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
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffFetchOneFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new StaffFetchOneFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.put = function (staffId, staff) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
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
                            reject(new StaffPutFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new StaffPutFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.delete = function (staffId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
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
                            reject(new StaffDeleteFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({ msg: response.data.msg })];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, reject(new StaffDeleteFailed(undefined, { error: error_6 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.getPin = function (providedPin) {
        var _this = this;
        var queryString = qs_1.default.stringify(providedPin, { addQueryPrefix: true });
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_7;
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
                            reject(new StaffPinGetFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        if (error_7.response && error_7.response.status === 409) {
                            return [2 /*return*/, reject(new StaffPinGetFailed(undefined, {
                                    status: error_7.response.status,
                                    name: error_7.response.data.name
                                }))];
                        }
                        return [2 /*return*/, reject(new StaffPinGetFailed(undefined, { error: error_7 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.getStaffNumber = function (providedStaffNumber) {
        var _this = this;
        var queryString = qs_1.default.stringify(providedStaffNumber, { addQueryPrefix: true });
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/staff_number" + queryString;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffNumberGetFailed(undefined, {
                                status: response.status
                            }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_8 = _a.sent();
                        if (error_8.response && error_8.response.status === 409) {
                            return [2 /*return*/, reject(new StaffNumberGetFailed(undefined, {
                                    status: error_8.response.status,
                                    name: error_8.response.data.name
                                }))];
                        }
                        return [2 /*return*/, reject(new StaffNumberGetFailed(undefined, { error: error_8 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.getFilters = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, resp, resources_1, list, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new StaffFetchFailed(undefined, { status: response.status }))];
                        }
                        resp = response.data.results || [];
                        resources_1 = [
                            'staff_number',
                            'lastname',
                            'firstname',
                            'email',
                            'phonenumbers'
                        ];
                        list = resp.reduce(function (acc, curr) {
                            var obj = {};
                            resources_1.forEach(function (key) {
                                obj[key] = acc[key] || [];
                                var currValue = curr[key];
                                if (key === 'phonenumbers' && currValue) {
                                    currValue = (currValue.mobile ||
                                        currValue.main ||
                                        currValue.home ||
                                        currValue.work ||
                                        currValue.any ||
                                        null);
                                }
                                if (currValue && !obj[key].includes(currValue)) {
                                    obj[key].push(currValue);
                                }
                            });
                            return obj;
                        }, {});
                        return [2 /*return*/, resolve({
                                data: list,
                                metadata: { resources: resources_1 }
                            })];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, reject(new StaffFetchFailed(undefined, { error: error_9 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.makeUser = function (staffID, makeUserObj) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + staffID + "/make_user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(base, makeUserObj)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new MakeUserStaffFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_10 = _a.sent();
                        return [2 /*return*/, reject(new MakeUserStaffFailed(undefined, { error: error_10 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.meta = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new StaffMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new StaffMetaFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new StaffMetaFailed(undefined, { error: err_1 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.prototype.search = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, base, response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof query === 'string') {
                            uri = this.uriHelper.generateBaseUri("/search?q=" + query);
                        }
                        else if (just_typeof_1.default(query) === 'object') {
                            base = this.uriHelper.generateBaseUri('/search');
                            uri = this.uriHelper.generateUriWithQuery(base, query);
                        }
                        else {
                            return [2 /*return*/, reject(new StaffSearchFailed('Could not search for staff - query type is invalid'))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StaffSearchFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_11 = _a.sent();
                        return [2 /*return*/, reject(new StaffSearchFailed(undefined, { error: error_11 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Staff.baseEndpoint = '/api/v0/staff';
    return Staff;
}(base_1.ThBaseHandler));
exports.Staff = Staff;
var StaffFetchFailed = /** @class */ (function (_super) {
    __extends(StaffFetchFailed, _super);
    function StaffFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the Staff members'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffFetchFailed';
        Object.setPrototypeOf(_this, StaffFetchFailed.prototype);
        return _this;
    }
    return StaffFetchFailed;
}(errors_1.BaseError));
exports.StaffFetchFailed = StaffFetchFailed;
var StaffFetchOneFailed = /** @class */ (function (_super) {
    __extends(StaffFetchOneFailed, _super);
    function StaffFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffFetchOneFailed';
        Object.setPrototypeOf(_this, StaffFetchOneFailed.prototype);
        return _this;
    }
    return StaffFetchOneFailed;
}(errors_1.BaseError));
exports.StaffFetchOneFailed = StaffFetchOneFailed;
var StaffPutFailed = /** @class */ (function (_super) {
    __extends(StaffPutFailed, _super);
    function StaffPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPutFailed';
        Object.setPrototypeOf(_this, StaffPutFailed.prototype);
        return _this;
    }
    return StaffPutFailed;
}(errors_1.BaseError));
exports.StaffPutFailed = StaffPutFailed;
var StaffDeleteFailed = /** @class */ (function (_super) {
    __extends(StaffDeleteFailed, _super);
    function StaffDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffDeleteFailed';
        Object.setPrototypeOf(_this, StaffDeleteFailed.prototype);
        return _this;
    }
    return StaffDeleteFailed;
}(errors_1.BaseError));
exports.StaffDeleteFailed = StaffDeleteFailed;
var StaffMemberCreateFailed = /** @class */ (function (_super) {
    __extends(StaffMemberCreateFailed, _super);
    function StaffMemberCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffMemberCreateFailed';
        Object.setPrototypeOf(_this, StaffMemberCreateFailed.prototype);
        return _this;
    }
    return StaffMemberCreateFailed;
}(errors_1.BaseError));
exports.StaffMemberCreateFailed = StaffMemberCreateFailed;
var StaffPinGetFailed = /** @class */ (function (_super) {
    __extends(StaffPinGetFailed, _super);
    function StaffPinGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not get a unique Staff pin number'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPinGetFailed';
        Object.setPrototypeOf(_this, StaffPinGetFailed.prototype);
        return _this;
    }
    return StaffPinGetFailed;
}(errors_1.BaseError));
exports.StaffPinGetFailed = StaffPinGetFailed;
var StaffNumberGetFailed = /** @class */ (function (_super) {
    __extends(StaffNumberGetFailed, _super);
    function StaffNumberGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not get a unique Staff number'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffNumberGetFailed';
        Object.setPrototypeOf(_this, StaffNumberGetFailed.prototype);
        return _this;
    }
    return StaffNumberGetFailed;
}(errors_1.BaseError));
exports.StaffNumberGetFailed = StaffNumberGetFailed;
var MakeUserStaffFailed = /** @class */ (function (_super) {
    __extends(MakeUserStaffFailed, _super);
    function MakeUserStaffFailed(message, properties) {
        if (message === void 0) { message = 'Could not make the staff member a user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MakeUserStaffFailed';
        Object.setPrototypeOf(_this, MakeUserStaffFailed.prototype);
        return _this;
    }
    return MakeUserStaffFailed;
}(errors_1.BaseError));
exports.MakeUserStaffFailed = MakeUserStaffFailed;
var StaffMetaFailed = /** @class */ (function (_super) {
    __extends(StaffMetaFailed, _super);
    function StaffMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get meta of staff'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffMetaFailed';
        Object.setPrototypeOf(_this, StaffMetaFailed.prototype);
        return _this;
    }
    return StaffMetaFailed;
}(errors_1.BaseError));
exports.StaffMetaFailed = StaffMetaFailed;
var StaffSearchFailed = /** @class */ (function (_super) {
    __extends(StaffSearchFailed, _super);
    function StaffSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for staff'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffSearchFailed';
        Object.setPrototypeOf(_this, StaffSearchFailed.prototype);
        return _this;
    }
    return StaffSearchFailed;
}(errors_1.BaseError));
exports.StaffSearchFailed = StaffSearchFailed;
//# sourceMappingURL=staff.js.map