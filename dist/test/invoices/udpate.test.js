"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = tslib_1.__importStar(require("../../src/tillhub-js"));
dotenv.config();
var user = {
    username: 'test@example.com',
    password: '12345678',
    clientAccount: 'someuuid',
    apiKey: '12345678'
};
if (process.env.SYSTEM_TEST) {
    user.username = (_a = process.env.SYSTEM_TEST_USERNAME) !== null && _a !== void 0 ? _a : user.username;
    user.password = (_b = process.env.SYSTEM_TEST_PASSWORD) !== null && _b !== void 0 ? _b : user.password;
    user.clientAccount = (_c = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID) !== null && _c !== void 0 ? _c : user.clientAccount;
    user.apiKey = (_d = process.env.SYSTEM_TEST_API_KEY) !== null && _d !== void 0 ? _d : user.apiKey;
}
var requestObject = {
    invoiceId: 'abc123',
    query: {
        embed: ['customer', 'assignee', 'assigned_by']
    },
    body: {
        balance: 800,
        comments: 'test comment',
        customer: '9a125371-a7cd-413b-a7ad-9ed2c0070a6f',
        customer_external_reference_id: 'woeiru',
        amount: {
            net: 30.5
        },
        currency: 'EUR',
        issued_at: '2018-10-12T16:01:01.000Z',
        due_date: '2018-12-12T16:01:01.000Z',
        status: 'issued',
        archived: false,
        client_id: 'alksdjlaskdj',
        external_reference_id: 'sodijsdofij',
        external_reference: {
            id: 'someid'
        },
        metadata: {
            sku: '102938'
        },
        origins: ['02938'],
        related_to: ['34534'],
        depends_on: ['029345538'],
        deleted: false,
        active: true,
        assignee: 'cec7f3c3-099b-4562-9284-b4ab31b8b087',
        assigned_by: '25505ba1-277f-4fad-9c8f-d5d08c1ec47e'
    }
};
var queryString = requestObject.query.embed
    .map(function (item) {
    return "embed[]=" + item;
})
    .join('&');
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: Invoices', function () {
    it('can update one', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var body, options, invoice, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = requestObject.body;
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
                            .onPut("https://api.tillhub.com/api/v0/invoices/" + legacyId + "/" + requestObject.invoiceId + "?" + queryString)
                            .reply(function () {
                            return [
                                200,
                                {
                                    results: body
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
                    tillhub_js_1.default.init(options);
                    return [4 /*yield*/, tillhub_js_1.default.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    invoice = tillhub_js_1.default.invoices();
                    expect(invoice).toBeInstanceOf(tillhub_js_1.v0.Invoices);
                    return [4 /*yield*/, invoice.update(requestObject)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(body);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, err_1;
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
                            .onPut("https://api.tillhub.com/api/v0/invoices/" + legacyId + "/" + requestObject.invoiceId + "?" + queryString)
                            .reply(function () {
                            return [400];
                        });
                    }
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    tillhub_js_1.default.init(options);
                    return [4 /*yield*/, tillhub_js_1.default.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, tillhub_js_1.default.invoices().update(requestObject)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('InvoicesUpdateFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=udpate.test.js.map