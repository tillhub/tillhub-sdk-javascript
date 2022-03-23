"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV1DiscountsFetchError = exports.AnalyticsReportsDiscounts = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsDiscounts = (function (_super) {
    tslib_1.__extends(AnalyticsReportsDiscounts, _super);
    function AnalyticsReportsDiscounts(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsDiscounts.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsDiscounts, options, http);
    };
    AnalyticsReportsDiscounts.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/discounts');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsV1DiscountsFetchError();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new AnalyticsReportsV1DiscountsFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsDiscounts;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsDiscounts = AnalyticsReportsDiscounts;
var AnalyticsReportsV1DiscountsFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV1DiscountsFetchError, _super);
    function AnalyticsReportsV1DiscountsFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch discounts report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV1DiscountsFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV1DiscountsFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV1DiscountsFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV1DiscountsFetchError = AnalyticsReportsV1DiscountsFetchError;
//# sourceMappingURL=discounts.js.map