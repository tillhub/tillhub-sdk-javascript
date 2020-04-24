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
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Customers = /** @class */ (function (_super) {
    __extends(Customers, _super);
    function Customers(options, http) {
        var _this = _super.call(this, http, { endpoint: Customers.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Customers.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Customers.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, err_1;
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
                            reject(new CustomersFetchFailed(undefined, { status: response_1.status }));
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
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new CustomersFetchFailed(undefined, { error: err_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.get = function (customerId, queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + customerId + (queryString ? "?" + queryString : '');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CustomerFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new CustomerFetchFailed(undefined, { error: error_1 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.createNote = function (customerId, note) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + customerId + "/notes";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, note)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CustomerNoteCreationFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new CustomerNoteCreationFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.put = function (customerId, customer) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + customerId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().put(uri, customer)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CustomerPutFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new CustomerPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.create = function (customer, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, customer)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, reject(new CustomerCreationFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new CustomerCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.meta = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_2;
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
                            return [2 /*return*/, reject(new CustomersMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2 /*return*/, reject(new CustomersMetaFailed(undefined, { status: response.status }))];
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, reject(new CustomersMetaFailed(undefined, { error: err_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.delete = function (customerId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + customerId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            reject(new CustomerDeleteFailed(undefined, { status: response.status }));
                        }
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, reject(new CustomerDeleteFailed(undefined, { error: err_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_4;
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
                            reject(new CustomersCountFailed(undefined, { status: response.status }));
                        }
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, reject(new CustomersCountFailed(undefined, { error: err_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.prototype.search = function (searchTerm) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/search?q=" + searchTerm;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new CustomersSearchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, reject(new CustomersSearchFailed(undefined, { error: error_5 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Customers.baseEndpoint = '/api/v0/customers';
    return Customers;
}(base_1.ThBaseHandler));
exports.Customers = Customers;
var CustomersFetchFailed = /** @class */ (function (_super) {
    __extends(CustomersFetchFailed, _super);
    function CustomersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersFetchFailed';
        Object.setPrototypeOf(_this, CustomersFetchFailed.prototype);
        return _this;
    }
    return CustomersFetchFailed;
}(errors_1.BaseError));
exports.CustomersFetchFailed = CustomersFetchFailed;
var CustomerFetchFailed = /** @class */ (function (_super) {
    __extends(CustomerFetchFailed, _super);
    function CustomerFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerFetchFailed';
        Object.setPrototypeOf(_this, CustomerFetchFailed.prototype);
        return _this;
    }
    return CustomerFetchFailed;
}(errors_1.BaseError));
exports.CustomerFetchFailed = CustomerFetchFailed;
var CustomerPutFailed = /** @class */ (function (_super) {
    __extends(CustomerPutFailed, _super);
    function CustomerPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerPutFailed';
        Object.setPrototypeOf(_this, CustomerPutFailed.prototype);
        return _this;
    }
    return CustomerPutFailed;
}(errors_1.BaseError));
exports.CustomerPutFailed = CustomerPutFailed;
var CustomerNoteCreationFailed = /** @class */ (function (_super) {
    __extends(CustomerNoteCreationFailed, _super);
    function CustomerNoteCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create customer note'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerNoteCreationFailed';
        Object.setPrototypeOf(_this, CustomerNoteCreationFailed.prototype);
        return _this;
    }
    return CustomerNoteCreationFailed;
}(errors_1.BaseError));
exports.CustomerNoteCreationFailed = CustomerNoteCreationFailed;
var CustomerCreationFailed = /** @class */ (function (_super) {
    __extends(CustomerCreationFailed, _super);
    function CustomerCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerCreationFailed';
        Object.setPrototypeOf(_this, CustomerCreationFailed.prototype);
        return _this;
    }
    return CustomerCreationFailed;
}(errors_1.BaseError));
exports.CustomerCreationFailed = CustomerCreationFailed;
var CustomersMetaFailed = /** @class */ (function (_super) {
    __extends(CustomersMetaFailed, _super);
    function CustomersMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get customers metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersMetaFailed';
        Object.setPrototypeOf(_this, CustomersMetaFailed.prototype);
        return _this;
    }
    return CustomersMetaFailed;
}(errors_1.BaseError));
exports.CustomersMetaFailed = CustomersMetaFailed;
var CustomersCountFailed = /** @class */ (function (_super) {
    __extends(CustomersCountFailed, _super);
    function CustomersCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count customers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersCountFailed';
        Object.setPrototypeOf(_this, CustomersCountFailed.prototype);
        return _this;
    }
    return CustomersCountFailed;
}(errors_1.BaseError));
exports.CustomersCountFailed = CustomersCountFailed;
var CustomersSearchFailed = /** @class */ (function (_super) {
    __extends(CustomersSearchFailed, _super);
    function CustomersSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomersSearchFailed';
        Object.setPrototypeOf(_this, CustomersSearchFailed.prototype);
        return _this;
    }
    return CustomersSearchFailed;
}(errors_1.BaseError));
exports.CustomersSearchFailed = CustomersSearchFailed;
var CustomerDeleteFailed = /** @class */ (function (_super) {
    __extends(CustomerDeleteFailed, _super);
    function CustomerDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the customer'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CustomerDeleteFailed';
        Object.setPrototypeOf(_this, CustomerDeleteFailed.prototype);
        return _this;
    }
    return CustomerDeleteFailed;
}(errors_1.BaseError));
exports.CustomerDeleteFailed = CustomerDeleteFailed;
//# sourceMappingURL=customers.js.map