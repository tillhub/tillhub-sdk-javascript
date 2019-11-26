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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var balances_1 = require("./analytics/reports/balances");
var payment_options_1 = require("./analytics/reports/payment_options");
var payments_1 = require("./analytics/reports/payments");
var vat_1 = require("./analytics/reports/vat");
var cash_book_1 = require("./analytics/reports/cash_book");
var customers_1 = require("./analytics/reports/customers");
var Analytics = /** @class */ (function () {
    function Analytics(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/analytics';
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Analytics.prototype.getRevenuesForDayOfWeek = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues/day_of_week');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRevenuesSumForTimeRange = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues/sum');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, reject(new RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRevenues = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, reject(new RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRevenuesForHourOfDay = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues/hour_of_day');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new RevenuesFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, reject(new RevenuesFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getReportsProducts = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/products');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new StatisticsProductFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            })];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, reject(new StatisticsProductFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getProductsChildren = function (productNumber, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/reports/products/" + productNumber);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new StatisticsProductChildrenFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            })];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, reject(new StatisticsProductChildrenFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getStaffOverviewReport = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/staff/overview');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new StaffOverviewFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_7 = _a.sent();
                        return [2 /*return*/, reject(new StaffOverviewFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getProductGroupsReport = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var staff, base, uri, response, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        staff = options && options.staff;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/reports/staff/product_groups" + (staff ? "/" + staff : ''));
                        uri = this.uriHelper.generateUriWithQuery(base, options && options.query ? options.query : undefined);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new ProductGroupsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, reject(new ProductGroupsReportFetchFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getRefundsReport = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var staff, base, uri, response, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        staff = options && options.staff;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/reports/staff/refunds" + (staff ? "/" + staff : ''));
                        uri = this.uriHelper.generateUriWithQuery(base, options && options.query ? options.query : undefined);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new RefundsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_9 = _a.sent();
                        return [2 /*return*/, reject(new RefundsReportFetchFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getVouchersReports = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_10;
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
                        response.status !== 200 && reject(new VouchersReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_10 = _a.sent();
                        return [2 /*return*/, reject(new VouchersReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getProductsReport = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var staff, base, uri, response, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        staff = options && options.staff;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/reports/staff/products" + (staff ? "/" + staff : ''));
                        uri = this.uriHelper.generateUriWithQuery(base, options && options.query ? options.query : undefined);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new ProductsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_11 = _a.sent();
                        return [2 /*return*/, reject(new ProductsReportFetchFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getPaymentsReport = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/staff/payments";
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new PaymentsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_12 = _a.sent();
                        return [2 /*return*/, reject(new PaymentsReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getSimpleSalesCartItems = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, err_13;
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
                        response.status !== 200 && reject(new SimpleSalesCartItemsReportFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0].results,
                                metadata: {
                                    count: response.data.results[0].count,
                                    metric: response.data.results[0].metric
                                }
                            })];
                    case 2:
                        err_13 = _a.sent();
                        return [2 /*return*/, reject(new SimpleSalesCartItemsReportFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // TODO: Remove when customers() is implemented
    Analytics.prototype.getCustomersReport = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new ReportsCustomerCustomersFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_14 = _a.sent();
                        return [2 /*return*/, reject(new ReportsCustomerCustomersFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // TODO: Remove when customers() is implemented
    Analytics.prototype.getCustomersTransaction = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers/transactions');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new ReportsCustomerTransactionsFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_15 = _a.sent();
                        return [2 /*return*/, reject(new ReportsCustomerTransactionsFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    // TODO: Remove when customers() is implemented
    Analytics.prototype.getCustomersOverview = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers/overview');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new ReportsCustomerOverviewFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_16 = _a.sent();
                        return [2 /*return*/, reject(new ReportsCustomerOverviewFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getStocksReport = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var queryString, uri, response, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryString = qs_1.default.stringify(query, { addQueryPrefix: true });
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/reports/stocks" + queryString;
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new ReportsStocksFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_17 = _a.sent();
                        return [2 /*return*/, reject(new ReportsStocksFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getProductGroups = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/product_groups');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new ReportsProductGroupsFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            })];
                    case 2:
                        err_18 = _a.sent();
                        return [2 /*return*/, reject(new ReportsProductGroupsFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.getProductGroupsFilters = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/product_groups/filters');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new ReportsProductGroupsFiltersFetchFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            })];
                    case 2:
                        err_19 = _a.sent();
                        return [2 /*return*/, reject(new ReportsProductGroupsFiltersFetchFailed())];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Analytics.prototype.balances = function () {
        return new balances_1.Balances(this.options, this.http, this.uriHelper);
    };
    Analytics.prototype.paymentOptions = function () {
        return new payment_options_1.PaymentOptions(this.options, this.http, this.uriHelper);
    };
    Analytics.prototype.payments = function () {
        return new payments_1.Payments(this.options, this.http, this.uriHelper);
    };
    Analytics.prototype.vat = function () {
        return new vat_1.Vat(this.options, this.http, this.uriHelper);
    };
    Analytics.prototype.cashBook = function () {
        return new cash_book_1.CashBook(this.options, this.http, this.uriHelper);
    };
    Analytics.prototype.customers = function () {
        return new customers_1.Customers(this.options, this.http, this.uriHelper);
    };
    return Analytics;
}());
exports.Analytics = Analytics;
var ReportsStocksFetchFailed = /** @class */ (function (_super) {
    __extends(ReportsStocksFetchFailed, _super);
    function ReportsStocksFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsStocksFetchFailed';
        return _this;
    }
    return ReportsStocksFetchFailed;
}(errors_1.BaseError));
exports.ReportsStocksFetchFailed = ReportsStocksFetchFailed;
var RefundsReportFetchFailed = /** @class */ (function (_super) {
    __extends(RefundsReportFetchFailed, _super);
    function RefundsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the refunds report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RefundsReportFetchFailed';
        return _this;
    }
    return RefundsReportFetchFailed;
}(errors_1.BaseError));
exports.RefundsReportFetchFailed = RefundsReportFetchFailed;
var VouchersReportFetchFailed = /** @class */ (function (_super) {
    __extends(VouchersReportFetchFailed, _super);
    function VouchersReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersReportFetchFailed';
        return _this;
    }
    return VouchersReportFetchFailed;
}(errors_1.BaseError));
exports.VouchersReportFetchFailed = VouchersReportFetchFailed;
var ProductsReportFetchFailed = /** @class */ (function (_super) {
    __extends(ProductsReportFetchFailed, _super);
    function ProductsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the products report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsReportFetchFailed';
        return _this;
    }
    return ProductsReportFetchFailed;
}(errors_1.BaseError));
exports.ProductsReportFetchFailed = ProductsReportFetchFailed;
var PaymentsReportFetchFailed = /** @class */ (function (_super) {
    __extends(PaymentsReportFetchFailed, _super);
    function PaymentsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the payments report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentsReportFetchFailed';
        return _this;
    }
    return PaymentsReportFetchFailed;
}(errors_1.BaseError));
exports.PaymentsReportFetchFailed = PaymentsReportFetchFailed;
var RevenuesFetchFailed = /** @class */ (function (_super) {
    __extends(RevenuesFetchFailed, _super);
    function RevenuesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Revenues'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RevenuesFetchFailed';
        return _this;
    }
    return RevenuesFetchFailed;
}(errors_1.BaseError));
exports.RevenuesFetchFailed = RevenuesFetchFailed;
var ReportsProductGroupsFiltersFetchFailed = /** @class */ (function (_super) {
    __extends(ReportsProductGroupsFiltersFetchFailed, _super);
    function ReportsProductGroupsFiltersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not get products group filters'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsProductGroupsFiltersFetchFailed';
        return _this;
    }
    return ReportsProductGroupsFiltersFetchFailed;
}(errors_1.BaseError));
exports.ReportsProductGroupsFiltersFetchFailed = ReportsProductGroupsFiltersFetchFailed;
var ReportsProductGroupsFetchFailed = /** @class */ (function (_super) {
    __extends(ReportsProductGroupsFetchFailed, _super);
    function ReportsProductGroupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsProductGroupsFetchFailed';
        return _this;
    }
    return ReportsProductGroupsFetchFailed;
}(errors_1.BaseError));
exports.ReportsProductGroupsFetchFailed = ReportsProductGroupsFetchFailed;
var ReportsCustomerOverviewFailed = /** @class */ (function (_super) {
    __extends(ReportsCustomerOverviewFailed, _super);
    function ReportsCustomerOverviewFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer overview'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsProductGroupsFetchFailed';
        return _this;
    }
    return ReportsCustomerOverviewFailed;
}(errors_1.BaseError));
exports.ReportsCustomerOverviewFailed = ReportsCustomerOverviewFailed;
var ReportsCustomerTransactionsFailed = /** @class */ (function (_super) {
    __extends(ReportsCustomerTransactionsFailed, _super);
    function ReportsCustomerTransactionsFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer transactions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsCustomerTransactionsFailed';
        return _this;
    }
    return ReportsCustomerTransactionsFailed;
}(errors_1.BaseError));
exports.ReportsCustomerTransactionsFailed = ReportsCustomerTransactionsFailed;
var ReportsCustomerCustomersFailed = /** @class */ (function (_super) {
    __extends(ReportsCustomerCustomersFailed, _super);
    function ReportsCustomerCustomersFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer reports'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsCustomerCustomersFailed';
        return _this;
    }
    return ReportsCustomerCustomersFailed;
}(errors_1.BaseError));
exports.ReportsCustomerCustomersFailed = ReportsCustomerCustomersFailed;
var SimpleSalesCartItemsReportFetchFailed = /** @class */ (function (_super) {
    __extends(SimpleSalesCartItemsReportFetchFailed, _super);
    function SimpleSalesCartItemsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the sales cart items report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SimpleSalesCartItemsReportFetchFailed';
        return _this;
    }
    return SimpleSalesCartItemsReportFetchFailed;
}(errors_1.BaseError));
exports.SimpleSalesCartItemsReportFetchFailed = SimpleSalesCartItemsReportFetchFailed;
var ProductGroupsReportFetchFailed = /** @class */ (function (_super) {
    __extends(ProductGroupsReportFetchFailed, _super);
    function ProductGroupsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the product groups report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsReportFetchFailed';
        return _this;
    }
    return ProductGroupsReportFetchFailed;
}(errors_1.BaseError));
exports.ProductGroupsReportFetchFailed = ProductGroupsReportFetchFailed;
var StatisticsProductChildrenFetchFailed = /** @class */ (function (_super) {
    __extends(StatisticsProductChildrenFetchFailed, _super);
    function StatisticsProductChildrenFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Statistics Products Children'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StatisticsProductChildrenFetchFailed';
        return _this;
    }
    return StatisticsProductChildrenFetchFailed;
}(errors_1.BaseError));
exports.StatisticsProductChildrenFetchFailed = StatisticsProductChildrenFetchFailed;
var StaffOverviewFetchFailed = /** @class */ (function (_super) {
    __extends(StaffOverviewFetchFailed, _super);
    function StaffOverviewFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the staff overview report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffOverviewFetchFailed';
        return _this;
    }
    return StaffOverviewFetchFailed;
}(errors_1.BaseError));
exports.StaffOverviewFetchFailed = StaffOverviewFetchFailed;
var StatisticsProductFetchFailed = /** @class */ (function (_super) {
    __extends(StatisticsProductFetchFailed, _super);
    function StatisticsProductFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Statistics Products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StatisticsProductFetchFailed';
        return _this;
    }
    return StatisticsProductFetchFailed;
}(errors_1.BaseError));
exports.StatisticsProductFetchFailed = StatisticsProductFetchFailed;
//# sourceMappingURL=analytics.js.map