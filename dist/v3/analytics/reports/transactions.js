"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV3TransactionsExportFetchError = exports.AnalyticsReportsTransactions = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsTransactions = (function (_super) {
    tslib_1.__extends(AnalyticsReportsTransactions, _super);
    function AnalyticsReportsTransactions(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsTransactions.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsTransactions, options, http);
    };
    AnalyticsReportsTransactions.prototype.export = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v3/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/transactions/overview');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsV3TransactionsExportFetchError();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new AnalyticsReportsV3TransactionsExportFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsTransactions;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsTransactions = AnalyticsReportsTransactions;
var AnalyticsReportsV3TransactionsExportFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV3TransactionsExportFetchError, _super);
    function AnalyticsReportsV3TransactionsExportFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch transactions report export.'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV3TransactionsExportFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV3TransactionsExportFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV3TransactionsExportFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV3TransactionsExportFetchError = AnalyticsReportsV3TransactionsExportFetchError;
//# sourceMappingURL=transactions.js.map