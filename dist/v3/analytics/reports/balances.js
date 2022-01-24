"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV3BalancesExportFetchError = exports.AnalyticsReportsBalances = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsBalances = (function (_super) {
    tslib_1.__extends(AnalyticsReportsBalances, _super);
    function AnalyticsReportsBalances(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsBalances.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsBalances, options, http);
    };
    AnalyticsReportsBalances.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v3/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/balances/overview');
                        return [4, this.handleSocketsExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        error_1 = _a.sent();
                        throw new AnalyticsReportsV3BalancesExportFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsBalances;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsBalances = AnalyticsReportsBalances;
var AnalyticsReportsV3BalancesExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV3BalancesExportFetchError, _super);
    function AnalyticsReportsV3BalancesExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch balances report export.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV3BalancesExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV3BalancesExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV3BalancesExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV3BalancesExportFetchError = AnalyticsReportsV3BalancesExportFetchError;
//# sourceMappingURL=balances.js.map