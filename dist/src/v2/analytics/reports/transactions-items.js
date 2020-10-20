"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsTransactionsItemsFetchError = exports.AnalyticsReportsTransactionsItems = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsTransactionsItems = /** @class */ (function (_super) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _a, d, next_1, status_1, data, summary, count, totalCount, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/transactions/items');
                        return [4 /*yield*/, this.handleGet(uri, query)];
                    case 1:
                        _a = _b.sent(), d = _a.results, next_1 = _a.next, status_1 = _a.status;
                        if (status_1 !== 200) {
                            throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { status: status_1 });
                        }
                        data = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_data';
                        }).values;
                        summary = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_summary';
                        }).values;
                        count = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_filtered_meta';
                        }).values[0];
                        totalCount = d.find(function (item) {
                            return item.metric.job === 'reports_transactions_items_v2_overview_meta';
                        }).values[0];
                        if (next_1) {
                            nextFn = function () {
                                return _this.getAll({ uri: next_1 });
                            };
                        }
                        return [2 /*return*/, {
                                data: data,
                                summary: summary,
                                metaData: {
                                    // eslint-disable-next-line
                                    // @ts-ignore
                                    count: count.count,
                                    // eslint-disable-next-line
                                    // @ts-ignore
                                    total_count: totalCount.count
                                },
                                next: nextFn
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new AnalyticsReportsTransactionsItemsFetchError(undefined, { error: err_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnalyticsReportsTransactionsItems;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactionsItems = AnalyticsReportsTransactionsItems;
var AnalyticsReportsTransactionsItemsFetchError = /** @class */ (function (_super) {
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
//# sourceMappingURL=transactions-items.js.map