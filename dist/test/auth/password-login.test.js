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
describe('Auth: make auth flow', function () {
    it('v0: Auth: Can make password auth implicitly', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, mock, auth, data, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock = new axios_mock_adapter_1.default(axios_1.default);
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: '4564',
                                        scopes: ['admin'],
                                        role: 'manager',
                                        display_name: 'big org'
                                    },
                                    features: {
                                        inventory: true
                                    }
                                }
                            ];
                        });
                    }
                    auth = new tillhub_js_1.v0.Auth(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, auth.authenticate()];
                case 2:
                    data = _a.sent();
                    expect(data).toBeTruthy();
                    expect(typeof data.token === 'string').toBe(true);
                    expect(typeof data.user === 'string').toBe(true);
                    expect(typeof data.features === 'object').toBe(true);
                    expect(Array.isArray(data.scopes)).toBe(true);
                    expect(typeof data.role === 'string').toBe(true);
                    expect(typeof data.orgName === 'string').toBe(true);
                    expect(data.features).toEqual({ inventory: true });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('v1: Auth: Can make password auth implicitly', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, mock, auth, data, err_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock = new axios_mock_adapter_1.default(axios_1.default);
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: '4564'
                                    },
                                    features: {
                                        inventory: true
                                    }
                                }
                            ];
                        });
                    }
                    auth = new tillhub_js_1.v1.Auth(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, auth.authenticate()];
                case 2:
                    data = _a.sent();
                    expect(data).toBeTruthy();
                    expect(typeof data.token === 'string').toBe(true);
                    expect(typeof data.user === 'string').toBe(true);
                    expect(typeof data.features === 'object').toBe(true);
                    expect(data.features).toEqual({ inventory: true });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    throw err_2;
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=password-login.test.js.map