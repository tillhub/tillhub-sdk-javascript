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
var body = {
    to: '4f98a8da-294a-4371-a970-901cae6b39f7',
    items: [
        {
            transfer_value: 123.45,
            currency: 'EUR'
        }
    ],
    comment: 'asdfgh',
    initiated_at: '2019-05-22T09:27:59.945Z',
    from: '09a9a469-c16b-4b54-835d-692d05d218f9',
    issuer: '456E438E3E0E47219FE9900870C4D328'
};
describe('v0: Safes: book a transfer', function () {
    it("Tillhub's safes are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, safes, data;
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
                        mock.onPost("https://api.tillhub.com/api/v0/safes/" + legacyId + "/book").reply(function () {
                            return [
                                200,
                                {
                                    msg: 'Safes transfer was booked.'
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    safes = th.safes();
                    expect(safes).toBeInstanceOf(tillhub_js_1.v0.Safes);
                    return [4 /*yield*/, safes.book(body)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toMatchObject({ msg: 'Safes transfer was booked.' });
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
                        mock.onPost("https://api.tillhub.com/api/v0/safes/" + legacyId + "/book").reply(function () {
                            return [205];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.safes().book(body)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('SafesBookFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=book.test.js.map