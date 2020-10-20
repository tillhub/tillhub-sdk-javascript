"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = require("../../src/tillhub-js");
var util_1 = require("../util");
dotenv.config();
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var voucher = {
    format: 'xxxx',
    format_type: null,
    code: '1234'
};
describe('v0: Vouchers: can create a voucher', function () {
    it("Tillhub's Vouchers are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, Vouchers, data;
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
                        mock.onPost("https://api.tillhub.com/api/v0/vouchers/" + legacyId).reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [voucher],
                                    errors: []
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    Vouchers = th.vouchers();
                    expect(Vouchers).toBeInstanceOf(tillhub_js_1.v0.Vouchers);
                    return [4 /*yield*/, Vouchers.create(voucher)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toMatchObject(voucher);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200 with default message', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
                        mock.onPost("https://api.tillhub.com/api/v0/vouchers/" + legacyId).reply(function () {
                            return [
                                500,
                                {
                                    msg: 'Something broke unexpectedly',
                                    request: {
                                        id: '1939cfba-5bd7-4535-9eb9-b98e11e45427'
                                    }
                                }
                            ];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.vouchers().create(voucher)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('VoucherPostFailed');
                    expect(err_1.message).toBe('Could not create voucher');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 409 with VoucherCodeConflict error', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, err_2;
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
                        mock.onPost("https://api.tillhub.com/api/v0/vouchers/" + legacyId).reply(function () {
                            return [
                                409,
                                {
                                    msg: 'this code has a conflict',
                                    request: {
                                        id: '1939cfba-5bd7-4535-9eb9-b98e11e45427'
                                    },
                                    error: {
                                        name: 'VoucherCodeConflict',
                                        message: 'some message'
                                    }
                                }
                            ];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.vouchers().create(voucher)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    expect(err_2.name).toBe('VoucherCodeConflict');
                    expect(err_2.message).toBe('This voucher code is already in use. Please use another code.');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=create.test.js.map