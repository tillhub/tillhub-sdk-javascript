"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsProductFetchFailed = exports.StaffOverviewFetchFailed = exports.StatisticsProductChildrenFetchFailed = exports.ProductGroupsReportFetchFailed = exports.ProductGroupsStaffReportFetchFailed = exports.SimpleSalesCartItemsReportFetchFailed = exports.ReportsCustomerCustomersFailed = exports.ReportsCustomerTransactionsFailed = exports.ReportsCustomerOverviewFailed = exports.ReportsProductGroupsFetchFailed = exports.ReportsProductGroupsFiltersFetchFailed = exports.RevenuesFetchFailed = exports.TopPaymentsReportFetchFailed = exports.PaymentsReportFetchFailed = exports.ProductsReportFetchFailed = exports.VouchersReportFetchFailed = exports.RefundsReportFetchFailed = exports.ReportsStocksFetchFailed = exports.Analytics = void 0;
var tslib_1 = require("tslib");
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
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/analytics';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Analytics.prototype.getRevenuesForDayOfWeek = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues/day_of_week');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new RevenuesFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new RevenuesFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getRevenuesSumForTimeRange = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues/sum');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new RevenuesFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new RevenuesFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getRevenues = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new RevenuesFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new RevenuesFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getRevenuesForHourOfDay = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/revenues/hour_of_day');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new RevenuesFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_4 = _a.sent();
                        throw new RevenuesFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getReportsProducts = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/products');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new StatisticsProductFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_5 = _a.sent();
                        throw new StatisticsProductFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getProductsChildren = function (productNumber, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/reports/products/" + productNumber);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new StatisticsProductChildrenFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_6 = _a.sent();
                        throw new StatisticsProductChildrenFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getStaffOverviewReport = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/staff/overview');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new StaffOverviewFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_7 = _a.sent();
                        throw new StaffOverviewFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getProductGroupsStaffReport = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/staff/product_groups');
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ProductGroupsStaffReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_8 = _a.sent();
                        throw new ProductGroupsStaffReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getProductGroupsReport = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/aggregates/product_groups');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ProductGroupsReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_9 = _a.sent();
                        throw new ProductGroupsReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getRefundsReport = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/staff/refunds');
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new RefundsReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_10 = _a.sent();
                        throw new RefundsReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getVouchersReports = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/vouchers');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new VouchersReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_11 = _a.sent();
                        throw new VouchersReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getProductsReport = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/staff/products');
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ProductsReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_12 = _a.sent();
                        throw new ProductsReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getPaymentsReport = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_13;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/staff/payments');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new PaymentsReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_13 = _a.sent();
                        throw new PaymentsReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getTopPaymentsReport = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_14;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/payments/top');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new TopPaymentsReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_14 = _a.sent();
                        throw new TopPaymentsReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getSimpleSalesCartItems = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_15;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/transactions/simple');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new SimpleSalesCartItemsReportFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results[0].results,
                                metadata: {
                                    count: response.data.results[0].count,
                                    metric: response.data.results[0].metric
                                }
                            }];
                    case 2:
                        err_15 = _a.sent();
                        throw new SimpleSalesCartItemsReportFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: Remove when customers() is implemented
    Analytics.prototype.getCustomersReport = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_16;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ReportsCustomerCustomersFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_16 = _a.sent();
                        throw new ReportsCustomerCustomersFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: Remove when customers() is implemented
    Analytics.prototype.getCustomersTransaction = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_17;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers/transactions');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ReportsCustomerTransactionsFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_17 = _a.sent();
                        throw new ReportsCustomerTransactionsFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: Remove when customers() is implemented
    Analytics.prototype.getCustomersOverview = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_18;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers/overview');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ReportsCustomerOverviewFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_18 = _a.sent();
                        throw new ReportsCustomerOverviewFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getStocksReport = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_19;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/stocks');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ReportsStocksFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_19 = _a.sent();
                        throw new ReportsStocksFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getProductGroups = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_20;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/product_groups');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ReportsProductGroupsFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_20 = _a.sent();
                        throw new ReportsProductGroupsFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Analytics.prototype.getProductGroupsFilters = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_21;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/product_groups/filters');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new ReportsProductGroupsFiltersFetchFailed();
                        return [2 /*return*/, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_21 = _a.sent();
                        throw new ReportsProductGroupsFiltersFetchFailed();
                    case 3: return [2 /*return*/];
                }
            });
        });
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
    tslib_1.__extends(ReportsStocksFetchFailed, _super);
    function ReportsStocksFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsStocksFetchFailed';
        Object.setPrototypeOf(_this, ReportsStocksFetchFailed.prototype);
        return _this;
    }
    return ReportsStocksFetchFailed;
}(errors_1.BaseError));
exports.ReportsStocksFetchFailed = ReportsStocksFetchFailed;
var RefundsReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(RefundsReportFetchFailed, _super);
    function RefundsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the refunds report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RefundsReportFetchFailed';
        Object.setPrototypeOf(_this, RefundsReportFetchFailed.prototype);
        return _this;
    }
    return RefundsReportFetchFailed;
}(errors_1.BaseError));
exports.RefundsReportFetchFailed = RefundsReportFetchFailed;
var VouchersReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(VouchersReportFetchFailed, _super);
    function VouchersReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersReportFetchFailed';
        Object.setPrototypeOf(_this, VouchersReportFetchFailed.prototype);
        return _this;
    }
    return VouchersReportFetchFailed;
}(errors_1.BaseError));
exports.VouchersReportFetchFailed = VouchersReportFetchFailed;
var ProductsReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductsReportFetchFailed, _super);
    function ProductsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the products report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsReportFetchFailed';
        Object.setPrototypeOf(_this, ProductsReportFetchFailed.prototype);
        return _this;
    }
    return ProductsReportFetchFailed;
}(errors_1.BaseError));
exports.ProductsReportFetchFailed = ProductsReportFetchFailed;
var PaymentsReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(PaymentsReportFetchFailed, _super);
    function PaymentsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch payments report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'PaymentsReportFetchFailed';
        Object.setPrototypeOf(_this, PaymentsReportFetchFailed.prototype);
        return _this;
    }
    return PaymentsReportFetchFailed;
}(errors_1.BaseError));
exports.PaymentsReportFetchFailed = PaymentsReportFetchFailed;
var TopPaymentsReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(TopPaymentsReportFetchFailed, _super);
    function TopPaymentsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch top payments report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TopPaymentsReportFetchFailed';
        Object.setPrototypeOf(_this, TopPaymentsReportFetchFailed.prototype);
        return _this;
    }
    return TopPaymentsReportFetchFailed;
}(errors_1.BaseError));
exports.TopPaymentsReportFetchFailed = TopPaymentsReportFetchFailed;
var RevenuesFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(RevenuesFetchFailed, _super);
    function RevenuesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Revenues'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RevenuesFetchFailed';
        Object.setPrototypeOf(_this, RevenuesFetchFailed.prototype);
        return _this;
    }
    return RevenuesFetchFailed;
}(errors_1.BaseError));
exports.RevenuesFetchFailed = RevenuesFetchFailed;
var ReportsProductGroupsFiltersFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ReportsProductGroupsFiltersFetchFailed, _super);
    function ReportsProductGroupsFiltersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not get products group filters'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsProductGroupsFiltersFetchFailed';
        Object.setPrototypeOf(_this, ReportsProductGroupsFiltersFetchFailed.prototype);
        return _this;
    }
    return ReportsProductGroupsFiltersFetchFailed;
}(errors_1.BaseError));
exports.ReportsProductGroupsFiltersFetchFailed = ReportsProductGroupsFiltersFetchFailed;
var ReportsProductGroupsFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ReportsProductGroupsFetchFailed, _super);
    function ReportsProductGroupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product groups'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsProductGroupsFetchFailed';
        Object.setPrototypeOf(_this, ReportsProductGroupsFetchFailed.prototype);
        return _this;
    }
    return ReportsProductGroupsFetchFailed;
}(errors_1.BaseError));
exports.ReportsProductGroupsFetchFailed = ReportsProductGroupsFetchFailed;
var ReportsCustomerOverviewFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ReportsCustomerOverviewFailed, _super);
    function ReportsCustomerOverviewFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer overview'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsProductGroupsFetchFailed';
        Object.setPrototypeOf(_this, ReportsProductGroupsFetchFailed.prototype);
        return _this;
    }
    return ReportsCustomerOverviewFailed;
}(errors_1.BaseError));
exports.ReportsCustomerOverviewFailed = ReportsCustomerOverviewFailed;
var ReportsCustomerTransactionsFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ReportsCustomerTransactionsFailed, _super);
    function ReportsCustomerTransactionsFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer transactions'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsCustomerTransactionsFailed';
        Object.setPrototypeOf(_this, ReportsCustomerTransactionsFailed.prototype);
        return _this;
    }
    return ReportsCustomerTransactionsFailed;
}(errors_1.BaseError));
exports.ReportsCustomerTransactionsFailed = ReportsCustomerTransactionsFailed;
var ReportsCustomerCustomersFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ReportsCustomerCustomersFailed, _super);
    function ReportsCustomerCustomersFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch customer reports'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsCustomerCustomersFailed';
        Object.setPrototypeOf(_this, ReportsCustomerCustomersFailed.prototype);
        return _this;
    }
    return ReportsCustomerCustomersFailed;
}(errors_1.BaseError));
exports.ReportsCustomerCustomersFailed = ReportsCustomerCustomersFailed;
var SimpleSalesCartItemsReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleSalesCartItemsReportFetchFailed, _super);
    function SimpleSalesCartItemsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the sales cart items report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SimpleSalesCartItemsReportFetchFailed';
        Object.setPrototypeOf(_this, SimpleSalesCartItemsReportFetchFailed.prototype);
        return _this;
    }
    return SimpleSalesCartItemsReportFetchFailed;
}(errors_1.BaseError));
exports.SimpleSalesCartItemsReportFetchFailed = SimpleSalesCartItemsReportFetchFailed;
var ProductGroupsStaffReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductGroupsStaffReportFetchFailed, _super);
    function ProductGroupsStaffReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the product groups staff report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsStaffReportFetchFailed';
        Object.setPrototypeOf(_this, ProductGroupsStaffReportFetchFailed.prototype);
        return _this;
    }
    return ProductGroupsStaffReportFetchFailed;
}(errors_1.BaseError));
exports.ProductGroupsStaffReportFetchFailed = ProductGroupsStaffReportFetchFailed;
var ProductGroupsReportFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(ProductGroupsReportFetchFailed, _super);
    function ProductGroupsReportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the product groups report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductGroupsReportFetchFailed';
        Object.setPrototypeOf(_this, ProductGroupsReportFetchFailed.prototype);
        return _this;
    }
    return ProductGroupsReportFetchFailed;
}(errors_1.BaseError));
exports.ProductGroupsReportFetchFailed = ProductGroupsReportFetchFailed;
var StatisticsProductChildrenFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(StatisticsProductChildrenFetchFailed, _super);
    function StatisticsProductChildrenFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Statistics Products Children'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StatisticsProductChildrenFetchFailed';
        Object.setPrototypeOf(_this, StatisticsProductChildrenFetchFailed.prototype);
        return _this;
    }
    return StatisticsProductChildrenFetchFailed;
}(errors_1.BaseError));
exports.StatisticsProductChildrenFetchFailed = StatisticsProductChildrenFetchFailed;
var StaffOverviewFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(StaffOverviewFetchFailed, _super);
    function StaffOverviewFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the staff overview report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffOverviewFetchFailed';
        Object.setPrototypeOf(_this, StaffOverviewFetchFailed.prototype);
        return _this;
    }
    return StaffOverviewFetchFailed;
}(errors_1.BaseError));
exports.StaffOverviewFetchFailed = StaffOverviewFetchFailed;
var StatisticsProductFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(StatisticsProductFetchFailed, _super);
    function StatisticsProductFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Statistics Products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StatisticsProductFetchFailed';
        Object.setPrototypeOf(_this, StatisticsProductFetchFailed.prototype);
        return _this;
    }
    return StatisticsProductFetchFailed;
}(errors_1.BaseError));
exports.StatisticsProductFetchFailed = StatisticsProductFetchFailed;
//# sourceMappingURL=analytics.js.map