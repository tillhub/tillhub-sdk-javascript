"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsCountingProtocolsExportFetchError = exports.AnalyticsReportsCountingProtocolsFetchFailed = exports.AnalyticsReportsCountingProtocols = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsCountingProtocols = (function (_super) {
    tslib_1.__extends(AnalyticsReportsCountingProtocols, _super);
    function AnalyticsReportsCountingProtocols(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsCountingProtocols.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsCountingProtocols, options, http);
    };
    AnalyticsReportsCountingProtocols.prototype.getAll = function (query) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nextFn, localUriHelper, uri, _j, d, next_1, status_1, data, summary, count, totalCount, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 2, , 3]);
                        nextFn = void 0;
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/cashier_counting_protocols/overview');
                        return [4, this.handleGet(uri, query, { timeout: this.timeout })];
                    case 1:
                        _j = _k.sent(), d = _j.results, next_1 = _j.next, status_1 = _j.status;
                        if (status_1 !== 200) {
                            throw new AnalyticsReportsCountingProtocolsFetchFailed(undefined, { status: status_1 });
                        }
                        data = (_b = (_a = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_data';
                        })) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : [];
                        summary = (_d = (_c = d === null || d === void 0 ? void 0 : d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_summary';
                        })) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : [];
                        count = (_f = (_e = d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_filtered_meta';
                        })) === null || _e === void 0 ? void 0 : _e.values[0]) !== null && _f !== void 0 ? _f : {};
                        totalCount = (_h = (_g = d.find(function (item) {
                            return item.metric.job === 'reports_counting_protocols_v2_overview_meta';
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
                        throw new AnalyticsReportsCountingProtocolsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsCountingProtocols.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/cashier_counting_protocols/overview');
                        return [4, this.handleExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new AnalyticsReportsCountingProtocolsExportFetchError(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsCountingProtocols;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsCountingProtocols = AnalyticsReportsCountingProtocols;
var AnalyticsReportsCountingProtocolsFetchFailed = (function (_super) {
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
var AnalyticsReportsCountingProtocolsExportFetchError = (function (_super) {
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