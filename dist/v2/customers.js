"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var customers_1 = require("../v0/customers");
var Customers = (function (_super) {
    tslib_1.__extends(Customers, _super);
    function Customers(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Customers.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Customers.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Customers.prototype.create = function (customer, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, customer)];
                    case 2:
                        response = _a.sent();
                        if (![200, 201].includes(response.status)) {
                            throw new customers_1.CustomerCreationFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new customers_1.CustomerCreationFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.prototype.put = function (customerId, customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + customerId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, customer)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new customers_1.CustomerPutFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new customers_1.CustomerPutFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.baseEndpoint = '/api/v2/customers';
    return Customers;
}(base_1.ThBaseHandler));
exports.Customers = Customers;
//# sourceMappingURL=customers.js.map