"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var date_fns_1 = require("date-fns");
var qs_1 = tslib_1.__importDefault(require("qs"));
dotenv.config();
var tillhub_js_1 = require("../../../src/tillhub-js");
var user = {
    username: 'test@example.com',
    password: '12345678',
    clientAccount: 'someuuid',
    apiKey: '12345678'
};
if (process.env.SYSTEM_TEST) {
    user.username = process.env.SYSTEM_TEST_USERNAME || user.username;
    user.password = process.env.SYSTEM_TEST_PASSWORD || user.password;
    user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount;
    user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey;
}
var legacyId = '4564';
var query = {
    operation: ['book'],
    exclude_errors: true,
    start: date_fns_1.subMinutes(new Date(), 5).toISOString(),
    end: date_fns_1.addMinutes(new Date(), 5).toISOString(),
    source_or_destination: '8f0e62c2-e457-4485-9e9e-fe6628295f8d',
    source: '5e9468f3-a064-498a-b0cf-69bc28a4aff3',
    destination: '95e22525-38f7-4640-8402-632c7722c254',
    transfer_type: ['safe_to_safe', 'pos_to_safe'],
    transfer_value_range_start: 10.5,
    transfer_value_range_end: 100,
    currency: 'EUR'
};
describe('v0: SafesLogBook: can get count of all safes log book entries', function () {
    var mock = new axios_mock_adapter_1.default(axios_1.default);
    afterEach(function () {
        mock.reset();
    });
    it("Tillhub's safes are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, safesLogBook, data;
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
                            .onGet("https://api.tillhub.com/api/v0/safes/" + legacyId + "/logs/meta" + qs_1.default.stringify(query, {
                            addQueryPrefix: true
                        }))
                            .reply(function () {
                            return [
                                200,
                                {
                                    results: [{ count: 50 }]
                                }
                            ];
                        });
                    }
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    th = new tillhub_js_1.TillhubClient();
                    th.init(options);
                    return [4 /*yield*/, th.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    safesLogBook = th.safesLogBook();
                    expect(safesLogBook).toBeInstanceOf(tillhub_js_1.v0.SafesLogBook);
                    return [4 /*yield*/, safesLogBook.meta(query)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual({ count: 50 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, err_1;
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
                            .onGet("https://api.tillhub.com/api/v0/safes/" + legacyId + "/logs/meta" + qs_1.default.stringify(query, {
                            addQueryPrefix: true
                        }))
                            .reply(function () {
                            return [205];
                        });
                    }
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    th = new tillhub_js_1.TillhubClient();
                    th.init(options);
                    return [4 /*yield*/, th.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.safesLogBook().meta(query)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('SafesLogBookGetMetaFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=meta.test.js.map