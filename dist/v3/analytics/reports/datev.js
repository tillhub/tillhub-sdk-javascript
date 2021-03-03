"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV3DatevExportFetchError = exports.AnalyticsReportsDatev = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsDatev = (function (_super) {
    tslib_1.__extends(AnalyticsReportsDatev, _super);
    function AnalyticsReportsDatev(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsDatev.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsDatev, options, http);
    };
    AnalyticsReportsDatev.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v3/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/datev');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsV3DatevExportFetchError();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new AnalyticsReportsV3DatevExportFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsDatev;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsDatev = AnalyticsReportsDatev;
var AnalyticsReportsV3DatevExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV3DatevExportFetchError, _super);
    function AnalyticsReportsV3DatevExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch datev report. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV3DatevExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV3DatevExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV3DatevExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV3DatevExportFetchError = AnalyticsReportsV3DatevExportFetchError;
//# sourceMappingURL=datev.js.map