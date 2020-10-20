"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var qs_1 = tslib_1.__importDefault(require("qs"));
dotenv.config();
var payments_1 = require("../../../src/v0/analytics/reports/payments");
var util_1 = require("../../util");
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: Analytics: gets Payments report', function () {
    it('gets Payments report', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, payments, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [200, { token: '', user: { id: '123', legacy_id: legacyId } }];
                        });
                        mock
                            .onGet("https://api.tillhub.com/api/v0/analytics/" + legacyId + "/reports/payments")
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [{}]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    payments = th.analytics().payments();
                    expect(payments).toBeInstanceOf(payments_1.Payments);
                    return [4 /*yield*/, payments.getAll()];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('takes a query string', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var paymentsQuery, queryString, th, payments, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paymentsQuery = {
                        format: 'csv',
                        date_start: '2019-03-18T22:59:59.999Z',
                        date_end: '2019-03-07T23:00:00.000Z',
                        payment_option: 'Visa',
                        payment_type: 'cash',
                        transaction_number: 5,
                        balance_number: 4,
                        amount: {
                            from: 20,
                            to: 1400
                        },
                        change: {
                            from: 1,
                            to: 8
                        }
                    };
                    queryString = qs_1.default.stringify(paymentsQuery, { addQueryPrefix: true });
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: legacyId
                                    }
                                }
                            ];
                        });
                        mock
                            .onGet("https://api.tillhub.com/api/v0/analytics/" + legacyId + "/reports/payments" + queryString)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [{}]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    payments = th.analytics().payments();
                    expect(payments).toBeInstanceOf(payments_1.Payments);
                    return [4 /*yield*/, payments.getAll(paymentsQuery)];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: legacyId
                                    }
                                }
                            ];
                        });
                        mock
                            .onGet("https://api.tillhub.com/api/v0/analytics/" + legacyId + "/reports/payments")
                            .reply(function () {
                            return [205];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.analytics().getPaymentsReport()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('PaymentsReportFetchFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get-all.test.js.map