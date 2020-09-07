"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balances = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors = tslib_1.__importStar(require("../errors"));
var base_1 = require("../base");
var Balances = (function (_super) {
    tslib_1.__extends(Balances, _super);
    function Balances(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Balances.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Balances.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        return _this;
    }
    Balances.prototype.getAll = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var query, uri, next, queryString, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = q ? JSON.parse(JSON.stringify(q)) : {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        }
                        queryString = qs_1.default.stringify(query);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new errors.BalancesFetchFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Balances.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            return [2, reject(new errors.BalancesMetaFailed(undefined, { status: response.status }))];
                        if (!response.data.results[0]) {
                            return [2, reject(new errors.BalancesMetaFailed('could not get balances metadata unexpectedly'))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new errors.BalancesMetaFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Balances.prototype.get = function (transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + transactionId;
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
                        error_1 = _a.sent();
                        throw new errors.BalancesFetchOneFailed(undefined, { error: error_1 });
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