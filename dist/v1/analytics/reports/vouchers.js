"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV1VouchersFetchError = exports.AnalyticsReportsVouchers = void 0;
var tslib_1 = require("tslib");
var just_safe_get_1 = tslib_1.__importDefault(require("just-safe-get"));
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsVouchers = (function (_super) {
    tslib_1.__extends(AnalyticsReportsVouchers, _super);
    function AnalyticsReportsVouchers(options, http) {
        var _a;
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : _this.http.getClient().defaults.timeout;
        return _this;
    }
    AnalyticsReportsVouchers.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsVouchers, options, http);
    };
    AnalyticsReportsVouchers.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response_1, next, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/vouchers');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri, { timeout: this.timeout })];
                    case 1:
                        response_1 = _b.sent();
                        next = void 0;
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        if (response_1.status !== 200)
                            throw new AnalyticsReportsV1VouchersFetchError();
                        return [2, {
                                data: just_safe_get_1.default(response_1.data, 'results.0.values') || [],
                                metadata: {
                                    count: just_safe_get_1.default(response_1.data, 'results.2.values.0.count') || 0
                                },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new AnalyticsReportsV1VouchersFetchError(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsVouchers;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsVouchers = AnalyticsReportsVouchers;
var AnalyticsReportsV1VouchersFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV1VouchersFetchError, _super);
    function AnalyticsReportsV1VouchersFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch vouchers report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV1VouchersFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV1VouchersFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV1VouchersFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV1VouchersFetchError = AnalyticsReportsV1VouchersFetchError;
//# sourceMappingURL=vouchers.js.map