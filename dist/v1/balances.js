"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balances = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var uri_helper_1 = require("../uri-helper");
var Balances = (function (_super) {
    tslib_1.__extends(Balances, _super);
    function Balances(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Balances.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Balances.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Balances.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new errors.BalancesFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Balances.prototype.meta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/meta');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.BalancesMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new errors.BalancesMetaFailed('could not get balances metadata unexpectedly');
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new errors.BalancesMetaFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Balances.prototype.get = function (transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + transactionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0]
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new errors.BalancesFetchOneFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Balances.baseEndpoint = '/api/v1/balances';
    return Balances;
}(base_1.ThBaseHandler));
exports.Balances = Balances;
//# sourceMappingURL=balances.js.map