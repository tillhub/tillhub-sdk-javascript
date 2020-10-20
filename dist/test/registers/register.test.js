"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = require("../../src/tillhub-js");
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
var legacyId = '4564';
var mockRegister = {
    id: '1337',
    created_at: { iso: '2018-04-23T08:46:16.012Z', unix: 1524473176012 },
    updated_at: { iso: '2019-01-18T12:44:41.261Z', unix: 1547815481261 },
    device_id: 'someDeviceId',
    token_id: 'someTokenId',
    active: true,
    deleted: false,
    shop: null,
    name: null,
    description: null,
    metadata: null,
    register_number: 16,
    branch: 'someBranch',
    custom_ids: null,
    custom_id: null,
    configuration: null,
    client: null,
    external_custom_id: null,
    currency_default: null,
    timezone_default: null,
    device_configuration: {
        network: { ip: '192.168.13.37' },
        bundle_id: 'someBundle',
        device_token: 'someToken'
    },
    devices: null,
    branch_number: 1
};
var mockNotification = { aps: { alert: 'Hello, World!' } };
var notificationSuccessMsg = 'Sent notification to 1 device(s).';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v1: Register', function () {
    it('queries the remote state of a register', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, registers, data;
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
                            .onGet("https://api.tillhub.com/api/v1/registers/" + legacyId + "/" + mockRegister.id)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [mockRegister]
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
                    registers = th.registers();
                    expect(registers).toBeInstanceOf(tillhub_js_1.v1.Registers);
                    return [4 /*yield*/, registers.get(mockRegister.id)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockRegister);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sends a notification to a register', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, registers, data;
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
                            .onPost("https://api.tillhub.com/api/v1/registers/" + legacyId + "/" + mockRegister.id + "/notification", mockNotification)
                            .reply(function () {
                            return [
                                200,
                                {
                                    status: 200,
                                    msg: notificationSuccessMsg
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
                    registers = th.registers();
                    expect(registers).toBeInstanceOf(tillhub_js_1.v1.Registers);
                    return [4 /*yield*/, registers.notify(mockRegister.id, { aps: { alert: 'Hello, World!' } })];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(notificationSuccessMsg);
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates the device configuration of a register', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, registers, data;
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
                            .onPut("https://api.tillhub.com/api/v1/registers/" + legacyId + "/" + mockRegister.id + "/device_configuration", mockRegister.device_configuration)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [mockRegister]
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
                    registers = th.registers();
                    expect(registers).toBeInstanceOf(tillhub_js_1.v1.Registers);
                    return [4 /*yield*/, registers.updateDeviceConfiguration(mockRegister.id, mockRegister.device_configuration)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockRegister);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200 when querying a register', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
                            .onGet("https://api.tillhub.com/api/v1/registers/" + legacyId + "/" + mockRegister.id)
                            .reply(function () {
                            return [404];
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
                    return [4 /*yield*/, th.registers().get(mockRegister.id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('RegisterFetchFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=register.test.js.map