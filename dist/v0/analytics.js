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
var Analytics = /** @class */ (function () {
    function Analytics(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/analytics';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Analytics.prototype.getRevenuesForDayOfWeek = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var startEnd, branch, dayOfWeek, uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        startEnd = "start=" + query.start + "&end=" + query.end;
                        branch = query.branch_number ? "&branch_number=" + query.branch_number : '';
                        dayOfWeek = "aggregates/revenues/day_of_week?" + startEnd + branch;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + dayOfWeek;
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRevenuesSumForTimeRange = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var startEnd, branch, path, uri, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        startEnd = "start=" + query.start + "&end=" + query.end;
                        branch = query.branch_number ? "&branch_number=" + query.branch_number : '';
                        path = "aggregates/revenues/sum?" + startEnd + branch;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + path;
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRevenues = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var startEnd, branch, precision, revenueQuery, uri, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        startEnd = "start=" + query.start + "&end=" + query.end;
                        branch = query.branch_number ? "&branch_number=" + query.branch_number : '';
                        precision = "&precision=" + query.precision;
                        revenueQuery = "aggregates/revenues?" + startEnd + branch + precision;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + revenueQuery;
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRevenuesForHourOfDay = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var startEnd, branch, hourOfDayQuery, uri, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        startEnd = "start=" + query.start + "&end=" + query.end;
                        branch = query.branch_number ? "&branch_number=" + query.branch_number : '';
                        hourOfDayQuery = "aggregates/revenues/hour_of_day?" + startEnd + branch;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + hourOfDayQuery;
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, reject(new errors.RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getReportsProducts = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/products";
                        queryString = qs_1.default.stringify(query);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.StatisticsProductFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            })];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, reject(new errors.StatisticsProductFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getStaffOverviewReport = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/staff/overview";
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.StaffOverviewFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, reject(new errors.StaffOverviewFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getProductGroupsReport = function (staff) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/staff/product_groups/" + (staff || '');
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.ProductGroupsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_7 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductGroupsReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRefundsReport = function (staff) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/staff/refunds/" + (staff || '');
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.RefundsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_8 = _a.sent();
                        return [2 /*return*/, reject(new errors.RefundsReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getVouchersReports = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/vouchers";
                        queryString = qs_1.default.stringify(query);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.VouchersReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_9 = _a.sent();
                        return [2 /*return*/, reject(new errors.VouchersReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getProductsReport = function (staff) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/staff/products/" + (staff || '');
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.ProductsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_10 = _a.sent();
                        return [2 /*return*/, reject(new errors.ProductsReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getPaymentsReport = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/staff/payments/";
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.PaymentsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_11 = _a.sent();
                        return [2 /*return*/, reject(new errors.PaymentsReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getSimpleSalesCartItems = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/transactions/simple";
                        queryString = qs_1.default.stringify(query);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.SimpleSalesCartItemsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0].results,
                                metadata: {
                                    count: response.data.results[0].count,
                                    metric: response.data.results[0].metric
                                }
                            })];
                    case 2:
                        err_12 = _a.sent();
                        return [2 /*return*/, reject(new errors.SimpleSalesCartItemsReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getVatReport = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/vat";
                        queryString = qs_1.default.stringify(query);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new errors.VatReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_13 = _a.sent();
                        return [2 /*return*/, reject(new errors.VatReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return Analytics;
}());
exports.Analytics = Analytics;
//# sourceMappingURL=analytics.js.map