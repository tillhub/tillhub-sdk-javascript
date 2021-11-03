"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsProductsFetchFailed = exports.AnalyticsReportsProducts = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsProducts = (function () {
    function AnalyticsReportsProducts(options, http) {
        var _a, _b;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v2/analytics';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
        this.timeout = (_b = options.timeout) !== null && _b !== void 0 ? _b : this.http.getClient().defaults.timeout;
    }
    AnalyticsReportsProducts.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/products');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsProductsFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new AnalyticsReportsProductsFetchFailed(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsProducts;
}());
exports.AnalyticsReportsProducts = AnalyticsReportsProducts;
var AnalyticsReportsProductsFetchFailed = (function (_super) {
    tslib_1.__extends(AnalyticsReportsProductsFetchFailed, _super);
    function AnalyticsReportsProductsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the products analytics reports'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsProductsFetchFailed';
        Object.setPrototypeOf(_this, AnalyticsReportsProductsFetchFailed.prototype);
        return _this;
    }
    return AnalyticsReportsProductsFetchFailed;
}(errors_1.BaseError));
exports.AnalyticsReportsProductsFetchFailed = AnalyticsReportsProductsFetchFailed;
//# sourceMappingURL=products.js.map