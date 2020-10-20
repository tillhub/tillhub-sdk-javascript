"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
dotenv.config();
var tillhub_js_1 = tslib_1.__importStar(require("../src/tillhub-js"));
var auth_1 = require("../src/v1/auth");
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
describe('SDK: can instantiate SDK', function () {
    it('Tillhub SDK is instantiable and is instance of Tillhub client', function () {
        expect(tillhub_js_1.default).toBeInstanceOf(tillhub_js_1.TillhubClient);
    });
    it('Base has been set automatically', function () {
        if (!tillhub_js_1.default.options)
            throw new Error('Options must be defined');
        expect(tillhub_js_1.default.options.base).toBe('https://api.tillhub.com');
    });
    it('Can call init with new options', function () {
        tillhub_js_1.default.init({
            base: 'https://staging-api.tillhub.com'
        });
        if (!tillhub_js_1.default.options)
            throw new Error('Options must be defined');
        expect(tillhub_js_1.default.options.base).toBe('https://staging-api.tillhub.com');
        expect(tillhub_js_1.default.auth).toBeInstanceOf(auth_1.Auth);
    });
    it('Can do login from instance', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, mock, data, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        username: user.username,
                        password: user.password
                    };
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock = new axios_mock_adapter_1.default(axios_1.default);
                        mock.onPost('https://staging-api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: 'sometoken',
                                    user: {
                                        id: '123',
                                        legacy_id: '4564'
                                    }
                                }
                            ];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tillhub_js_1.default.auth.loginUsername(options)];
                case 2:
                    data = _a.sent();
                    expect(data).toBeTruthy();
                    expect(typeof data.token === 'string').toBe(true);
                    expect(data.token).toBe('sometoken');
                    expect(typeof data.user === 'string').toBe(true);
                    expect(data.user).toBe('4564');
                    expect(tillhub_js_1.default.auth.token).toBe('sometoken');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=tillhub-js.test.js.map