"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../../../errors/analytics"));
var Customers = (function () {
    function Customers(options, http, uriHelper) {
        this.options = options;
        this.http = http;
        this.uriHelper = uriHelper;
    }
    Customers.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.CustomerFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new errors.CustomerFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Customers.prototype.getFilters = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, values, data, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.CustomerFilterFetchFailed();
                        values = response.data.results[0].values;
                        data = {
                            customer_number: values.map(function (item) { return item.customer_number; }),
                            firstname: values.map(function (item) { return item.firstname; }),
                            lastname: values.map(function (item) { return item.lastname; }),
                            company: values.map(function (item) { return item.company; })
                        };
                        return [2, {
                                data: [data],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.CustomerFilterFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Customers.prototype.getTransaction = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers/transactions');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.CustomerTransactionFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new errors.CustomerTransactionFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Customers.prototype.getOverview = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/reports/customers/overview');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.CustomerOverviewFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_4 = _a.sent();
                        throw new errors.CustomerOverviewFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Customers.prototype.meta = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/reports/customers/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.CustomersMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new errors.CustomersMetaFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_5 = _a.sent();
                        throw new errors.CustomersMetaFailed(undefined, { error: err_5 });
                    case 4: return [2];
                }
            });
        });
    };
    return Customers;
}());
exports.Customers = Customers;
//# sourceMappingURL=customers.js.map