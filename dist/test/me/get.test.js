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
var meResponse = {
    role: 'owner',
    scopes: ['products:read', 'products:create', 'products:delete']
};
describe('v0: Me: can get me data', function () {
    it("Tillhub's Me is instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, Me, data;
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
                        mock.onGet('https://api.tillhub.com/api/v0/me').reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [meResponse]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    Me = th.me();
                    expect(Me).toBeInstanceOf(tillhub_js_1.v0.Me);
                    return [4 /*yield*/, Me.get()];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toMatchObject(meResponse);
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
                        mock.onGet('https://api.tillhub.com/api/v0/me').reply(function () {
                            return [205];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.me().get()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('MeFetchFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('can send errors attached to the response', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var errorsArr, th, Me, _a, data, errors;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errorsArr = [
                        {
                            id: '1234',
                            label: 'some.error.key',
                            errorDetails: { msg: 'Error message' }
                        }
                    ];
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
                        mock.onGet('https://api.tillhub.com/api/v0/me').reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    errors: errorsArr,
                                    results: [meResponse]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _b.sent();
                    Me = th.me();
                    expect(Me).toBeInstanceOf(tillhub_js_1.v0.Me);
                    return [4 /*yield*/, Me.get()];
                case 2:
                    _a = _b.sent(), data = _a.data, errors = _a.errors;
                    expect(data).toMatchObject(meResponse);
                    expect(errors).toMatchObject(errorsArr);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get.test.js.map