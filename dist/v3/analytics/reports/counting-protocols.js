"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsCountingProtocols = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var counting_protocols_1 = require("../../../v2/analytics/reports/counting-protocols");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsCountingProtocols = (function (_super) {
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
    AnalyticsReportsCountingProtocols.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, uri, result, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v3/analytics', this.options);
                        uri = localUriHelper.generateBaseUri('/reports/cashier_counting_protocols/overview');
                        return [4, this.handleSocketsExport(uri, query)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                    case 2:
                        error_1 = _a.sent();
                        throw new counting_protocols_1.AnalyticsReportsCountingProtocolsExportFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsCountingProtocols;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsCountingProtocols = AnalyticsReportsCountingProtocols;
//# sourceMappingURL=counting-protocols.js.map