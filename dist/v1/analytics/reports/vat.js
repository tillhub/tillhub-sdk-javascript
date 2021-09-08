"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV1VatFetchError = exports.AnalyticsReportsVat = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsVat = (function (_super) {
    tslib_1.__extends(AnalyticsReportsVat, _super);
    function AnalyticsReportsVat(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsVat.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsVat, options, http);
    };
    AnalyticsReportsVat.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/vat');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsV1VatFetchError();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new AnalyticsReportsV1VatFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsVat;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsVat = AnalyticsReportsVat;
var AnalyticsReportsV1VatFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV1VatFetchError, _super);
    function AnalyticsReportsV1VatFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch vat report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV1VatFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV1VatFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV1VatFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV1VatFetchError = AnalyticsReportsV1VatFetchError;
//# sourceMappingURL=vat.js.map