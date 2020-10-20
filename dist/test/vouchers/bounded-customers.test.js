"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
dotenv.config();
var vouchers_1 = require("../../src/v0/vouchers");
var tillhub_js_1 = require("../../src/tillhub-js");
var util_1 = require("../util");
var faker_1 = tslib_1.__importDefault(require("faker"));
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var legacyId = faker_1.default.random.uuid();
var voucherId = faker_1.default.random.uuid();
var customers = [faker_1.default.random.uuid()];
var mockCreatePutResponse = [
    {
        id: faker_1.default.random.uuid(),
        voucher_id: voucherId,
        customer_id: customers[0]
    }
];
describe('v0: Vouchers: Voucher Bounded Customer', function () {
    it('retrieves the voucher bounded customers of a voucher', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, vouchers, data;
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
                            .onGet("https://api.tillhub.com/api/v0/vouchers/" + legacyId + "/" + voucherId + "/customers")
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
                    vouchers = th.vouchers();
                    expect(vouchers).toBeInstanceOf(tillhub_js_1.v0.Vouchers);
                    return [4 /*yield*/, vouchers.getBoundedCustomers(voucherId)];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates voucher bounded customers', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, vouchers, data;
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
                            .onPost("https://api.tillhub.com/api/v0/vouchers/" + legacyId + "/" + voucherId + "/customers")
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: mockCreatePutResponse
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    vouchers = th.vouchers();
                    return [4 /*yield*/, vouchers.createBoundedCustomers(voucherId, customers)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockCreatePutResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates voucher bounded customers', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, vouchers, data;
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
                            .onPut("https://api.tillhub.com/api/v0/vouchers/" + legacyId + "/" + voucherId + "/customers")
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: mockCreatePutResponse
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    vouchers = th.vouchers();
                    return [4 /*yield*/, vouchers.updateBoundedCustomers(voucherId, customers)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockCreatePutResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects getBoundedCustomers() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_1;
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
                            .onGet("https://api.tillhub.com/api/v0/vouchers/" + legacyId + "/" + voucherId + "/customers")
                            .reply(function () {
                            return [205];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.vouchers().getBoundedCustomers(voucherId)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    expect(e_1.name).toEqual(vouchers_1.VouchersBoundedCustomerGetFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects createBoundedCustomers() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_2;
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
                            .onPost("https://api.tillhub.com/api/v0/vouchers/" + legacyId + "/" + voucherId + "/customers}")
                            .reply(function () {
                            return [205];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.vouchers().createBoundedCustomers(voucherId, customers)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    expect(e_2.name).toEqual(vouchers_1.VouchersBoundedCustomerCreateFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects updateBoundedCustomers() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_3;
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
                            .onPatch("https://api.tillhub.com/api/v0/vouchers/" + legacyId + "/" + voucherId + "/customers}")
                            .reply(function () {
                            return [205];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.vouchers().updateBoundedCustomers(voucherId, customers)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    expect(e_3.name).toEqual(vouchers_1.VouchersBoundedCustomerPutFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=bounded-customers.test.js.map