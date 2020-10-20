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
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
if (process.env.SYSTEM_TEST) {
    user.username = (_a = process.env.SYSTEM_TEST_USERNAME) !== null && _a !== void 0 ? _a : user.username;
    user.password = (_b = process.env.SYSTEM_TEST_PASSWORD) !== null && _b !== void 0 ? _b : user.password;
    user.clientAccount = (_c = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID) !== null && _c !== void 0 ? _c : user.clientAccount;
    user.apiKey = (_d = process.env.SYSTEM_TEST_API_KEY) !== null && _d !== void 0 ? _d : user.apiKey;
}
describe('Auth: logout', function () {
    it('fails on missing token', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, auth, err_1;
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
                        mock.onGet('https://api.tillhub.com/api/v0/users/logout').reply(function () {
                            return [500];
                        });
                    }
                    auth = new tillhub_js_1.v0.Auth(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, auth.logout()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('LogoutMissingToken');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('can log out', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, auth, data, err_2;
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
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: 'something',
                                    user: {
                                        id: '123',
                                        legacy_id: '4564',
                                        scopes: ['admin'],
                                        role: 'manager'
                                    },
                                    features: {
                                        inventory: true
                                    }
                                }
                            ];
                        });
                        mock.onGet('https://api.tillhub.com/api/v0/users/logout').reply(function () {
                            return [
                                200,
                                {
                                    msg: 'Logout successful.'
                                }
                            ];
                        });
                    }
                    auth = new tillhub_js_1.v0.Auth(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, auth.authenticate()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, auth.logout()];
                case 3:
                    data = _a.sent();
                    expect(data).toBeTruthy();
                    expect(data.msg === 'Logout successful.').toBe(true);
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    throw err_2;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, auth, err_3;
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
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: 'something',
                                    user: {
                                        id: '123',
                                        legacy_id: '4564',
                                        scopes: ['admin'],
                                        role: 'manager'
                                    },
                                    features: {
                                        inventory: true
                                    }
                                }
                            ];
                        });
                        mock.onGet('https://api.tillhub.com/api/v0/users/logout').reply(function () {
                            return [500];
                        });
                    }
                    auth = new tillhub_js_1.v0.Auth(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, auth.authenticate()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, auth.logout()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    expect(err_3.name).toBe('LogoutFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=logout.test.js.map