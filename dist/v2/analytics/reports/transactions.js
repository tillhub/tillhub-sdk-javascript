"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsTransactionsOverviewExportFetchError = exports.AnalyticsReportsTransactionDetailFetcshError = exports.AnalyticsReportsTransactionsOverviewFetchError = exports.AnalyticsReportsTransactionsDetail = exports.AnalyticsReportsTransactionsOverview = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsTransactionsOverview = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionsOverview, _super);
    function AnalyticsReportsTransactionsOverview(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsTransactionsOverview.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactionsOverview, options, http);
    };
    AnalyticsReportsTransactionsOverview.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _a, d, next_1, data, summary, count, totalCount, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/transactions/overview');
                        return [4, this.handleGet(uri, query)];
                    case 1:
                        _a = _b.sent(), d = _a.results, next_1 = _a.next;
                        if (!d) {
                            throw new TypeError('Unexpectedly did not return data.');
                        }
                        data = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_data';
                        }).values;
                        summary = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_summary';
                        }).values;
                        count = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_filtered_meta';
                        }).values[0];
                        totalCount = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_meta';
                        }).values[0];
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
                        err_1 = _b.sent();
                        throw new AnalyticsReportsTransactionsOverviewFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsTransactionsOverview.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/transactions/overview');
                        return [4, this.handleExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        err_2 = _a.sent();
                        throw new AnalyticsReportsTransactionsOverviewExportFetchError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsTransactionsOverview;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactionsOverview = AnalyticsReportsTransactionsOverview;
var AnalyticsReportsTransactionsDetail = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionsDetail, _super);
    function AnalyticsReportsTransactionsDetail(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsTransactionsDetail.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactionsDetail, options, http);
    };
    AnalyticsReportsTransactionsDetail.prototype.get = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, d, data, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri("/reports/transactions/" + id + "/detail");
                        return [4, this.handleGet(uri)];
                    case 1:
                        d = (_a.sent()).results;
                        data = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_transaction_detail_data';
                        }).values;
                        return [2, {
                                data: data[0],
                                metaData: {
                                    count: 1,
                                    total_count: 1
                                }
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new AnalyticsReportsTransactionDetailFetcshError(undefined, { error: err_3 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsTransactionsDetail;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactionsDetail = AnalyticsReportsTransactionsDetail;
var AnalyticsReportsTransactionsOverviewFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionsOverviewFetchError, _super);
    function AnalyticsReportsTransactionsOverviewFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction overview. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionsOverviewFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionsOverviewFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionsOverviewFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionsOverviewFetchError = AnalyticsReportsTransactionsOverviewFetchError;
var AnalyticsReportsTransactionDetailFetcshError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionDetailFetcshError, _super);
    function AnalyticsReportsTransactionDetailFetcshError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction detail. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionDetailFetcshError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionDetailFetcshError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionDetailFetcshError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionDetailFetcshError = AnalyticsReportsTransactionDetailFetcshError;
var AnalyticsReportsTransactionsOverviewExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionsOverviewExportFetchError, _super);
    function AnalyticsReportsTransactionsOverviewExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transaction overview export. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionsOverviewExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionsOverviewExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionsOverviewExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionsOverviewExportFetchError = AnalyticsReportsTransactionsOverviewExportFetchError;
//# sourceMappingURL=transactions.js.map