"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPaymentMethodRejectionFailed = exports.GetPaymentMethodAcceptanceFailed = exports.GetPaymentMethodRevenueFailed = exports.GetRevenueTopBranchRateFailed = exports.GetTxnStatsFailed = exports.AnalyticsGetRevenueFailed = exports.AnalyticsUod = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var AggregationWindow;
(function (AggregationWindow) {
    AggregationWindow["HOURLY"] = "hourly";
    AggregationWindow["DAILY"] = "daily";
    AggregationWindow["WEEKLY"] = "weekly";
    AggregationWindow["MONTHLY"] = "monthly";
    AggregationWindow["QUARTERLY"] = "quarterly";
    AggregationWindow["YEARLY"] = "yearly";
})(AggregationWindow || (AggregationWindow = {}));
var AnalyticsUod = (function (_super) {
    tslib_1.__extends(AnalyticsUod, _super);
    function AnalyticsUod(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: AnalyticsUod.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = AnalyticsUod.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    AnalyticsUod.prototype.getRevenue = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/oms/revenue');
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
    AnalyticsUod.prototype.getTxnStats = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/oms/revenue/stats');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new GetTxnStatsFailed(error_2.message);
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsUod.prototype.getRevenueTopBranchRate = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/revenue/top-branch-rate');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new GetRevenueTopBranchRateFailed(error_3.message);
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsUod.prototype.getPaymentMethodRevenue = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/oms/payment-methods/revenue');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new GetPaymentMethodRevenueFailed(error_4.message);
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsUod.prototype.getPaymentMethodAcceptance = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/oms/payment-methods/acceptance');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_5 = _a.sent();
                        throw new GetPaymentMethodAcceptanceFailed(error_5.message);
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsUod.prototype.getPaymentMethodRejection = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/oms/rejection');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        error_6 = _a.sent();
                        throw new GetPaymentMethodRejectionFailed(error_6.message);
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsUod.baseEndpoint = '/api/v4/analytics';
    return AnalyticsUod;
}(base_1.ThBaseHandler));
exports.AnalyticsUod = AnalyticsUod;
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
var GetTxnStatsFailed = (function (_super) {
    tslib_1.__extends(GetTxnStatsFailed, _super);
    function GetTxnStatsFailed(message, properties) {
        if (message === void 0) { message = 'Could not get transaction stats'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'GetTxnStatsFailed';
        Object.setPrototypeOf(_this, GetTxnStatsFailed.prototype);
        return _this;
    }
    return GetTxnStatsFailed;
}(errors_1.BaseError));
exports.GetTxnStatsFailed = GetTxnStatsFailed;
var GetRevenueTopBranchRateFailed = (function (_super) {
    tslib_1.__extends(GetRevenueTopBranchRateFailed, _super);
    function GetRevenueTopBranchRateFailed(message, properties) {
        if (message === void 0) { message = 'Could not get revenue top branch rate'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'GetRevenueTopBranchRateFailed';
        Object.setPrototypeOf(_this, GetRevenueTopBranchRateFailed.prototype);
        return _this;
    }
    return GetRevenueTopBranchRateFailed;
}(errors_1.BaseError));
exports.GetRevenueTopBranchRateFailed = GetRevenueTopBranchRateFailed;
var GetPaymentMethodRevenueFailed = (function (_super) {
    tslib_1.__extends(GetPaymentMethodRevenueFailed, _super);
    function GetPaymentMethodRevenueFailed(message, properties) {
        if (message === void 0) { message = 'Could not get payment method revenue'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'GetPaymentMethodRevenueFailed';
        Object.setPrototypeOf(_this, GetPaymentMethodRevenueFailed.prototype);
        return _this;
    }
    return GetPaymentMethodRevenueFailed;
}(errors_1.BaseError));
exports.GetPaymentMethodRevenueFailed = GetPaymentMethodRevenueFailed;
var GetPaymentMethodAcceptanceFailed = (function (_super) {
    tslib_1.__extends(GetPaymentMethodAcceptanceFailed, _super);
    function GetPaymentMethodAcceptanceFailed(message, properties) {
        if (message === void 0) { message = 'Could not get payment method acceptance'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'GetPaymentMethodAcceptanceFailed';
        Object.setPrototypeOf(_this, GetPaymentMethodAcceptanceFailed.prototype);
        return _this;
    }
    return GetPaymentMethodAcceptanceFailed;
}(errors_1.BaseError));
exports.GetPaymentMethodAcceptanceFailed = GetPaymentMethodAcceptanceFailed;
var GetPaymentMethodRejectionFailed = (function (_super) {
    tslib_1.__extends(GetPaymentMethodRejectionFailed, _super);
    function GetPaymentMethodRejectionFailed(message, properties) {
        if (message === void 0) { message = 'Could not get revenue payment types'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'GetPaymentMethodRejectionFailed';
        Object.setPrototypeOf(_this, GetPaymentMethodRejectionFailed.prototype);
        return _this;
    }
    return GetPaymentMethodRejectionFailed;
}(errors_1.BaseError));
exports.GetPaymentMethodRejectionFailed = GetPaymentMethodRejectionFailed;
//# sourceMappingURL=analytics-uod.js.map