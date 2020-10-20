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
    email: 'andreas.hilbert@tillhub.de',
    lines: [
        {
            caption: 'tillhub.de',
            data: 'RT1B646F16',
            format: 'code128'
        },
        {
            caption: 'tillhub.de',
            data: '_R1-AT3_fiskaltrust3_ft5AB#1446_2019-01-28T17:30:06_0,00_0,00_0,00_0,00_18,00_H3UgNDo=_1e21054316210_r+rcj6xW+Ps=_hJML3CXjlt6jsZ0WhuDgSOkRSsuxkFpgL82nD1Rk1y/FbgZTPw8a56O15KFxIhkABng0W3vEUOZyYKo9tGyw7Q==',
            format: 'qr'
        }
    ],
    receipt_text: 'Some receipt text',
    text_items: {
        cart: {
            amount: {
                gross: 18,
                net: '15.13'
            },
            currency: 'EUR',
            tax: 2.87
        }
    },
    transaction_date: '2019-01-28T16:30:05.563Z'
};
var options = {
    type: 'receipts',
    body: body
};
describe('v0: Notifications: can email receipt', function () {
    it("Tillhub's notifications are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, Notifications, resp;
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
                            .onPost("https://api.tillhub.com/api/v0/notifications/" + legacyId + "/emails/receipts")
                            .reply(function () {
                            return [
                                200,
                                {
                                    msg: 'Email for receipt sent.'
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    Notifications = th.notifications();
                    expect(Notifications).toBeInstanceOf(tillhub_js_1.v0.Notifications);
                    return [4 /*yield*/, Notifications.email(options)];
                case 2:
                    resp = _a.sent();
                    expect(resp).toMatchObject({ msg: 'Email for receipt sent.' });
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
                            .onPost("https://api.tillhub.com/api/v0/notifications/" + legacyId + "/emails/receipts")
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
                    return [4 /*yield*/, th.notifications().email(options)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('NotificationsEmailError');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=create.test.js.map