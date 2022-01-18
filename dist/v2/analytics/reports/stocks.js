"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsStocksExportFetchFailed = exports.AnalyticsReportsStocksFetchFailed = exports.AnalyticsReportsStocks = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsStocks = (function (_super) {
    tslib_1.__extends(AnalyticsReportsStocks, _super);
    function AnalyticsReportsStocks(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsStocks.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsStocks, options, http);
    };
    AnalyticsReportsStocks.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _g, d, next_1, data, count, totalCount, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/stocks');
                        return [4, this.handleGet(uri, query, { timeout: this.timeout })];
                    case 1:
                        _g = _h.sent(), d = _g.results, next_1 = _g.next;
                        if (!d) {
                            throw new TypeError('Unexpectedly did not return data.');
                        }
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_stocks'; })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        count = (_d = (_c = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_stocks_filtered_meta';
                        })) === null || _c === void 0 ? void 0 : _c.values[0]) !== null && _d !== void 0 ? _d : {};
                        totalCount = (_f = (_e = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_stocks_meta'; })) === null || _e === void 0 ? void 0 : _e.values[0]) !== null && _f !== void 0 ? _f : {};
                        if (next_1) {
                            nextFn = function () {
                                return _this.getAll({ uri: next_1 });
                            };
                        }
                        return [2, {
                                data: data,
                                metaData: {
                                    count: count.count,
                                    total_count: totalCount.count
                                },
                                next: nextFn
                            }];
                    case 2:
                        error_1 = _h.sent();
                        throw new AnalyticsReportsStocksFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsStocks.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/stocks');
                        return [4, this.handleSocketsExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new AnalyticsReportsStocksExportFetchFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsStocks;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsStocks = AnalyticsReportsStocks;
var AnalyticsReportsStocksFetchFailed = (function (_super) {
    tslib_1.__extends(AnalyticsReportsStocksFetchFailed, _super);
    function AnalyticsReportsStocksFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks analytics reports'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsStocksFetchFailed';
        Object.setPrototypeOf(_this, AnalyticsReportsStocksFetchFailed.prototype);
        return _this;
    }
    return AnalyticsReportsStocksFetchFailed;
}(errors_1.BaseError));
exports.AnalyticsReportsStocksFetchFailed = AnalyticsReportsStocksFetchFailed;
var AnalyticsReportsStocksExportFetchFailed = (function (_super) {
    tslib_1.__extends(AnalyticsReportsStocksExportFetchFailed, _super);
    function AnalyticsReportsStocksExportFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch stocks export. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsStocksExportFetchFailed';
        Object.setPrototypeOf(_this, AnalyticsReportsStocksExportFetchFailed.prototype);
        return _this;
    }
    return AnalyticsReportsStocksExportFetchFailed;
}(errors_1.BaseError));
exports.AnalyticsReportsStocksExportFetchFailed = AnalyticsReportsStocksExportFetchFailed;
//# sourceMappingURL=stocks.js.map