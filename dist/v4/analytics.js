"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsGetOpenPurchaseOrdersExpenseFailed = exports.AnalyticsGetOpenPurchaseOrdersCountFailed = exports.AnalyticsGetRevenueAverageFailed = exports.AnalyticsGetRevenueFailed = exports.Analytics = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Analytics = (function (_super) {
    tslib_1.__extends(Analytics, _super);
    function Analytics(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Analytics.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Analytics.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Analytics.prototype.getRevenue = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/revenue');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new AnalyticsGetRevenueFailed(error_1.message);
                    case 3: return [2];
                }
            });
        });
    };
    Analytics.prototype.getRevenueAverage = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/revenue/average');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new AnalyticsGetRevenueAverageFailed(error_2.message);
                    case 3: return [2];
                }
            });
        });
    };
    Analytics.prototype.getOpenPurchaseOrdersCount = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/open-purchase-orders/count');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new AnalyticsGetOpenPurchaseOrdersCountFailed(error_3.message);
                    case 3: return [2];
                }
            });
        });
    };
    Analytics.prototype.getOpenPurchaseOrdersExpense = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/open-purchase-orders/expense');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new AnalyticsGetOpenPurchaseOrdersExpenseFailed(error_4.message);
                    case 3: return [2];
                }
            });
        });
    };
    Analytics.baseEndpoint = '/api/v4/analytics';
    return Analytics;
}(base_1.ThBaseHandler));
exports.Analytics = Analytics;
var AnalyticsGetRevenueFailed = (function (_super) {
    tslib_1.__extends(AnalyticsGetRevenueFailed, _super);
    function AnalyticsGetRevenueFailed(message, properties) {
        if (message === void 0) { message = 'Could not get revenue'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsGetRevenueFailed';
        Object.setPrototypeOf(_this, AnalyticsGetRevenueFailed.prototype);
        return _this;
    }
    return AnalyticsGetRevenueFailed;
}(errors_1.BaseError));
exports.AnalyticsGetRevenueFailed = AnalyticsGetRevenueFailed;
var AnalyticsGetRevenueAverageFailed = (function (_super) {
    tslib_1.__extends(AnalyticsGetRevenueAverageFailed, _super);
    function AnalyticsGetRevenueAverageFailed(message, properties) {
        if (message === void 0) { message = 'Could not get revenue average'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsGetRevenueAverageFailed';
        Object.setPrototypeOf(_this, AnalyticsGetRevenueAverageFailed.prototype);
        return _this;
    }
    return AnalyticsGetRevenueAverageFailed;
}(errors_1.BaseError));
exports.AnalyticsGetRevenueAverageFailed = AnalyticsGetRevenueAverageFailed;
var AnalyticsGetOpenPurchaseOrdersCountFailed = (function (_super) {
    tslib_1.__extends(AnalyticsGetOpenPurchaseOrdersCountFailed, _super);
    function AnalyticsGetOpenPurchaseOrdersCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not get open purchase orders count'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsGetOpenPurchaseOrdersCountFailed';
        Object.setPrototypeOf(_this, AnalyticsGetOpenPurchaseOrdersCountFailed.prototype);
        return _this;
    }
    return AnalyticsGetOpenPurchaseOrdersCountFailed;
}(errors_1.BaseError));
exports.AnalyticsGetOpenPurchaseOrdersCountFailed = AnalyticsGetOpenPurchaseOrdersCountFailed;
var AnalyticsGetOpenPurchaseOrdersExpenseFailed = (function (_super) {
    tslib_1.__extends(AnalyticsGetOpenPurchaseOrdersExpenseFailed, _super);
    function AnalyticsGetOpenPurchaseOrdersExpenseFailed(message, properties) {
        if (message === void 0) { message = 'Could not get open purchase orders expense'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsGetOpenPurchaseOrdersExpenseFailed';
        Object.setPrototypeOf(_this, AnalyticsGetOpenPurchaseOrdersExpenseFailed.prototype);
        return _this;
    }
    return AnalyticsGetOpenPurchaseOrdersExpenseFailed;
}(errors_1.BaseError));
exports.AnalyticsGetOpenPurchaseOrdersExpenseFailed = AnalyticsGetOpenPurchaseOrdersExpenseFailed;
//# sourceMappingURL=analytics.js.map