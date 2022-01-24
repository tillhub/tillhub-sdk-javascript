"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV3TransactionsExportFetchError = exports.AnalyticsReportsTransactionsOverviewFetchError = exports.AnalyticsReportsTransactions = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsTransactions = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactions, _super);
    function AnalyticsReportsTransactions(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsTransactions.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactions, options, http);
    };
    AnalyticsReportsTransactions.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _j, d, next_1, data, summary, count, totalCount, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v3/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/transactions/overview');
                        return [4, this.handleGet(uri, query, { timeout: this.timeout })];
                    case 1:
                        _j = _k.sent(), d = _j.results, next_1 = _j.next;
                        if (!d) {
                            throw new TypeError('Unexpectedly did not return data.');
                        }
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_data';
                        })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        summary = (_d = (_c = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_summary';
                        })) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : [];
                        count = (_f = (_e = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_filtered_meta';
                        })) === null || _e === void 0 ? void 0 : _e.values[0]) !== null && _f !== void 0 ? _f : {};
                        totalCount = (_h = (_g = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_v2_overview_meta';
                        })) === null || _g === void 0 ? void 0 : _g.values[0]) !== null && _h !== void 0 ? _h : {};
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
                        error_1 = _k.sent();
                        throw new AnalyticsReportsTransactionsOverviewFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsTransactions.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v3/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/transactions/overview');
                        return [4, this.handleSocketsExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new AnalyticsReportsV3TransactionsExportFetchError(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsTransactions;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactions = AnalyticsReportsTransactions;
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
var AnalyticsReportsV3TransactionsExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV3TransactionsExportFetchError, _super);
    function AnalyticsReportsV3TransactionsExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transactions report export.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV3TransactionsExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV3TransactionsExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV3TransactionsExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV3TransactionsExportFetchError = AnalyticsReportsV3TransactionsExportFetchError;
//# sourceMappingURL=transactions.js.map