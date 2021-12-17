"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV1PaymentsFetchError = exports.AnalyticsReportsPayments = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsPayments = (function (_super) {
    tslib_1.__extends(AnalyticsReportsPayments, _super);
    function AnalyticsReportsPayments(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsPayments.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsPayments, options, http);
    };
    AnalyticsReportsPayments.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/payments');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _b.sent();
                        if (response.status !== 200 || !((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results.length))
                            throw new AnalyticsReportsV1PaymentsFetchError();
                        return [2, {
                                data: response.data.results[0].values,
                                metadata: {
                                    count: response.data.results[0].count
                                }
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new AnalyticsReportsV1PaymentsFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsPayments;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsPayments = AnalyticsReportsPayments;
var AnalyticsReportsV1PaymentsFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV1PaymentsFetchError, _super);
    function AnalyticsReportsV1PaymentsFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch payments report export'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV1PaymentsFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV1PaymentsFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV1PaymentsFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV1PaymentsFetchError = AnalyticsReportsV1PaymentsFetchError;
//# sourceMappingURL=payments.js.map