"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsRevenuesGroupedExportFetchError = exports.AnalyticsReportsRevenuesGroupedFetchError = exports.AnalyticsReportsRevenuesGrouped = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var AnalyticsReportsRevenuesGrouped = (function (_super) {
    tslib_1.__extends(AnalyticsReportsRevenuesGrouped, _super);
    function AnalyticsReportsRevenuesGrouped(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsRevenuesGrouped.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsRevenuesGrouped, options, http);
    };
    AnalyticsReportsRevenuesGrouped.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, _a, d, next_1, data, summary, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        return [4, this.handleGet(this.options.base + "/api/v2/analytics/" + this.options.user + "/reports/revenues/grouped", query)];
                    case 1:
                        _a = _b.sent(), d = _a.results, next_1 = _a.next;
                        if (!d) {
                            throw new TypeError('Unexpectedly did not return data.');
                        }
                        data = (d.find(function (item) { return item.metric.job === 'reports_revenues_items_v2_data'; }) || {}).values;
                        summary = d.find(function (item) { return item.metric.job === 'reports_revenues_items_v2_summary'; }).values;
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
                        err_1 = _b.sent();
                        throw new AnalyticsReportsRevenuesGroupedFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsRevenuesGrouped.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.handleExport(this.options.base + "/api/v2/analytics/" + this.options.user + "/reports/revenues/grouped", query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        err_2 = _a.sent();
                        throw new AnalyticsReportsRevenuesGroupedExportFetchError(undefined, { error: err_2 });
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