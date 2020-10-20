"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = require("../../src/tillhub-js");
var stock_takings_1 = require("../../src/v0/stock_takings");
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
var stockTakingId = '1337';
var mockStockTaking = {
    name: 'mock stock taking',
    description: 'some description'
};
var mockMsg = "Deleted stockTaking " + stockTakingId;
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: StockTakings', function () {
    it('retrieves all stockTakings', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, stockTakings, data;
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
                        mock.onGet("https://api.tillhub.com/api/v0/stock_takings/" + legacyId).reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [{}]
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
                    stockTakings = th.stockTakings();
                    expect(stockTakings).toBeInstanceOf(stock_takings_1.StockTakings);
                    return [4 /*yield*/, stockTakings.getAll()];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('retrieves one stockTaking', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, stockTakings, data;
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
                            .onGet("https://api.tillhub.com/api/v0/stock_takings/" + legacyId + "/" + stockTakingId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [mockStockTaking]
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
                    stockTakings = th.stockTakings();
                    expect(stockTakings).toBeInstanceOf(stock_takings_1.StockTakings);
                    return [4 /*yield*/, stockTakings.get(stockTakingId)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockStockTaking);
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates one stockTaking', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, stockTakings, data;
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
                        mock.onPost("https://api.tillhub.com/api/v0/stock_takings/" + legacyId).reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [mockStockTaking]
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
                    stockTakings = th.stockTakings();
                    expect(stockTakings).toBeInstanceOf(stock_takings_1.StockTakings);
                    return [4 /*yield*/, stockTakings.create(mockStockTaking)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockStockTaking);
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates one stockTaking', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, stockTakings, data;
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
                            .onPatch("https://api.tillhub.com/api/v0/stock_takings/" + legacyId + "/" + stockTakingId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [mockStockTaking]
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
                    stockTakings = th.stockTakings();
                    expect(stockTakings).toBeInstanceOf(stock_takings_1.StockTakings);
                    return [4 /*yield*/, stockTakings.update(stockTakingId, mockStockTaking)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockStockTaking);
                    return [2 /*return*/];
            }
        });
    }); });
    it('deletes one stockTaking', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, stockTakings, msg;
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
                            .onDelete("https://api.tillhub.com/api/v0/stock_takings/" + legacyId + "/" + stockTakingId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    msg: mockMsg
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
                    stockTakings = th.stockTakings();
                    expect(stockTakings).toBeInstanceOf(stock_takings_1.StockTakings);
                    return [4 /*yield*/, stockTakings.delete(stockTakingId)];
                case 2:
                    msg = (_a.sent()).msg;
                    expect(msg).toEqual(mockMsg);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects getAll() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, e_1;
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
                        mock.onGet("https://api.tillhub.com/api/v0/stock_takings/" + legacyId).reply(function () {
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
                    return [4 /*yield*/, th.stockTakings().getAll()];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    expect(e_1.name).toEqual(stock_takings_1.StockTakingsFetchFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects get() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, e_2;
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
                            .onGet("https://api.tillhub.com/api/v0/stock_takings/" + legacyId + "/" + stockTakingId)
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
                    return [4 /*yield*/, th.stockTakings().get(stockTakingId)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    expect(e_2.name).toEqual(stock_takings_1.StockTakingsFetchOneFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects create() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, e_3;
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
                            .onPost("https://api.tillhub.com/api/v0/stock_takings/" + legacyId + "/" + stockTakingId)
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
                    return [4 /*yield*/, th.stockTakings().create(mockStockTaking)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    expect(e_3.name).toEqual(stock_takings_1.StockTakingsCreationFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects update() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, e_4;
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
                            .onPatch("https://api.tillhub.com/api/v0/stock_takings/" + legacyId + "/" + stockTakingId)
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
                    return [4 /*yield*/, th.stockTakings().update(stockTakingId, mockStockTaking)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _a.sent();
                    expect(e_4.name).toEqual(stock_takings_1.StockTakingsUpdateFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects delete() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, th, e_5;
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
                            .onDelete("https://api.tillhub.com/api/v0/stock_takings/" + legacyId + "/" + stockTakingId)
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
                    return [4 /*yield*/, th.stockTakings().delete(stockTakingId)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_5 = _a.sent();
                    expect(e_5.name).toEqual(stock_takings_1.StockTakingsDeleteFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=stock_takings.test.js.map