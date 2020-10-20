"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
dotenv.config();
var tillhub_js_1 = tslib_1.__importStar(require("../../../src/tillhub-js"));
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
var requestObject = {
    itemId: 'abc123',
    body: {
        qty: 15
    },
    query: {
        embed: ['location', 'product']
    }
};
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: Deliveries: Items', function () {
    it('can update one', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var body, itemId, options, delivery, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = requestObject.body, itemId = requestObject.itemId;
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
                            .onPut("https://api.tillhub.com/api/v0/deliveries/" + legacyId + "/items/" + itemId + "?embed[]=location&embed[]=product")
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
                    delivery = tillhub_js_1.default.deliveries();
                    expect(delivery).toBeInstanceOf(tillhub_js_1.v0.Deliveries);
                    return [4 /*yield*/, delivery.updateDeliveryItem(requestObject)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(body);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, options, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        itemId = requestObject.itemId;
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
                            .onPut("https://api.tillhub.com/api/v0/deliveries/" + legacyId + "/items/" + itemId + "?embed[]=location&embed[]=product")
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
                    return [4 /*yield*/, tillhub_js_1.default.deliveries().updateDeliveryItem(requestObject)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('DeliveryItemUpdateFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=udpate-delivery-item.test.js.map