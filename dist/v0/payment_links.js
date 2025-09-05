"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinks = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var errors = tslib_1.__importStar(require("../errors"));
var errors_1 = require("../errors");
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
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new errors_1.PaymentLinksFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.after }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new errors.PaymentLinksFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
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
                        return [4, this.http.getClient().post(uri, paymentLinkData, { timeout: 30000 })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200 && response.status !== 201) {
                            throw new errors_1.PaymentLinksCreateFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors_1.PaymentLinksCreateFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    PaymentLinks.prototype.meta = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base + "/meta", query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200)
                            throw new errors_1.PaymentLinksMetaFailed(undefined, { status: response.status });
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: ((_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.count) || 0 }
                            }];
                    case 3:
                        error_3 = _b.sent();
                        throw new errors_1.PaymentLinksMetaFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    PaymentLinks.baseEndpoint = '/api/v0/payment-links';
    return PaymentLinks;
}(base_1.ThBaseHandler));
exports.PaymentLinks = PaymentLinks;
//# sourceMappingURL=payment_links.js.map