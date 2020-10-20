"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
dotenv.config();
var tillhub_js_1 = require("../src/tillhub-js");
var client_1 = require("../src/client");
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
describe('SDK: client: can instantiate SDK client', function () {
    it('TillhubClient is instantiable', function () {
        if (process.env.SYSTEM_TEST !== 'true') {
            var mock = new axios_mock_adapter_1.default(axios_1.default);
            mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                return [
                    200,
                    {
                        token: '',
                        user: {
                            id: '123',
                            legacy_id: '4564'
                        }
                    }
                ];
            });
        }
        var options = {
            credentials: {
                username: user.username,
                password: user.password
            },
            base: process.env.TILLHUB_BASE
        };
        var th = new tillhub_js_1.TillhubClient(options);
        expect(th).toBeInstanceOf(tillhub_js_1.TillhubClient);
    });
    it('TillhubClient is instantiable', function () {
        if (process.env.SYSTEM_TEST !== 'true') {
            var mock = new axios_mock_adapter_1.default(axios_1.default);
            mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                return [
                    200,
                    {
                        token: '',
                        user: {
                            id: '123',
                            legacy_id: '4564'
                        }
                    }
                ];
            });
        }
        var options = {
            credentials: {
                username: user.username,
                password: user.password
            },
            base: process.env.TILLHUB_BASE
        };
        expect(new tillhub_js_1.TillhubClient(options)).toBeInstanceOf(tillhub_js_1.TillhubClient);
    });
    it('TillhubClient is inittable', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mock, options, th;
        return tslib_1.__generator(this, function (_a) {
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
                            }
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
            th = new tillhub_js_1.TillhubClient(options);
            th.init();
            expect(th.auth).toBeInstanceOf(tillhub_js_1.v1.Auth);
            expect(th.http).toBeInstanceOf(client_1.Client);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=tillhub-client.test.js.map