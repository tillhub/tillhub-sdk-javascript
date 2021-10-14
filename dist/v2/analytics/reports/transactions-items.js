"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsTransactionsItemsExportError = exports.AnalyticsReportsTransactionsItemsFetchError = exports.AnalyticsReportsTransactionsItems = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsTransactionsItems = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionsItems, _super);
    function AnalyticsReportsTransactionsItems(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsTransactionsItems.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactionsItems, options, http);
    };
    AnalyticsReportsTransactionsItems.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _j, d, next_1, status_1, data, summary, count, totalCount, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/transactions/items');
                        return [4, this.handleGet(uri, query)];
                    case 1:
                        _j = _k.sent(), d = _j.results, next_1 = _j.next, status_1 = _j.status;
                        if (status_1 !== 200) {
                            throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { status: status_1 });
                        }
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_data';
                        })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        summary = (_d = (_c = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_summary';
                        })) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : [];
                        count = (_f = (_e = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_filtered_meta';
                        })) === null || _e === void 0 ? void 0 : _e.values[0]) !== null && _f !== void 0 ? _f : {};
                        totalCount = (_h = (_g = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_meta';
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
                        err_1 = _k.sent();
                        throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsTransactionsItems.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/transactions/items');
                        uri = localUriHelper.generateUriWithQuery(base, tslib_1.__assign({ format: 'csv' }, query));
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new AnalyticsReportsTransactionsItemsExportError(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: {}
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new AnalyticsReportsTransactionsItemsExportError(undefined, { error: err_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsTransactionsItems;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactionsItems = AnalyticsReportsTransactionsItems;
var AnalyticsReportsTransactionsItemsFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionsItemsFetchError, _super);
    function AnalyticsReportsTransactionsItemsFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transactions items. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionsItemsFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionsItemsFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionsItemsFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionsItemsFetchError = AnalyticsReportsTransactionsItemsFetchError;
var AnalyticsReportsTransactionsItemsExportError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactionsItemsExportError, _super);
    function AnalyticsReportsTransactionsItemsExportError(message, properties) {
        if (message === void 0) { message = 'Could not export transactions items. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsTransactionsItemsExportError';
        Object.setPrototypeOf(_this, AnalyticsReportsTransactionsItemsExportError.prototype);
        return _this;
    }
    return AnalyticsReportsTransactionsItemsExportError;
}(errors_1.BaseError));
exports.AnalyticsReportsTransactionsItemsExportError = AnalyticsReportsTransactionsItemsExportError;
//# sourceMappingURL=transactions-items.js.map