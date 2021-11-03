"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsStocksFetchFailed = exports.AnalyticsReportsStocks = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsStocks = (function () {
    function AnalyticsReportsStocks(options, http) {
        var _a, _b;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v2/analytics';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
        this.timeout = (_b = options.timeout) !== null && _b !== void 0 ? _b : this.http.getClient().defaults.timeout;
    }
    AnalyticsReportsStocks.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/stocks');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsStocksFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new AnalyticsReportsStocksFetchFailed(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsStocks;
}());
exports.AnalyticsReportsStocks = AnalyticsReportsStocks;
var AnalyticsReportsStocksFetchFailed = (function (_super) {
    tslib_1.__extends(AnalyticsReportsStocksFetchFailed, _super);
    function AnalyticsReportsStocksFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks analytics reports'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsStocksFetchFailed';
        Object.setPrototypeOf(_this, AnalyticsReportsStocksFetchFailed.prototype);
        return _this;
    }
    return AnalyticsReportsStocksFetchFailed;
}(errors_1.BaseError));
exports.AnalyticsReportsStocksFetchFailed = AnalyticsReportsStocksFetchFailed;
//# sourceMappingURL=stocks.js.map