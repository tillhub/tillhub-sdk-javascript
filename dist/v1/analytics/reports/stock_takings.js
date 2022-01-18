"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV1StockTakingsFetchError = exports.AnalyticsReportsStockTakings = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsStockTakings = (function (_super) {
    tslib_1.__extends(AnalyticsReportsStockTakings, _super);
    function AnalyticsReportsStockTakings(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsStockTakings.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsStockTakings, options, http);
    };
    AnalyticsReportsStockTakings.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/inventory/stock_takings');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsV1StockTakingsFetchError();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new AnalyticsReportsV1StockTakingsFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsStockTakings;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsStockTakings = AnalyticsReportsStockTakings;
var AnalyticsReportsV1StockTakingsFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV1StockTakingsFetchError, _super);
    function AnalyticsReportsV1StockTakingsFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch stock takings report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV1StockTakingsFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV1StockTakingsFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV1StockTakingsFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV1StockTakingsFetchError = AnalyticsReportsV1StockTakingsFetchError;
//# sourceMappingURL=stock_takings.js.map