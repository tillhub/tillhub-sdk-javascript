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
    Customers.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
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
                            throw new customers_1.CustomersFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 3:
                        err_1 = _b.sent();
                        throw new customers_1.CustomersFetchFailed(undefined, { error: err_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Customers.baseEndpoint = '/api/v1/customers';
    return Customers;
}(base_1.ThBaseHandler));
exports.Customers = Customers;
//# sourceMappingURL=customers.js.map