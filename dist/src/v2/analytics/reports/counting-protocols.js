"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsCountingProtocolsExportFetchError = exports.AnalyticsReportsCountingProtocolsFetchFailed = exports.AnalyticsReportsCountingProtocols = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsCountingProtocols = /** @class */ (function (_super) {
    tslib_1.__extends(AnalyticsReportsCountingProtocols, _super);
    function AnalyticsReportsCountingProtocols(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsCountingProtocols.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsCountingProtocols, options, http);
    };
    AnalyticsReportsCountingProtocols.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _a, d, next_1, status_1, data, summary, count, totalCount, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/cashier_counting_protocols/overview');
                        return [4 /*yield*/, this.handleGet(uri, query)];
                    case 1:
                        _a = _b.sent(), d = _a.results, next_1 = _a.next, status_1 = _a.status;
                        if (status_1 !== 200) {
                            throw new AnalyticsReportsCountingProtocolsFetchFailed(undefined, { status: status_1 });
                        }
                        data = d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_data';
                        }).values;
                        summary = d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_summary';
                        }).values;
                        count = d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_filtered_meta';
                        }).values[0];
                        totalCount = d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_meta';
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
                                    count: count.count,
                                    total_count: totalCount.count
                                },
                                next: nextFn
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new AnalyticsReportsCountingProtocolsFetchFailed(undefined, { error: err_1 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsReportsCountingProtocols.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/cashier_counting_protocols/overview');
                        return [4 /*yield*/, this.handleExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        err_2 = _a.sent();
                        throw new AnalyticsReportsCountingProtocolsExportFetchError(undefined, { error: err_2 });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AnalyticsReportsCountingProtocols;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsCountingProtocols = AnalyticsReportsCountingProtocols;
var AnalyticsReportsCountingProtocolsFetchFailed = /** @class */ (function (_super) {
    tslib_1.__extends(AnalyticsReportsCountingProtocolsFetchFailed, _super);
    function AnalyticsReportsCountingProtocolsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the counting protocols report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsCountingProtocolsFetchFailed';
        Object.setPrototypeOf(_this, AnalyticsReportsCountingProtocolsFetchFailed.prototype);
        return _this;
    }
    return AnalyticsReportsCountingProtocolsFetchFailed;
}(errors_1.BaseError));
exports.AnalyticsReportsCountingProtocolsFetchFailed = AnalyticsReportsCountingProtocolsFetchFailed;
var AnalyticsReportsCountingProtocolsExportFetchError = /** @class */ (function (_super) {
    tslib_1.__extends(AnalyticsReportsCountingProtocolsExportFetchError, _super);
    function AnalyticsReportsCountingProtocolsExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch counting protocols export. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsCountingProtocolsExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsCountingProtocolsExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsCountingProtocolsExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsCountingProtocolsExportFetchError = AnalyticsReportsCountingProtocolsExportFetchError;
//# sourceMappingURL=counting-protocols.js.map