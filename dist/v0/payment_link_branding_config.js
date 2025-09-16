"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentLinkBrandingConfigs = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var PaymentLinkBrandingConfigurationReference = (function () {
    function PaymentLinkBrandingConfigurationReference(response, http, options) {
        this.data = response.data;
        this.id = response.data.id;
        this.metadata = response.metadata;
        this.response = response;
        this.options = options;
        this.http = http;
    }
    return PaymentLinkBrandingConfigurationReference;
}());
var PaymentLinkBrandingConfigs = (function (_super) {
    tslib_1.__extends(PaymentLinkBrandingConfigs, _super);
    function PaymentLinkBrandingConfigs(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: PaymentLinkBrandingConfigs.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = PaymentLinkBrandingConfigs.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    PaymentLinkBrandingConfigs.prototype.getAll = function (optionsOrQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.PaymentLinkBrandingConfigFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.PaymentLinkBrandingConfigFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    PaymentLinkBrandingConfigs.prototype.get = function (configurationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ConfigurationFetchFailed(undefined, { status: response.status });
                        }
                        return [2, new PaymentLinkBrandingConfigurationReference({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }, this.http, this.options)];
                    case 3:
                        error_2 = _a.sent();
                        throw new errors.ConfigurationFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    PaymentLinkBrandingConfigs.prototype.put = function (configurationId, configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new errors.ConfigurationPutFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    PaymentLinkBrandingConfigs.prototype.patch = function (configurationId, configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new errors.ConfigurationPatchFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    PaymentLinkBrandingConfigs.prototype.create = function (configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_5 = _a.sent();
                        throw new errors.ConfigurationCreationFailed(error_5.message, { error: error_5 });
                    case 4: return [2];
                }
            });
        });
    };
    PaymentLinkBrandingConfigs.prototype.delete = function (configurationId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: {},
                                msg: response.data.msg
                            }];
                    case 2:
                        error_6 = _a.sent();
                        throw new errors.ConfigurationDeleteFailed(error_6.message, { error: error_6 });
                    case 3: return [2];
                }
            });
        });
    };
    PaymentLinkBrandingConfigs.baseEndpoint = '/api/v0/payment-link-branding-configs';
    return PaymentLinkBrandingConfigs;
}(base_1.ThBaseHandler));
exports.PaymentLinkBrandingConfigs = PaymentLinkBrandingConfigs;
//# sourceMappingURL=payment_link_branding_config.js.map