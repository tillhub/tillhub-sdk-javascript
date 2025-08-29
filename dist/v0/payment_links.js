"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinks = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var errors = tslib_1.__importStar(require("../errors"));
var PaymentLinks = (function (_super) {
    tslib_1.__extends(PaymentLinks, _super);
    function PaymentLinks(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: PaymentLinks.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = PaymentLinks.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    PaymentLinks.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, tenantPath, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        tenantPath = (query === null || query === void 0 ? void 0 : query.tenantId) ? "/" + query.tenantId : '';
                        base = this.uriHelper.generateBaseUri(tenantPath);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new errors.PaymentLinksFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new errors.PaymentLinksFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    PaymentLinks.prototype.create = function (paymentLinkData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, paymentLinkData)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200 && response.status !== 201) {
                            throw new errors.PaymentLinksCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data,
                                metadata: {}
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.PaymentLinksCreateFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    PaymentLinks.prototype.meta = function (tenantId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tenantPath, uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tenantPath = tenantId ? "/" + tenantId : '';
                        uri = this.uriHelper.generateBaseUri(tenantPath + "/meta");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PaymentLinksMetaFailed(undefined, { status: response.status });
                        if (!response.data.results)
                            throw new errors.PaymentLinksMetaFailed('Could not get payment links metadata unexpectedly');
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.PaymentLinksMetaFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    PaymentLinks.baseEndpoint = '/api/v0/payment-links';
    return PaymentLinks;
}(base_1.ThBaseHandler));
exports.PaymentLinks = PaymentLinks;
//# sourceMappingURL=payment_links.js.map