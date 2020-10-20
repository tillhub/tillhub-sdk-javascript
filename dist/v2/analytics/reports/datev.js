"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsDatevExportFetchError = exports.AnalyticsReportsDatev = void 0;
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
            var localUriHelper, uri, result, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v2/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/datev');
                        return [4, this.handleExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        err_1 = _a.sent();
                        throw new AnalyticsReportsDatevExportFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsDatev;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsDatev = AnalyticsReportsDatev;
var AnalyticsReportsDatevExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsDatevExportFetchError, _super);
    function AnalyticsReportsDatevExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch datev report. '; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsDatevExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsDatevExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsDatevExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsDatevExportFetchError = AnalyticsReportsDatevExportFetchError;
//# sourceMappingURL=datev.js.map