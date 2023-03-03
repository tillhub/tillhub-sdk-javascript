"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryConfiguration = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var users_1 = require("./users");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var InventoryConfigurationReference = (function () {
    function InventoryConfigurationReference(response, http, options) {
        this.data = response.data;
        this.id = response.data.id;
        this.metadata = response.metadata;
        this.response = response;
        this.options = options;
        this.http = http;
    }
    InventoryConfigurationReference.prototype.users = function () {
        return new users_1.Users(this.options, this.http);
    };
    return InventoryConfigurationReference;
}());
var InventoryConfiguration = (function (_super) {
    tslib_1.__extends(InventoryConfiguration, _super);
    function InventoryConfiguration(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: InventoryConfiguration.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = InventoryConfiguration.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    InventoryConfiguration.prototype.getAll = function (optionsOrQuery) {
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
                            throw new errors.InventoryConfigurationFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.InventoryConfigurationFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    InventoryConfiguration.prototype.get = function (configurationId) {
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
                            throw new errors.InventoryConfigurationFetchFailed(undefined, { status: response.status });
                        }
                        return [2, new InventoryConfigurationReference({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }, this.http, this.options)];
                    case 3:
                        error_2 = _a.sent();
                        throw new errors.InventoryConfigurationFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    InventoryConfiguration.prototype.put = function (configurationId, configuration) {
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
    InventoryConfiguration.baseEndpoint = '/api/v0/inventory-configurations';
    return InventoryConfiguration;
}(base_1.ThBaseHandler));
exports.InventoryConfiguration = InventoryConfiguration;
//# sourceMappingURL=inventory_configuration.js.map