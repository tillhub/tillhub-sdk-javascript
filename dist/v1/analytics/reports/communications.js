"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsCommunicationsMetaFailed = exports.AnalyticsReportsCommunicationsFetchAllFailed = exports.AnalyticsReportsCommunications = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../../../uri-helper");
var errors_1 = require("../../../errors");
var base_1 = require("../../../base");
var AnalyticsReportsCommunications = (function (_super) {
    tslib_1.__extends(AnalyticsReportsCommunications, _super);
    function AnalyticsReportsCommunications(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        _this.uriHelper = new uri_helper_1.UriHelper('/api/v1/notifications/reports/communications', _this.options);
        return _this;
    }
    AnalyticsReportsCommunications.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsCommunications, options, http);
    };
    AnalyticsReportsCommunications.prototype.getAll = function (query) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response_1, next, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _c.sent();
                        if (response_1.status !== 200) {
                            throw new AnalyticsReportsCommunicationsFetchAllFailed(undefined, { status: response_1.status });
                        }
                        next = void 0;
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.after }); };
                        }
                        return [2, {
                                data: (_b = response_1.data.results) !== null && _b !== void 0 ? _b : [],
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 2:
                        error_1 = _c.sent();
                        throw new AnalyticsReportsCommunicationsFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AnalyticsReportsCommunications.prototype.meta = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new AnalyticsReportsCommunicationsMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new AnalyticsReportsCommunicationsMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new AnalyticsReportsCommunicationsMetaFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsCommunications;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsCommunications = AnalyticsReportsCommunications;
var AnalyticsReportsCommunicationsFetchAllFailed = (function (_super) {
    tslib_1.__extends(AnalyticsReportsCommunicationsFetchAllFailed, _super);
    function AnalyticsReportsCommunicationsFetchAllFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the communications'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsCommunicationsFetchAllFailed';
        Object.setPrototypeOf(_this, AnalyticsReportsCommunicationsFetchAllFailed.prototype);
        return _this;
    }
    return AnalyticsReportsCommunicationsFetchAllFailed;
}(errors_1.BaseError));
exports.AnalyticsReportsCommunicationsFetchAllFailed = AnalyticsReportsCommunicationsFetchAllFailed;
var AnalyticsReportsCommunicationsMetaFailed = (function (_super) {
    tslib_1.__extends(AnalyticsReportsCommunicationsMetaFailed, _super);
    function AnalyticsReportsCommunicationsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch communications report metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ReportsCommunicationsMetaFailed';
        Object.setPrototypeOf(_this, AnalyticsReportsCommunicationsMetaFailed.prototype);
        return _this;
    }
    return AnalyticsReportsCommunicationsMetaFailed;
}(errors_1.BaseError));
exports.AnalyticsReportsCommunicationsMetaFailed = AnalyticsReportsCommunicationsMetaFailed;
//# sourceMappingURL=communications.js.map