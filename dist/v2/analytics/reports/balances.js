"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsBalancesOverviewExportFetchError = exports.AnalyticsReportsTransactionDetailFetcshError = exports.AnalyticsReportsBalancesOverviewFetchError = exports.AnalyticsReportsBalancesDetail = exports.AnalyticsReportsBalancesOverview = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsBalancesOverview = (function (_super) {
    tslib_1.__extends(AnalyticsReportsBalancesOverview, _super);
    function AnalyticsReportsBalancesOverview(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsBalancesOverview.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesOverview, options, http);
    };
    AnalyticsReportsBalancesOverview.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _j, d, next_1, data, summary, count, totalCount, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/balances/overview');
                        return [4, this.handleGet(uri, query)];
                    case 1:
                        _j = _k.sent(), d = _j.results, next_1 = _j.next;
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_balances_v2_overview_data'; })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        summary = (_d = (_c = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_balances_v2_overview_summary';
                        })) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : [];
                        count = (_f = (_e = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_balances_v2_overview_filtered_meta';
                        })) === null || _e === void 0 ? void 0 : _e.values[0]) !== null && _f !== void 0 ? _f : {};
                        totalCount = (_h = (_g = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_balances_v2_overview_meta'; })) === null || _g === void 0 ? void 0 : _g.values[0]) !== null && _h !== void 0 ? _h : {};
                        if (next_1) {
                            nextFn = function () {
                                return _this.getAll({ uri: next_1 });
                            };
                        }
                        return [2, {
                                data: data,
                                summary: summary,
                                metaData: {
                                    count: count.count,
                                    total_count: totalCount.count
                                },
                                next: nextFn
                            }];
                    case 2:
                        err_1 = _k.sent();
                        throw new AnalyticsReportsBalancesOverviewFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsBalancesOverview.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/balances/overview');
                        return [4, this.handleExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        err_2 = _a.sent();
                        throw new AnalyticsReportsBalancesOverviewExportFetchError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsBalancesOverview;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsBalancesOverview = AnalyticsReportsBalancesOverview;
var AnalyticsReportsBalancesDetail = (function (_super) {
    tslib_1.__extends(AnalyticsReportsBalancesDetail, _super);
    function AnalyticsReportsBalancesDetail(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsBalancesDetail.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalancesDetail, options, http);
    };
    AnalyticsReportsBalancesDetail.prototype.get = function (id) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, d, data, err_3;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri("/reports/balances/" + id + "/detail");
                        return [4, this.handleGet(uri)];
                    case 1:
                        d = (_c.sent()).results;
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_balances_v2_balance_detail_data';
                        })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        return [2, {
                                data: data[0],
                                metaData: {
                                    count: 1,
                                    total_count: 1
                                }
                            }];
                    case 2:
                        err_3 = _c.sent();
                        throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsBalancesDetail;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsBalancesDetail = AnalyticsReportsBalancesDetail;
var AnalyticsReportsBalancesOverviewFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsBalancesOverviewFetchError, _super);
    function AnalyticsReportsBalancesOverviewFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch balance overview. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsBalancesOverviewFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsBalancesOverviewFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsBalancesOverviewFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsBalancesOverviewFetchError = AnalyticsReportsBalancesOverviewFetchError;
var AnalyticsReportsTransactionDetailFetcshError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionDetailFetcshError, _super);
    function AnalyticsReportsTransactionDetailFetcshError(message, properties) {
        if (message === void 0) { message = 'Could not fetch balance detail. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionDetailFetcshError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionDetailFetcshError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionDetailFetcshError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionDetailFetcshError = AnalyticsReportsTransactionDetailFetcshError;
var AnalyticsReportsBalancesOverviewExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsBalancesOverviewExportFetchError, _super);
    function AnalyticsReportsBalancesOverviewExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch balance overview export. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsBalancesOverviewExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsBalancesOverviewExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsBalancesOverviewExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsBalancesOverviewExportFetchError = AnalyticsReportsBalancesOverviewExportFetchError;
//# sourceMappingURL=balances.js.map