"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsRevenuesGroupedExportFetchError = exports.AnalyticsReportsRevenuesGroupedFetchError = exports.AnalyticsReportsRevenuesGrouped = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsRevenuesGrouped = (function (_super) {
    tslib_1.__extends(AnalyticsReportsRevenuesGrouped, _super);
    function AnalyticsReportsRevenuesGrouped(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsRevenuesGrouped.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsRevenuesGrouped, options, http);
    };
    AnalyticsReportsRevenuesGrouped.prototype.getAll = function (query) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _e, d, next_1, data, summary, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/revenues/grouped');
                        return [4, this.handleGet(uri, query, { timeout: this.timeout })];
                    case 1:
                        _e = _f.sent(), d = _e.results, next_1 = _e.next;
                        if (!d) {
                            throw new TypeError('Unexpectedly did not return data.');
                        }
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_revenues_items_v2_data'; })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        summary = (_d = (_c = d === null || d === void 0 ? void 0 : d.find(function (item) { return item.metric.job === 'reports_revenues_items_v2_summary'; })) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : [];
                        if (next_1) {
                            nextFn = function () {
                                return _this.getAll({ uri: next_1 });
                            };
                        }
                        return [2, {
                                data: data,
                                summary: summary,
                                metaData: {},
                                next: nextFn
                            }];
                    case 2:
                        error_1 = _f.sent();
                        throw new AnalyticsReportsRevenuesGroupedFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsRevenuesGrouped.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/revenues/grouped');
                        return [4, this.handleExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new AnalyticsReportsRevenuesGroupedExportFetchError(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsRevenuesGrouped;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsRevenuesGrouped = AnalyticsReportsRevenuesGrouped;
var AnalyticsReportsRevenuesGroupedFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsRevenuesGroupedFetchError, _super);
    function AnalyticsReportsRevenuesGroupedFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch revenue items. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsRevenuesGroupedFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsRevenuesGroupedFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsRevenuesGroupedFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsRevenuesGroupedFetchError = AnalyticsReportsRevenuesGroupedFetchError;
var AnalyticsReportsRevenuesGroupedExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsRevenuesGroupedExportFetchError, _super);
    function AnalyticsReportsRevenuesGroupedExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch revenue grouped export. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsRevenuesGroupedExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsRevenuesGroupedExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsRevenuesGroupedExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsRevenuesGroupedExportFetchError = AnalyticsReportsRevenuesGroupedExportFetchError;
//# sourceMappingURL=revenues.js.map