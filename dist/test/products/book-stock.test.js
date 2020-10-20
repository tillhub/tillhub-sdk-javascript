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
var productObj = {
    name: 'iPhone'
};
var userId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
var requestOptions = {
    productId: '12345',
    body: {
        location: 'abc123',
        qty: 45
    }
};
afterEach(function () {
    mock.reset();
});
describe('Book stock for a product', function () {
    it('create', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var options, products, data;
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
                                        legacy_id: userId
                                    }
                                }
                            ];
                        });
                        mock
                            .onPost("https://api.tillhub.com/api/v1/products/" + userId + "/" + requestOptions.productId + "/stock/book")
                            .reply(function () {
                            return [
                                200,
                                {
                                    results: [productObj]
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
                    products = tillhub_js_1.default.products();
                    expect(products).toBeInstanceOf(tillhub_js_1.v1.Products);
                    return [4 /*yield*/, products.bookStock(requestOptions)];
                case 2:
                    data = (_a.sent()).data;
                    expect(typeof data).toEqual('object');
                    expect(data.name).toEqual('iPhone');
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mock_1, options, th, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock_1 = new axios_mock_adapter_1.default(axios_1.default);
                        mock_1.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: userId
                                    }
                                }
                            ];
                        });
                        mock_1
                            .onPost("https://api.tillhub.com/api/v1/products/" + userId + "/" + requestOptions.productId + "/stock/book")
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
                    return [4 /*yield*/, th.products().bookStock(requestOptions)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('ProductsBookStockFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=book-stock.test.js.map