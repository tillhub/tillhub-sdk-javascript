"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balances = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../../../errors/analytics"));
var Balances = (function () {
    function Balances(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Balances.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/balances');
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
                        err_1 = _b.sent();
                        throw new errors.ReportsBalancesFetchAllFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Balances.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/balances/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.ReportsBalancesMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new errors.ReportsBalancesMetaFailed('Could not get balances metadata unexpectedly');
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.ReportsBalancesMetaFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Balances.prototype.get = function (requestObject) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_2, err_3;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/reports/balances/" + requestObject.balanceId);
                        uri = this.uriHelper.generateUriWithQuery(base, requestObject.query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _b.sent();
                        if ((_a = response_2.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_2.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_2.data.results[0],
                                metadata: { count: response_2.data.count },
                                next: next
                            }];
                    case 2:
                        err_3 = _b.sent();
                        throw new errors.ReportsBalancesFetchOneFailed();
                    case 3: return [2];
                }
            });
        });
    };
    return Balances;
}());
exports.Balances = Balances;
//# sourceMappingURL=balances.js.map