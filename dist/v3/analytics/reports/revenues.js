"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV3RevenuesExportFetchError = exports.AnalyticsReportsRevenues = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsRevenues = (function (_super) {
    tslib_1.__extends(AnalyticsReportsRevenues, _super);
    function AnalyticsReportsRevenues(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsRevenues.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsRevenues, options, http);
    };
    AnalyticsReportsRevenues.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v3/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/revenues/grouped');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsV3RevenuesExportFetchError();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new AnalyticsReportsV3RevenuesExportFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsRevenues;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsRevenues = AnalyticsReportsRevenues;
var AnalyticsReportsV3RevenuesExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV3RevenuesExportFetchError, _super);
    function AnalyticsReportsV3RevenuesExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch revenues report export.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV3RevenuesExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV3RevenuesExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV3RevenuesExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV3RevenuesExportFetchError = AnalyticsReportsV3RevenuesExportFetchError;
//# sourceMappingURL=revenues.js.map